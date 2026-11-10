import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { formatRupiah } from '../lib/format-rupiah';
import { useCart } from '../features/cart/cartContext';
import { CharmSvg } from './CharmSvg';
import { soundEngine } from '../lib/sound';

interface ProductCardProps {
  product: Product;
  className?: string;
  shapeVariant?: 'leaf' | 'arch' | 'squircle' | 'diagonal';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  className = '',
  shapeVariant = 'leaf',
}) => {
  const { addProductToCart } = useCart();
  const [imgError, setImgError] = React.useState(false);

  const shapeClasses = {
    leaf: 'rounded-tl-[36px] rounded-br-[36px] rounded-tr-[16px] rounded-bl-[16px]',
    arch: 'rounded-t-[36px] rounded-b-[16px]',
    diagonal: 'rounded-tr-[36px] rounded-bl-[36px] rounded-tl-[16px] rounded-br-[16px]',
    squircle: 'rounded-[28px]',
  };

  const innerShapeClasses = {
    leaf: 'rounded-tl-[26px] rounded-br-[26px] rounded-tr-[10px] rounded-bl-[10px]',
    arch: 'rounded-t-[26px] rounded-b-[10px]',
    diagonal: 'rounded-tr-[26px] rounded-bl-[26px] rounded-tl-[10px] rounded-br-[10px]',
    squircle: 'rounded-[20px]',
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    soundEngine.playSnap();
    addProductToCart(product.id, 1);
  };

  // Determine SVG emblem based on product characteristics
  const getProductSymbol = (id: string): string => {
    if (id.includes('star')) return 'star';
    if (id.includes('heart')) return 'heart';
    if (id.includes('alien')) return 'alien';
    if (id.includes('dino')) return 'dino';
    if (id.includes('letter')) return 'A';
    if (id.includes('extension')) return 'plain';
    if (id.includes('florence')) return 'star';
    if (id.includes('pop')) return 'alien';
    return 'plain';
  };

  const isBracelet = product.id.startsWith('prod-starter') || product.id.startsWith('prod-florence') || product.id.startsWith('prod-pop');
  const hasValidImage = Boolean(product.imageUrl && !imgError);

  return (
    <div
      onMouseEnter={() => soundEngine.playTick()}
      className={`group bg-white p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-sm shadow-black/4 hover:shadow-xl hover:shadow-black/8 hover:-translate-y-1 relative overflow-hidden ${shapeClasses[shapeVariant]} ${className}`}
    >
      {/* Optional Tag badge */}
      {product.tag && (
        <span className="absolute top-5 left-5 z-20 micro-label bg-white text-ink px-2.5 py-0.5 rounded-full font-bold shadow-xs">
          {product.tag}
        </span>
      )}

      {/* Visual Area */}
      <Link
        to={`/shop/${product.id}`}
        data-cursor="View"
        className={`block w-full aspect-square bg-neutral-100/70 relative overflow-hidden flex items-center justify-center transition-colors duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${innerShapeClasses[shapeVariant]}`}
      >
        {hasValidImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          />
        ) : isBracelet ? (
          /* Multi-link bracelet preview representation */
          <div className="w-full flex items-center justify-center gap-1.5 py-4 p-6">
            <div className="w-10 h-10 shrink-0"><CharmSvg symbol="plain" /></div>
            <div className="w-10 h-10 shrink-0"><CharmSvg symbol={getProductSymbol(product.id)} /></div>
            <div className="w-10 h-10 shrink-0"><CharmSvg symbol="plain" /></div>
          </div>
        ) : (
          <div className="w-20 h-20 p-6 transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
            <CharmSvg symbol={getProductSymbol(product.id)} name={product.name} />
          </div>
        )}

        {/* Quick Add overlay button on hover with M3 Pill style */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-3 right-3 z-20 bg-ink text-paper px-3 py-2 rounded-full shadow-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)] hover:bg-neutral-800 hover:scale-105 active:scale-95 flex items-center gap-1.5 text-xs font-semibold"
          aria-label={`Tambah ${product.name} ke keranjang`}
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Quick Add</span>
        </button>
      </Link>

      {/* Meta Info */}
      <div className="pt-4 flex flex-col justify-between flex-1">
        <div>
          <span className="micro-label text-neutral-500 tracking-wider">
            {product.category}
          </span>
          <Link to={`/shop/${product.id}`}>
            <h3 className="text-sm font-semibold text-ink group-hover:text-neutral-700 transition-colors mt-0.5 line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-1">{product.material}</p>
        </div>

        <div className="mt-3 pt-3 flex items-center justify-between">
          <span className="text-sm font-bold font-mono text-ink">
            {formatRupiah(product.price)}
          </span>
          <span className="micro-label text-neutral-400">
            {product.inStock ? 'Ready' : 'Habis'}
          </span>
        </div>
      </div>
    </div>
  );
};
