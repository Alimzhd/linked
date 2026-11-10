import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Charm } from '../../types';
import charmsData from '../../data/charms.json';
import { CharmSvg } from '../../components/CharmSvg';
import { formatRupiah } from '../../lib/format-rupiah';
import { Plus } from 'lucide-react';
import { useMotionEngine } from '../../engine/MotionEngine';
import { ButtonGroup } from '../../components/ui/ButtonGroup';

interface DraggableCharmCardProps {
  charm: Charm;
  onSelect: (charmId: string) => void;
}

const DraggableCharmCard: React.FC<DraggableCharmCardProps> = ({ charm, onSelect }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `charm-${charm.id}`,
    data: {
      type: 'charm',
      charm,
    },
    disabled: !charm.inStock,
  });

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => {
        if (charm.inStock) {
          onSelect(charm.id);
        }
      }}
      className={`group relative p-3 rounded-[20px] bg-[#F4F6FA] flex flex-col items-center justify-between transition-all duration-200 select-none ${
        !charm.inStock
          ? 'opacity-40 cursor-not-allowed bg-neutral-100'
          : 'cursor-grab active:cursor-grabbing shadow-2xs hover:shadow-md hover:bg-white hover:-translate-y-0.5'
      }`}
    >
      {/* Out of Stock Label */}
      {!charm.inStock && (
        <span className="absolute top-2 right-2 micro-label text-[9px] bg-neutral-300 text-neutral-700 px-1.5 py-0.5 rounded font-bold">
          HABIS
        </span>
      )}

      {/* SVG Charm Visual */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 p-1 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <CharmSvg symbol={charm.symbol} name={charm.name} />
      </div>

      {/* Charm Info */}
      <div className="w-full text-center mt-2 pt-2">
        <h4 className="text-xs font-semibold text-ink truncate" title={charm.name}>
          {charm.name}
        </h4>
        <div className="flex items-center justify-center gap-1 mt-1">
          <span className="text-[11px] font-mono font-bold text-neutral-800">
            {charm.addPrice === 0 ? 'Termasuk' : `+${formatRupiah(charm.addPrice)}`}
          </span>
        </div>
      </div>

      {/* Click-to-add action button */}
      {charm.inStock && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(charm.id);
          }}
          className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-ink text-paper text-[10px] font-semibold px-2.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm flex items-center gap-1"
          aria-label={`Pasang ${charm.name}`}
        >
          <Plus className="w-2.5 h-2.5" />
          <span>Pasang</span>
        </button>
      )}
    </div>
  );
};

interface CharmLibraryProps {
  onSelectCharm: (charmId: string) => void;
}

export const CharmLibrary: React.FC<CharmLibraryProps> = ({ onSelectCharm }) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const { triggerHalftone } = useMotionEngine();

  const tabs: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Charm' },
    { id: 'basic', label: 'Basic' },
    { id: 'cute', label: 'Cute' },
    { id: 'funny', label: 'Funny' },
    { id: 'letter', label: 'Inisial Huruf' },
  ];

  const tabItems = tabs.map((t) => ({ value: t.id, label: t.label }));

  const filteredCharms = (charmsData as Charm[]).filter((c) => {
    if (activeTab === 'all') return true;
    return c.category === activeTab;
  });

  return (
    <div className="w-full bg-white rounded-[24px] p-6 md:p-8 space-y-6 shadow-md shadow-black/4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
        <div>
          <h3 className="text-base font-bold text-ink tracking-tight">Koleksi <span className="accent-serif font-normal">Pustaka</span> Charm</h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Klik atau seret charm ke dalam slot gelang di atas untuk memasang.
          </p>
        </div>

        {/* Tab Filters using M3 Expressive Segmented Button Group */}
        <ButtonGroup
          items={tabItems}
          value={activeTab}
          onChange={(id) => {
            setActiveTab(id);
            triggerHalftone('category');
          }}
          size="sm"
          showCheckmark={true}
          ariaLabel="Filter kategori charm"
        />
      </div>

      {/* Grid of Draggable Charms */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {filteredCharms.map((charm) => (
          <DraggableCharmCard
            key={charm.id}
            charm={charm}
            onSelect={onSelectCharm}
          />
        ))}
      </div>
    </div>
  );
};
