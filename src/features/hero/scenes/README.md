# Hero Reel Scene Components

This directory contains individual scene components for the 5-scene Hero Reel animation.

## Scene 02: Charms Dropping with Stagger

**Duration**: 3-6 seconds (3 seconds total)  
**Requirements**: 3.4, 3.5, 3.6

### Features

- **3 Charm Drop Animation**: Heart, star, and letter A charms drop from above with staggered timing
- **Magnetic Snap Physics**: Spring animation with stiffness 500, damping 30
- **Stagger Delay**: 250ms between each charm
- **Scene Message**: "Tambah Cerita." (Add your story)

### Animation Timeline

```
0ms    - Heart charm begins dropping
250ms  - Star charm begins dropping (0.25s delay)
500ms  - Letter A charm begins dropping (0.5s delay)
800ms  - All charms snapped to position
```

### Integration Example

```tsx
import { Scene02 } from './scenes/Scene02';

// In HeroReel component timeline
{currentScene === 1 && <Scene02 />}
```

### Testing

Run unit tests:
```bash
npm test -- src/features/hero/scenes/Scene02.test.tsx
```

### Component Structure

```
Scene02
├── Motion.div (fade-in container)
│   ├── Charm Drop Container
│   │   ├── Motion.div (Heart) - delay 0ms
│   │   ├── Motion.div (Star) - delay 250ms
│   │   └── Motion.div (Letter A) - delay 500ms
│   └── Content Section
│       ├── Technical Label (MAGNETIC SNAP · STIFFNESS 500)
│       ├── Scene Heading (Tambah Cerita)
│       └── Description Text
```

### Design Specifications

- **Charm Size**: 80px (mobile) / 112px (desktop)
- **Initial Position**: y: -60px, scale: 0.7, opacity: 0
- **Final Position**: y: 0px, scale: 1, opacity: 1
- **Spring Physics**: Stiffness 500, Damping 30
- **Background**: White cards with steel borders
- **Typography**: Geist Mono for metadata, Plus Jakarta Sans for headings

---

## Scene 03: Bracelet Assembly and Curve Morph

**Duration**: 6-10 seconds (4 seconds total)  
**Requirements**: 3.7, 3.8, 3.9

### Features

- **18-Link Assembly**: Shows 18 bracelet links appearing with staggered animation (50ms delay between links)
- **Curve Morph**: Links transition from straight line to curved bracelet shape using sine wave positioning
- **Price Counter**: Animates from Rp 0 to Rp 198,000 over 300ms
- **Themed Charms**: Includes heart (index 2), star (index 5), and letter A (index 8) charms among plain links

### Animation Timeline

```
0ms   - Links begin appearing (stagger starts)
900ms - All links assembled (18 × 50ms)
500ms - Curve morph begins
1100ms - Curve morph complete
800ms  - Price badge appears
1000ms - Scene message reveals
```

### Integration Example

```tsx
import { Scene03 } from './scenes/Scene03';

// In HeroReel component timeline
{currentScene === 2 && <Scene03 />}
```

### Testing

Run unit tests:
```bash
npm test -- src/features/hero/scenes/Scene03.test.tsx
```

Run integration tests:
```bash
npm test -- src/features/hero/scenes/Scene03.integration.test.tsx
```

### Component Structure

```
Scene03
├── Bracelet Assembly Container
│   └── 18 Motion.div Links (with curve positioning)
│       └── CharmSvg components
└── Content Section
    ├── Price Badge (animated counter)
    └── Scene Message (heading + description)
```

### Design Specifications

- **Link Size**: 28px (mobile) / 40px (desktop)
- **Gap**: 2px (mobile) / 4px (desktop)
- **Curve Calculation**: Sine wave with 15px amplitude
- **Spring Physics**: Stiffness 400, Damping 25
- **Typography**: Mono font for price, Plus Jakarta Sans for headings
- **Colors**: Emerald-700 for price, Ink for headings
