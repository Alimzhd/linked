import { useState, useEffect, useCallback, useMemo } from 'react';
import { Build, BraceletSize, BRACELET_SIZES, BASE_BRACELET_PRICE } from '../../types';
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from '../../lib/storage';
import charmsData from '../../data/charms.json';

const MAX_HISTORY = 20;

function createEmptySlots(size: BraceletSize): (string | null)[] {
  return Array(BRACELET_SIZES[size].slots).fill(null);
}

const initialBuild: Build = {
  size: 'M',
  slots: createEmptySlots('M'),
};

export function useBuilder() {
  const [build, setBuild] = useState<Build>(() => {
    const saved = loadFromStorage<Build>(STORAGE_KEYS.BUILD, initialBuild);
    // Validate slot length matches size
    const expectedSlots = BRACELET_SIZES[saved.size]?.slots || 18;
    if (!saved.slots || saved.slots.length !== expectedSlots) {
      return {
        size: saved.size || 'M',
        slots: createEmptySlots(saved.size || 'M'),
      };
    }
    return saved;
  });

  const [history, setHistory] = useState<Build[]>([build]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);

  // Sync to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BUILD, build);
  }, [build]);

  const pushHistory = useCallback((nextBuild: Build) => {
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      const updated = [...trimmed, nextBuild];
      if (updated.length > MAX_HISTORY) {
        return updated.slice(updated.length - MAX_HISTORY);
      }
      return updated;
    });
    setHistoryIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
    setBuild(nextBuild);
  }, [historyIndex]);

  // Undo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setBuild(history[prevIndex]);
    }
  }, [historyIndex, history]);

  // Redo
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setBuild(history[nextIndex]);
    }
  }, [historyIndex, history]);

  // Change Bracelet Size with safe check
  const setBraceletSize = useCallback((newSize: BraceletSize) => {
    if (newSize === build.size) return;
    const newSlotCount = BRACELET_SIZES[newSize].slots;
    const currentSlots = build.slots;

    let updatedSlots: (string | null)[];
    if (newSlotCount > currentSlots.length) {
      // Expanding
      updatedSlots = [...currentSlots, ...Array(newSlotCount - currentSlots.length).fill(null)];
    } else {
      // Shrinking: check if truncated slots have non-null charms
      const droppedCharms = currentSlots.slice(newSlotCount).filter(Boolean);
      if (droppedCharms.length > 0) {
        const confirmShrink = window.confirm(
          `Mengubah ke ukuran ${newSize} (${newSlotCount} slot) akan memotong ${droppedCharms.length} charm di ujung gelang. Lanjutkan?`
        );
        if (!confirmShrink) return;
      }
      updatedSlots = currentSlots.slice(0, newSlotCount);
    }

    pushHistory({
      size: newSize,
      slots: updatedSlots,
    });
  }, [build, pushHistory]);

  // Place charm in selected slot, or first empty slot
  const placeCharm = useCallback((charmId: string, targetSlot?: number) => {
    const slots = [...build.slots];
    let destIndex = targetSlot !== undefined ? targetSlot : selectedSlotIndex;

    // If no target provided, find the first slot that is null (plain)
    if (destIndex === null || destIndex === undefined || destIndex < 0 || destIndex >= slots.length) {
      destIndex = slots.findIndex((s) => s === null);
      // If all slots already filled, replace the last slot
      if (destIndex === -1) {
        destIndex = slots.length - 1;
      }
    }

    slots[destIndex] = charmId;
    pushHistory({ ...build, slots });
    // Move selection to next slot if available
    if (destIndex < slots.length - 1) {
      setSelectedSlotIndex(destIndex + 1);
    }
  }, [build, selectedSlotIndex, pushHistory]);

  // Remove charm from slot (reverts to null = plain)
  const removeCharm = useCallback((slotIndex: number) => {
    if (slotIndex < 0 || slotIndex >= build.slots.length) return;
    const slots = [...build.slots];
    slots[slotIndex] = null;
    pushHistory({ ...build, slots });
  }, [build, pushHistory]);

  // Swap two slots (for drag & drop between slots)
  const swapSlots = useCallback((fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    if (fromIndex < 0 || fromIndex >= build.slots.length) return;
    if (toIndex < 0 || toIndex >= build.slots.length) return;

    const slots = [...build.slots];
    const temp = slots[fromIndex];
    slots[fromIndex] = slots[toIndex];
    slots[toIndex] = temp;
    pushHistory({ ...build, slots });
  }, [build, pushHistory]);

  // Reset to all plain links
  const resetBuild = useCallback(() => {
    const confirmReset = window.confirm('Kosongkan semua charm dan kembali ke gelang dasar polos?');
    if (confirmReset) {
      pushHistory({
        size: build.size,
        slots: createEmptySlots(build.size),
      });
      setSelectedSlotIndex(null);
    }
  }, [build.size, pushHistory]);

  // Price calculations
  const priceCalculation = useMemo(() => {
    let charmsExtra = 0;
    const charmCounts: Record<string, number> = {};

    build.slots.forEach((charmId) => {
      if (charmId) {
        const charm = charmsData.find((c) => c.id === charmId);
        if (charm) {
          charmsExtra += charm.addPrice;
          charmCounts[charm.name] = (charmCounts[charm.name] || 0) + 1;
        }
      }
    });

    const total = BASE_BRACELET_PRICE + charmsExtra;

    return {
      basePrice: BASE_BRACELET_PRICE,
      charmsExtra,
      total,
      charmCounts,
    };
  }, [build.slots]);

  return {
    build,
    selectedSlotIndex,
    setSelectedSlotIndex,
    placeCharm,
    removeCharm,
    swapSlots,
    setBraceletSize,
    resetBuild,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    priceCalculation,
  };
}
