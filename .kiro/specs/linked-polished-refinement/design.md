# Design Document: LINKED! Polished Refinement

## Architecture Overview

### Component Structure

```
src/
├── features/
│   ├── hero/
│   │   ├── HeroReel.tsx          # 5-scene SVG timeline (0s, 3s, 6s, 10s, 13s)
│   │   ├── useHeroTimeline.ts    # Animation controller hook
│   │   └── scenes/               # Individual scene components
│   ├── customizer/
│   │   ├── BraceletBar.tsx       # Main preview with snap physics
│   │   ├── Slot.tsx              # Individual slot with magnetic attraction
│   │   ├── CharmLibrary.tsx      # Category-filtered charm grid
│   │   └── useSnap.ts            # Spring physics (stiffness 500, damping 30)
│   ├── cart/
│   │   ├── CartDrawer.tsx        # Slide-over with stagger (40ms)
│   │   └── cartContext.tsx       # State + localStorage persistence
│   └── shop/
│       └── useFilters.ts         # Client-side array filtering
├── pages/
│   ├── Home.tsx                  # Hero + value prose + carousel
│   ├── Shop.tsx                  # Filters + grid (2/4 cols)
│   ├── About.tsx                 # Narrative + FAQ accordion
│   └── Checkout.tsx              # Form validation + wa.me link
├── components/
│   ├── ProductCard.tsx           # Hover: scale 1.04 (500ms), button slide (200ms)
│   └── PageTransition.tsx        # Fade + clip-path (450ms)
└── styles/
    └── tokens.css                # Design system variables
```

## 1. Hero Reel: 5-Scene SVG Timeline

### Timeline Specification

**Technology**: Framer Motion timeline with SVG primitives

**Scenes**:
- `0-3s`: Link draws from line to solid (ease-out-expo 800ms)
- `3-6s`: 3 charms drop/snap (stagger 250ms, spring physics)
- `6-10s`: 18 links assemble + curve morph + price count-up (300ms)
- `10-13s`: Background → blush, 2 charms swap (cross-fade 400ms), rotate 12°
- `13-15s`: Wordmark reveal (mask 600ms) → loop

**Controls**:
- Pause when out of viewport (Intersection Observer)
- Pause when tab inactive (Page Visibility API)
- Static poster for `prefers-reduced-motion`

**UI Elements**:
- Corner brackets (2px borders, neutral-400)
- Top-left: Scene label "01 · LINK" (mono font)
- Top-right: Timecode "00:00 - 00:03"
- Bottom: 5 dot indicators + play/pause button

### Implementation Approach

```typescript
// useHeroTimeline.ts
export const useHeroTimeline = () => {
  const [scene, setScene] = useState(0);
  const controls = useAnimation();
  
  const timeline = [
    { duration: 3000, animations: linkDraw },
    { duration: 3000, animations: charmsDropStagger },
    { duration: 4000, animations: assembleAndCurve },
    { duration: 3000, animations: swapAndRotate },
    { duration: 2000, animations: wordmarkReveal }
  ];
  
  // Pause on visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) controls.pause();
      else controls.play();
    };
    document.addEventListener('visibilitychange', handleVisibility);
  }, []);
  
  return { scene, controls, loop: true };
};
```

## 2. Component Refactoring: Anti-Slop Compliance

### Home Page Value Section Replacement

**Before**: 3-card icon-title-text layout  
**After**: Prose narrative with inline technical specs

```typescript
// Home.tsx value section
<section className="value-narrative">
  <h2>Small charms, <span className="accent-serif">big</span> personality.</h2>
  <div className="prose">
    <p>
      Built on the **9mm modular link** system from Florence. Each link is 
      surgical grade **316L stainless steel** with an **internal spring 
      mechanism** that clicks into place.
    </p>
    <p>
      Price transparency: Base bracelet + charm add-ons = instant total. 
      No hidden costs, no surprises at checkout.
    </p>
  </div>
</section>
```

### Design Token Enforcement

**CSS Variables** (`tokens.css`):
```css
:root {
  --ink: #121212;
  --paper: #F9F9FB;
  --steel: #E2E8F0;
  --blush: #F4E8E1;
  
  --gradient-metal: linear-gradient(135deg, 
    #FFFFFF, #CBD5E1, #F1F5F9, #94A3B8);
  
  --font-body: 'Plus Jakarta Sans', sans-serif;
  --font-accent: 'Instrument Serif', serif;
  --font-mono: 'Geist Mono', monospace;
  
  --radius: 12px;
  --border: 1px solid var(--steel);
}

/* Typography utility */
.accent-serif {
  font-family: var(--font-accent);
  font-style: italic;
  font-weight: 400;
}

/* Metal gradient for links/charms */
.metal-gradient {
  background: var(--gradient-metal);
}
```

## 3. Motion System

### Page Transitions (450ms)

```typescript
// PageTransition.tsx
const pageVariants = {
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  },
  enter: {
    clipPath: 'inset(100% 0 0 0)',
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  }
};

export const PageTransition = ({ children }) => (
  <motion.div
    initial="enter"
    animate="enter"
    exit="exit"
    variants={pageVariants}
  >
    {children}
  </motion.div>
);
```

### Grid Stagger (60ms)

```typescript
// Shop.tsx
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 }
};

<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="show"
  className="product-grid"
>
  {products.map(p => (
    <motion.div key={p.id} variants={itemVariants}>
      <ProductCard {...p} />
    </motion.div>
  ))}
</motion.div>
```

### Snap Physics (stiffness 500, damping 30)

```typescript
// useSnap.ts
export const useSnap = (slotPosition: { x: number; y: number }) => {
  const dragConstraints = { left: 0, right: 0, top: 0, bottom: 0 };
  
  const handleDragEnd = (event, info) => {
    const distance = Math.hypot(
      info.point.x - slotPosition.x,
      info.point.y - slotPosition.y
    );
    
    if (distance < 48) {
      // Snap with spring
      controls.start({
        x: slotPosition.x,
        y: slotPosition.y,
        transition: {
          type: 'spring',
          stiffness: 500,
          damping: 30
        }
      });
      
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate(10);
      }
    } else {
      // Return to origin
      controls.start({
        x: 0,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
      });
    }
  };
  
  return { handleDragEnd };
};
```

## 4. Shop Filters: Client-Side Array Filtering

### Filter Logic

```typescript
// useFilters.ts
type FilterType = 'Semua' | 'Basic Links' | 'Individual Charms' | 'Cute' | 'Funny';

export const useFilters = (products: Product[]) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Semua');
  
  const filtered = useMemo(() => {
    if (activeFilter === 'Semua') return products;
    
    return products.filter(p => {
      switch (activeFilter) {
        case 'Basic Links':
          return p.category === 'basic';
        case 'Individual Charms':
          return p.category === 'charm';
        case 'Cute':
          return p.tags?.includes('cute');
        case 'Funny':
          return p.tags?.includes('funny');
        default:
          return true;
      }
    });
  }, [products, activeFilter]);
  
  return { filtered, activeFilter, setActiveFilter };
};
```

### Filter UI

```typescript
// Shop.tsx
<div className="filter-chips">
  {['Semua', 'Basic Links', 'Individual Charms', 'Cute', 'Funny'].map(f => (
    <button
      key={f}
      onClick={() => setActiveFilter(f)}
      className={cn(
        'filter-chip',
        activeFilter === f && 'active'
      )}
    >
      {f}
    </button>
  ))}
  <span className="product-count">{filtered.length} produk</span>
</div>
```

## 5. About Page: Brand Narrative + FAQ Accordion

### Content Structure

```typescript
// About.tsx
<main className="about-page">
  {/* Brand Statement */}
  <section className="brand-hero">
    <h1>Small charms, <span className="accent-serif">big</span> personality.</h1>
    <p className="narrative">
      The Italian modular bracelet originated in Florence as a personal 
      storytelling system. Each 9mm link holds one charm, secured by an 
      internal spring mechanism...
    </p>
  </section>
  
  {/* Comparison Cards */}
  <section className="comparison">
    <div className="card">
      <h3>Not conventional charm bracelet</h3>
      <p>No dangling pieces. Charms sit flush inside links.</p>
    </div>
    <div className="card">
      <h3>Surgical Grade material</h3>
      <p>316L stainless steel. Hypoallergenic, tarnish-resistant.</p>
    </div>
  </section>
  
  {/* Assembly Guide */}
  <section className="assembly-guide">
    <h2>How to attach charms</h2>
    <ol>
      <li>Stretch two modules apart</li>
      <li>Release sliding latch</li>
      <li>Insert new charm</li>
    </ol>
  </section>
  
  {/* Packaging */}
  <section className="packaging">
    <h2>Packaging options</h2>
    <div className="options">
      <div>Standard Canvas Pouch (free)</div>
      <div>Signature Gift Box Set (+Rp 25,000)</div>
    </div>
  </section>
  
  {/* FAQ Accordion */}
  <FAQ items={faqData} />
</main>
```

### FAQ Accordion Component

```typescript
// FAQ.tsx
export const FAQ = ({ items }: { items: { question: string; answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      {items.map((item, i) => (
        <motion.div key={i} className="faq-item">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="faq-question"
          >
            {item.question}
          </button>
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="faq-answer"
              >
                {item.answer}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </section>
  );
};
```

## 6. Checkout: Form Validation + WhatsApp Link

### Form State & Validation

```typescript
// Checkout.tsx
const [form, setForm] = useState({
  name: '',
  whatsapp: '',
  address: '',
  notes: ''
});

const isValid = form.name && form.whatsapp && form.address;

const handleSubmit = () => {
  const message = generateWhatsAppMessage(form, cartItems);
  const url = `https://wa.me/62${form.whatsapp}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
```

### WhatsApp Message Generator

```typescript
// generateWhatsAppMessage.ts
export const generateWhatsAppMessage = (
  form: CheckoutForm,
  items: CartItem[]
): string => {
  let message = `*PESANAN BARU - LINKED!*\n\n`;
  message += `Nama: ${form.name}\n`;
  message += `Alamat: ${form.address}\n\n`;
  message += `*DETAIL PESANAN:*\n`;
  
  items.forEach(item => {
    if (item.kind === 'custom') {
      const charmNames = item.build.slots
        .filter(Boolean)
        .map(id => charms.find(c => c.id === id)?.name)
        .join(', ');
      message += `- Gelang Custom: ${item.build.size} size, ${charmNames}\n`;
      message += `  Qty: ${item.qty} x Rp ${item.unitPrice.toLocaleString()}\n`;
    } else {
      const product = products.find(p => p.id === item.productId);
      message += `- ${product.name}\n`;
      message += `  Qty: ${item.qty} x Rp ${product.price.toLocaleString()}\n`;
    }
  });
  
  message += `\nKemasan: ${packaging === 'gift' ? 'Gift Box (+Rp 25,000)' : 'Standard'}\n`;
  if (giftNote) message += `Kartu ucapan: ${giftNote}\n`;
  message += `\n*TOTAL: Rp ${grandTotal.toLocaleString()}*`;
  
  return message;
};
```

## 7. Performance: Lazy-Load & Animation Optimization

### Lazy Loading Customizer

```typescript
// router.tsx
const Customize = lazy(() => import('./pages/Customize'));

<Route
  path="/customize"
  element={
    <Suspense fallback={<div>Loading customizer...</div>}>
      <Customize />
    </Suspense>
  }
/>
```

### Animation Optimization Rules

**Only animate `transform` and `opacity`**:
```css
/* ✅ Good - GPU accelerated */
.card {
  transition: transform 0.3s, opacity 0.3s;
  will-change: transform;
}

/* ❌ Bad - triggers layout reflow */
.card {
  transition: width 0.3s, margin 0.3s;
}
```

**Cleanup `will-change`**:
```typescript
const handleHoverStart = () => {
  ref.current.style.willChange = 'transform';
};

const handleHoverEnd = () => {
  ref.current.style.willChange = 'auto';
};
```

**Reduced Motion Support**:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Allow fade transitions */
  .fade-transition {
    transition-duration: 150ms !important;
  }
}
```

## Data Models

### Product
```typescript
type Product = {
  id: string;
  name: string;
  category: 'basic' | 'charm';
  tags?: ('cute' | 'funny')[];
  price: number;
  inStock: boolean;
  image: string;
  description?: string;
};
```

### Charm
```typescript
type Charm = {
  id: string;
  name: string;
  category: 'basic' | 'cute' | 'funny' | 'letter';
  addPrice: number; // Additional cost over plain link
  inStock: boolean;
  symbol: string; // SVG path or emoji
};
```

### Cart Item
```typescript
type CartItem =
  | { kind: 'product'; productId: string; qty: number }
  | { kind: 'custom'; build: Build; qty: number; unitPrice: number };

type Build = {
  size: 'S' | 'M' | 'L';
  slots: (string | null)[]; // charm IDs, null = plain link
};
```

### Cart State
```typescript
type CartState = {
  items: CartItem[];
  packaging: 'standard' | 'gift';
  giftNote?: string;
};
```

## Error Handling

### Error Boundary
```typescript
// ErrorBoundary.tsx
class ErrorBoundary extends React.Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### LocalStorage Wrapper
```typescript
// storage.ts
export const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('localStorage.getItem failed:', e);
    return null;
  }
};

export const safeSetItem = (key: string, value: string): boolean => {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (e) {
    console.warn('localStorage.setItem failed:', e);
    return false;
  }
};
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Banned Word Filtering

*For any* text content rendered in the application, the text SHALL NOT contain any words from the banned list ["revolutionary", "elevate", "unleash", "seamless"].

**Validates: Requirements 1.3**

### Property 2: Blur Effect Isolation

*For any* element in the DOM with CSS `backdrop-filter: blur()` or `filter: blur()`, that element MUST be a descendant of the header component.

**Validates: Requirements 1.6**

### Property 3: Metal Gradient Specification

*For any* element with the class "metal-gradient", the computed `background-image` CSS property SHALL match the gradient string `linear-gradient(135deg, #FFFFFF, #CBD5E1, #F1F5F9, #94A3B8)`.

**Validates: Requirements 2.6**

### Property 4: Shop Filter Correctness

*For any* filter selection and product dataset, all displayed products SHALL satisfy the filter predicate: "Semua" shows all, "Basic Links" shows `category === 'basic'`, "Individual Charms" shows `category === 'charm'`, "Cute" shows `tags.includes('cute')`, "Funny" shows `tags.includes('funny')`.

**Validates: Requirements 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**

### Property 5: WhatsApp Message Completeness

*For any* cart state with items and valid form input, the generated WhatsApp message SHALL contain customer name, delivery address, itemized order list with quantities and prices, packaging choice, optional gift note, and grand total.

**Validates: Requirements 7.8, 7.10**

### Property 6: Grid Stagger Timing

*For any* product grid with N cards rendered for the first time, the card at index `i` SHALL have an animation delay of `i * 60` milliseconds relative to the first card.

**Validates: Requirements 9.2**

### Property 7: Snap Physics Distance Threshold

*For any* charm dragged within 48 pixels of a slot center, the charm SHALL animate to the exact slot center using spring physics with stiffness 500 and damping 30.

**Validates: Requirements 10.1, 10.2**

### Property 8: Parallax Offset Limit

*For any* scroll position on Hero or About page, the parallax translation offset SHALL NOT exceed 40 pixels in either direction.

**Validates: Requirements 12.1, 12.2**

### Property 9: Responsive Breakpoint Compliance

*For any* viewport width `w`, if `w < 768px` then horizontal margins SHALL be 24px and grid columns SHALL be 2; if `w >= 768px` then horizontal margins SHALL be 64px and grid columns SHALL be 4.

**Validates: Requirements 14.1, 14.2, 14.7, 14.8**

### Property 10: LocalStorage Persistence Round-Trip

*For any* cart state or build state, serializing to localStorage and then deserializing SHALL produce an equivalent state object with all items, quantities, and charm placements preserved.

**Validates: Requirements 18.1, 18.2, 18.3, 18.4**

### Property 11: Data Model Type Conformance

*For any* object loaded from `products.json`, `charms.json`, or `faq.json`, the object SHALL contain all required properties matching the corresponding TypeScript type definition.

**Validates: Requirements 17.4, 17.5, 17.6**

### Property 12: Hero Timeline Duration

*For any* Hero_Reel instance, the animation timeline SHALL have exactly 5 scenes with cumulative duration of 15000 milliseconds, and upon reaching 15000ms SHALL loop back to scene 0.

**Validates: Requirements 3.1, 3.17**

---

## Testing Strategy

### Unit Tests
- Component rendering with props variations
- Filter logic with edge cases (empty arrays, missing tags)
- WhatsApp message formatting with different cart combinations
- LocalStorage error handling (privacy mode, quota exceeded)

### Property-Based Tests (100+ iterations)
- **Filter Correctness**: Generate random product datasets and filter selections, verify all displayed products match filter predicate
- **Snap Physics**: Generate random drag positions, verify snapping occurs within 48px threshold
- **Parallax Limits**: Generate random scroll positions, verify offset never exceeds 40px
- **Data Round-Trip**: Generate random cart/build states, verify serialization preserves all data

**Property Test Configuration**: Minimum 100 iterations per property, tagged with `**Feature: linked-polished-refinement, Property {N}**`

### Integration Tests
- Full checkout flow: add to cart → modify → checkout → verify WhatsApp URL
- Hero animation pause/resume on visibility changes
- Responsive layout at breakpoints 360px, 768px, 1280px, 1440px

### Performance Tests
- Lighthouse scores: Performance > 90, Accessibility > 90
- Animation frame rate during Hero playback (target 60fps)
- Bundle size analysis (Customizer chunk separate from main bundle)

## Acceptance Criteria Summary

Each feature is complete when:
- **Hero**: 5 scenes play with correct timing, pause when off-screen, show poster for reduced motion
- **Filters**: Products update immediately without reload, count displays correctly
- **Checkout**: Form validation blocks submission until complete, WhatsApp URL contains all order details
- **Motion**: Page transitions smooth at 450ms, grid staggers at 60ms intervals, snap feels magnetic
- **Accessibility**: All keyboard operable, focus visible, ARIA labels present
- **Performance**: Only transform/opacity animated, Customizer lazy-loaded, 60fps maintained
