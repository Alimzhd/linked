import React, { useState, useEffect } from 'react';
import {
  DndContext,
  DragOverlay,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { useBuilder } from '../features/customizer/useBuilder';
import { BraceletBar } from '../features/customizer/BraceletBar';
import { CharmLibrary } from '../features/customizer/CharmLibrary';
import { useCart } from '../features/cart/cartContext';
import { formatRupiah } from '../lib/format-rupiah';
import { CharmSvg } from '../components/CharmSvg';
import { Button } from '../components/Button';
import { RotateCcw, Undo2, Redo2, Check, ShoppingBag } from 'lucide-react';
import { Charm } from '../types';

export const Customize: React.FC = () => {
  const {
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
    canUndo,
    canRedo,
    priceCalculation,
  } = useBuilder();

  const { addCustomBuildToCart } = useCart();
  const [activeDragCharm, setActiveDragCharm] = useState<Charm | null>(null);
  const [displayPrice, setDisplayPrice] = useState<number>(priceCalculation.total);
  const [isAddedSuccess, setIsAddedSuccess] = useState<boolean>(false);

  // Smooth animated count-up over 300ms for price changes
  useEffect(() => {
    const targetPrice = priceCalculation.total;
    const startPrice = displayPrice;
    if (startPrice === targetPrice) return;

    const duration = 300; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo formula
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(startPrice + (targetPrice - startPrice) * ease);
      setDisplayPrice(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayPrice(targetPrice);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [priceCalculation.total]);

  // Keyboard shortcut listener: Cmd/Ctrl+Z for undo, Cmd/Ctrl+Shift+Z or Ctrl+Y for redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          if (canRedo) redo();
        } else {
          if (canUndo) undo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  // Pointer sensor configuration with 5px distance to differentiate click vs drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data && data.type === 'charm') {
      setActiveDragCharm(data.charm as Charm);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveDragCharm(null);

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // Dropping a charm onto a slot
    if (activeData && activeData.type === 'charm' && overData && overData.type === 'slot') {
      const charm = activeData.charm as Charm;
      const slotIndex = overData.slotIndex as number;
      placeCharm(charm.id, slotIndex);
    }

    // Dragging and dropping between slots to swap
    if (activeData && activeData.type === 'slot' && overData && overData.type === 'slot') {
      const fromSlot = activeData.slotIndex as number;
      const toSlot = overData.slotIndex as number;
      swapSlots(fromSlot, toSlot);
    }
  };

  const handleAddToCart = () => {
    addCustomBuildToCart(build, priceCalculation.total);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="layout-container py-10 md:py-16 space-y-8">
        {/* Header & Value Line */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-6 border-b border-steel">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="micro-label text-neutral-500">03 · INTERACTIVE STUDIO</span>
              <span className="w-8 h-px bg-steel" />
              <span className="micro-label text-neutral-500">18-SLOT MODULAR BUILDER</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight">
              Pilih Ukuran, <span className="accent-serif font-normal">Tempel</span> Charm, Lihat Hasilnya.
            </h1>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Klik charm untuk langsung mengisi slot pertama yang tersedia, atau seret langsung ke slot pilihanmu.
            </p>
          </div>

          {/* Real-time Pricing Summary Widget */}
          <div className="bg-white p-5 rounded-DEFAULT border border-steel shadow-sm min-w-[240px] flex flex-col justify-between">
            <span className="micro-label text-neutral-500">TOTAL HARGA GELANG</span>
            <div className="text-2xl md:text-3xl font-extrabold font-mono text-ink mt-1">
              {formatRupiah(displayPrice)}
            </div>
            <div className="text-[11px] text-neutral-500 font-mono mt-1">
              Gelang Dasar ({formatRupiah(priceCalculation.basePrice)}) + Charm ({formatRupiah(priceCalculation.charmsExtra)})
            </div>
          </div>
        </div>

        {/* Toolbar: Undo, Redo, Reset, Keyboard Tips */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={undo}
              disabled={!canUndo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-steel bg-white text-ink hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              title="Urungkan perubahan (Ctrl/Cmd+Z)"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Urung</span>
            </button>

            <button
              type="button"
              onClick={redo}
              disabled={!canRedo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-steel bg-white text-ink hover:bg-neutral-50 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-xs"
              title="Ulangi perubahan (Ctrl/Cmd+Shift+Z)"
            >
              <Redo2 className="w-3.5 h-3.5" />
              <span>Ulangi</span>
            </button>

            <button
              type="button"
              onClick={resetBuild}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-steel bg-white text-neutral-600 hover:text-red-600 hover:bg-red-50 transition-all shadow-xs"
              title="Kembalikan semua ke link polos"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Polos</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-neutral-500 micro-label">
            <span>TIP: KLIK CHARM UNTUK PASANG CEPAT</span>
            <span>TAB / PANAH UNTUK NAVIGASI KEYBOARD</span>
          </div>
        </div>

        {/* 18-Slot Interactive Bracelet Chain */}
        <BraceletBar
          build={build}
          selectedSlotIndex={selectedSlotIndex}
          onSelectSlot={setSelectedSlotIndex}
          onRemoveCharm={removeCharm}
          onSwapSlots={swapSlots}
          onSetSize={setBraceletSize}
        />

        {/* Charm Library Section */}
        <CharmLibrary onSelectCharm={(charmId) => placeCharm(charmId)} />

        {/* Bottom Sticky Action Bar for Easy Checkout */}
        <div className="sticky bottom-4 z-30 p-4 bg-ink/95 text-paper backdrop-blur-md rounded-DEFAULT border border-neutral-700 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div>
              <span className="micro-label text-neutral-400">RANGKAIAN GELANG KAMU</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm font-bold">
                  Size {build.size} ({build.slots.length} Slots)
                </span>
                <span className="text-xs text-neutral-400">·</span>
                <span className="text-sm font-mono font-bold text-blush">
                  {formatRupiah(priceCalculation.total)}
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto font-bold"
            onClick={handleAddToCart}
          >
            {isAddedSuccess ? (
              <span className="flex items-center gap-2 text-ink">
                <Check className="w-4 h-4 text-ink" />
                <span>Gelang Ditambahkan ke Keranjang</span>
              </span>
            ) : (
              <span className="flex items-center gap-2 text-ink">
                <ShoppingBag className="w-4 h-4 text-ink" />
                <span>Tambahkan Gelang ke Keranjang</span>
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Floating Drag Overlay */}
      <DragOverlay>
        {activeDragCharm ? (
          <div className="w-14 h-14 p-1 rounded-lg bg-white border-2 border-ink shadow-2xl scale-110 pointer-events-none opacity-90">
            <CharmSvg symbol={activeDragCharm.symbol} name={activeDragCharm.name} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
