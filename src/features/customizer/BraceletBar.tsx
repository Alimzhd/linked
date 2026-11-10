import React from 'react';
import { Build, BraceletSize, BRACELET_SIZES } from '../../types';
import { Slot } from './Slot';
import { ChevronLeft, ChevronRight, Trash2, X } from 'lucide-react';
import charmsData from '../../data/charms.json';
import { ButtonGroup, ButtonGroupItem } from '../../components/ui/ButtonGroup';

interface BraceletBarProps {
  build: Build;
  selectedSlotIndex: number | null;
  onSelectSlot: (index: number) => void;
  onRemoveCharm: (index: number) => void;
  onSwapSlots: (from: number, to: number) => void;
  onSetSize: (size: BraceletSize) => void;
}

export const BraceletBar: React.FC<BraceletBarProps> = ({
  build,
  selectedSlotIndex,
  onSelectSlot,
  onRemoveCharm,
  onSwapSlots,
  onSetSize,
}) => {
  const currentSizeConfig = BRACELET_SIZES[build.size];
  const selectedCharmId = selectedSlotIndex !== null ? build.slots[selectedSlotIndex] : null;
  const selectedCharm = selectedCharmId ? charmsData.find((c) => c.id === selectedCharmId) : null;

  const sizeItems: ButtonGroupItem<BraceletSize>[] = (['S', 'M', 'L'] as BraceletSize[]).map((size) => {
    const config = BRACELET_SIZES[size];
    return {
      value: size,
      label: size,
      sublabel: `(${config.slots} Links · ${config.circumference})`,
    };
  });

  return (
    <div className="w-full bg-white rounded-[24px] p-6 md:p-8 space-y-6 shadow-md shadow-black/4">
      {/* Top Bar Info: Size Selector and Micro Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="micro-label text-neutral-500">PILIH UKURAN GELANG</span>
          <div className="mt-1.5">
            <ButtonGroup<BraceletSize>
              items={sizeItems}
              value={build.size}
              onChange={onSetSize}
              size="sm"
              showCheckmark={true}
              ariaLabel="Pilih ukuran gelang"
            />
          </div>
        </div>

        <div className="text-left sm:text-right">
          <span className="micro-label text-neutral-500">TOTAL MODUL</span>
          <p className="text-sm font-mono font-bold text-ink mt-0.5">
            {build.slots.filter(Boolean).length} Charm / {currentSizeConfig.slots} Slot
          </p>
        </div>
      </div>

      {/* Bracelet Rail: Interactive Chain with Spring-Snap Slots */}
      <div className="relative pt-4 pb-8">
        <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-neutral-300">
          <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-4 bg-neutral-100/70 rounded-2xl min-w-full justify-start md:justify-center shadow-inner">
            {build.slots.map((charmId, index) => (
              <Slot
                key={`slot-${index}`}
                index={index}
                charmId={charmId}
                isSelected={selectedSlotIndex === index}
                onSelect={onSelectSlot}
                onRemove={onRemoveCharm}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile & Contextual Quick-Action Floating Bar for Selected Slot */}
      {selectedSlotIndex !== null && (
        <div className="p-3 bg-blush/60 rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-ink text-paper flex items-center justify-center font-mono font-bold text-[10px]">
              {selectedSlotIndex + 1}
            </span>
            <span className="font-medium text-ink">
              {selectedCharm ? selectedCharm.name : 'Link Polos (Pilih charm di bawah untuk memasang)'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Move Left */}
            <button
              type="button"
              disabled={selectedSlotIndex === 0}
              onClick={() => {
                onSwapSlots(selectedSlotIndex, selectedSlotIndex - 1);
                onSelectSlot(selectedSlotIndex - 1);
              }}
              className="p-1.5 rounded-full bg-white shadow-2xs hover:shadow-xs text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
              title="Geser ke kiri"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Kiri</span>
            </button>

            {/* Move Right */}
            <button
              type="button"
              disabled={selectedSlotIndex === build.slots.length - 1}
              onClick={() => {
                onSwapSlots(selectedSlotIndex, selectedSlotIndex + 1);
                onSelectSlot(selectedSlotIndex + 1);
              }}
              className="p-1.5 rounded-full bg-white shadow-2xs hover:shadow-xs text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
              title="Geser ke kanan"
            >
              <span className="text-[11px] hidden sm:inline">Kanan</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Clear Charm from slot */}
            {selectedCharm && (
              <button
                type="button"
                onClick={() => onRemoveCharm(selectedSlotIndex)}
                className="p-1.5 rounded-full bg-white shadow-2xs hover:shadow-xs text-red-600 hover:bg-red-50 flex items-center gap-1"
                title="Hapus charm"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="text-[11px] hidden sm:inline">Hapus</span>
              </button>
            )}

            {/* Deselect button */}
            <button
              type="button"
              onClick={() => onSelectSlot(-1)}
              className="p-1.5 text-neutral-400 hover:text-neutral-700"
              aria-label="Tutup menu slot"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
