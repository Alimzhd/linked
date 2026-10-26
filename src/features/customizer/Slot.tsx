import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { X } from 'lucide-react';
import { CharmSvg } from '../../components/CharmSvg';
import charmsData from '../../data/charms.json';

interface SlotProps {
  index: number;
  charmId: string | null;
  isSelected: boolean;
  onSelect: (index: number) => void;
  onRemove: (index: number) => void;
}

export const Slot: React.FC<SlotProps> = ({
  index,
  charmId,
  isSelected,
  onSelect,
  onRemove,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${index}`,
    data: {
      type: 'slot',
      slotIndex: index,
    },
  });

  const charm = charmId ? charmsData.find((c) => c.id === charmId) : null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      onRemove(index);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(index);
    }
  };

  return (
    <div
      ref={setNodeRef}
      role="button"
      tabIndex={0}
      aria-label={`Slot ${index + 1}: ${charm ? charm.name : 'Link Polos'}`}
      aria-selected={isSelected}
      onClick={() => onSelect(index)}
      onKeyDown={handleKeyDown}
      className={`relative w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] shrink-0 rounded-lg select-none transition-all duration-200 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 ${
        isSelected
          ? 'ring-2 ring-ink ring-offset-2 scale-105 z-20'
          : 'hover:scale-[1.03] z-10'
      } ${
        isOver
          ? 'ring-2 ring-neutral-800 scale-110 z-30 shadow-lg'
          : ''
      }`}
    >
      {/* Visual Link / Charm */}
      <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center p-0.5 shadow-xs">
        <CharmSvg
          symbol={charm ? charm.symbol : 'plain'}
          name={charm ? charm.name : `Slot ${index + 1}`}
        />
      </div>

      {/* Slot Index Micro-label */}
      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 micro-label text-[9px] text-neutral-600 font-mono pointer-events-none select-none">
        {index + 1}
      </span>

      {/* Remove Button for Non-Plain Charm on Hover */}
      {charm && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove(index);
          }}
          className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 bg-ink text-paper rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-md hover:bg-red-600 z-30"
          aria-label={`Hapus ${charm.name} dari slot ${index + 1}`}
        >
          <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
        </button>
      )}

      {/* Snap Indicator Pulsing halo when dragged over */}
      {isOver && (
        <div className="absolute inset-0 rounded-lg ring-2 ring-ink animate-pulse pointer-events-none" />
      )}
    </div>
  );
};
