# Implementation Plan: LINKED! Polished Refinement

## Overview

This implementation plan refines the existing LINKED! React TypeScript application to achieve Polished tier compliance with the Master Specification. Tasks are organized by priority: fixing existing code quality issues, rebuilding the hero animation, completing missing features, and adding motion polish.

The application uses React 18.3, TypeScript 5.7, Framer Motion 11.18, React Router 6.29, and Vite 6.1. All motion specifications use Framer Motion primitives, and design tokens are enforced via CSS custom properties in `src/styles/tokens.css`.

## Tasks

### Priority 1: Fix Existing Code

- [ ] 1. Remove AI slop patterns and enforce design tokens
  - [x] 1.1 Audit and remove three-card layouts from Home page
    - Read `src/pages/Home.tsx` and identify any three-card icon-title-text layouts
    - Replace with prose narrative or alternative structure from design document
    - Ensure no filler words ("revolutionary", "elevate", "unleash", "seamless") in copy
    - Remove purple/blue gradients, blob shapes, or particle effects
    - Remove emoji icons used as decorative elements
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 1.2 Enforce design system color tokens across all components
    - Update `src/styles/tokens.css` with exact color values: ink #121212, paper #F9F9FB, steel #E2E8F0, blush #F4E8E1
    - Define metal gradient: `linear-gradient(135deg, #FFFFFF, #CBD5E1, #F1F5F9, #94A3B8)`
    - Audit all components in `src/components/` and `src/features/` directories
    - Replace hardcoded colors with CSS custom properties
    - Ensure steel (#E2E8F0) is NOT used for text content
    - Apply 12px border-radius and 1px steel borders uniformly
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.10, 2.11_

  - [x] 1.3 Fix typography hierarchy and font family usage
    - Verify Plus Jakarta Sans is loaded with weights 400, 500, 700
    - Verify Instrument Serif and Geist Mono are loaded
    - Create `.accent-serif` CSS class for italic Instrument Serif
    - Audit all heading elements (h1, h2, h3) in all page components
    - Wrap exactly ONE accent word per heading in `<span className="accent-serif">`
    - Apply Geist Mono to scene numbers, categories, price displays, timecodes
    - Ensure only font weights 400, 500, 700 are used throughout
    - _Requirements: 2.7, 2.8, 2.9, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6_

  - [-] 1.4 Write property test for banned word filtering
    - **Property 1: Banned Word Filtering**
    - **Validates: Requirements 1.3**
    - Generate test cases with random text content
    - Verify no text contains ["revolutionary", "elevate", "unleash", "seamless"]
    - Run on all rendered page content (Home, Shop, About, Checkout)

  - [-] 1.5 Write property test for blur effect isolation
    - **Property 2: Blur Effect Isolation**
    - **Validates: Requirements 1.6**
    - Query all DOM elements with blur effects
    - Verify each is descendant of header component
    - Test across all routes

  - [-] 1.6 Write property test for metal gradient specification
    - **Property 3: Metal Gradient Specification**
    - **Validates: Requirements 2.6**
    - Query all elements with "metal-gradient" class
    - Verify computed background-image matches exact gradient string
    - Test with multiple charm and link elements

- [~] 2. Checkpoint: Verify design system compliance
  - Ensure all tests pass, ask the user if questions arise.

### Priority 2: Rebuild Hero Animation

- [ ] 3. Implement 5-scene SVG timeline with exact timing
  - [x] 3.1 Create Hero timeline controller hook
    - Create `src/features/hero/useHeroTimeline.ts` with animation state machine
    - Define 5 scenes with durations: Scene 01 (0-3s), Scene 02 (3-6s), Scene 03 (6-10s), Scene 04 (10-13s), Scene 05 (13-15s)
    - Implement loop mechanism resetting to Scene 01 at 15000ms
    - Export scene state, controls, and current timecode
    - _Requirements: 3.1, 3.17_

  - [x] 3.2 Implement Scene 01: Link drawing animation
    - Create `src/features/hero/scenes/Scene01.tsx` component
    - Render single steel link SVG path drawing from thin line to solid
    - Use Framer Motion path animation with ease-out-expo easing, 800ms duration
    - Display scene label "01 · LINK" and timecode "00:00 - 00:03"
    - Display scene message text (if specified in design)
    - _Requirements: 3.2, 3.3_

  - [x] 3.3 Implement Scene 02: Charms dropping with stagger
    - Create `src/features/hero/scenes/Scene02.tsx` component
    - Render 3 charm SVGs (heart, star, letter) above link
    - Animate charms dropping and snapping to link with 250ms stagger
    - Use spring physics: stiffness 500, damping 30
    - Display scene label "02 · CHARM" and timecode "00:03 - 00:06"
    - Display scene message "Tambah cerita."
    - _Requirements: 3.4, 3.5, 3.6_

  - [x] 3.4 Implement Scene 03: Bracelet assembly and curve morph
    - Create `src/features/hero/scenes/Scene03.tsx` component
    - Render 18 links assembling into bracelet shape
    - Animate straight line morphing to curved bracelet
    - Implement price counter animating from 0 to final value over 300ms
    - Display scene label "03 · RAKIT" and timecode "00:06 - 00:10"
    - Display scene message "Rakit sendiri. Harganya langsung terlihat."
    - _Requirements: 3.7, 3.8, 3.9_

  - [x] 3.5 Implement Scene 04: Charm swap and rotation
    - Create `src/features/hero/scenes/Scene04.tsx` component
    - Transition background color to blush (#F4E8E1)
    - Swap positions of 2 charms with cross-fade (400ms duration)
    - Rotate bracelet by 12 degrees
    - Display scene label "04 · MIX" and timecode "00:10 - 00:13"
    - Display scene message "Ganti kapan saja."
    - _Requirements: 3.10, 3.11, 3.12, 3.13_

  - [x] 3.6 Implement Scene 05: Wordmark reveal and CTA buttons
    - Create `src/features/hero/scenes/Scene05.tsx` component
    - Render LINKED! wordmark with mask animation (600ms duration)
    - Reveal headline "YOUR WRIST, YOUR STORY."
    - Display two interactive buttons: "Shop Now" and "Start Customizing"
    - Display scene label "05 · MEREK" and timecode "00:13 - 00:15"
    - Wire button click handlers to navigate to /shop and /customize routes
    - _Requirements: 3.14, 3.15, 3.16_

  - [x] 3.7 Add Hero UI chrome and controls
    - Add corner bracket decorations at all 4 corners (2px borders, neutral-400)
    - Display scene labels in top-left metadata panel
    - Display timecodes in top-right metadata panel
    - Create dot navigation with 5 dots reflecting current scene
    - Add play/pause toggle button in bottom-right corner
    - Style all UI chrome elements in mono font (Geist Mono)
    - _Requirements: 3.21, 3.22, 3.23, 3.24, 3.25_

  - [x] 3.8 Implement Hero pause controls
    - Add Intersection Observer to detect when Hero scrolls out of viewport
    - Pause animation when Hero not visible, resume when visible
    - Add Page Visibility API listener to pause when tab inactive
    - Add prefers-reduced-motion media query check
    - Display static poster (Scene 05 frame) when reduced-motion enabled
    - _Requirements: 3.18, 3.19, 3.20_

  - [x] 3.9 Integrate Hero timeline into HeroReel component
    - Update `src/features/hero/HeroReel.tsx` to use useHeroTimeline hook
    - Render current scene component based on timeline state
    - Wire play/pause button to timeline controls
    - Wire dot navigation to seek to specific scenes
    - Ensure loop cycles continuously during normal playback
    - _Requirements: 3.1, 3.17_

  - [~] 3.10 Write property test for Hero timeline duration
    - **Property 12: Hero Timeline Duration**
    - **Validates: Requirements 3.1, 3.17**
    - Verify timeline has exactly 5 scenes totaling 15000ms
    - Verify loop resets to Scene 01 at 15000ms
    - Test across multiple loop cycles

  - [~] 3.11 Write integration tests for Hero controls
    - Test pause when Hero scrolls out of viewport (mock Intersection Observer)
    - Test pause when tab becomes inactive (mock Page Visibility API)
    - Test static poster display with prefers-reduced-motion
    - Test play/pause button toggles animation state
    - Test dot navigation seeks to correct scene

- [~] 4. Checkpoint: Verify Hero animation timing and controls
  - Ensure all tests pass, ask the user if questions arise.

### Priority 3: Complete Missing Features

- [ ] 5. Implement Shop page filter functionality
  - [~] 5.1 Create filter state management hook
    - Create `src/features/shop/useFilters.ts` with filter logic
    - Define FilterType: 'Semua' | 'Basic Links' | 'Individual Charms' | 'Cute' | 'Funny'
    - Implement filter predicates for each filter type
    - Return filtered product array based on active filter
    - Use useMemo for performance optimization
    - _Requirements: 5.1, 5.2_

  - [~] 5.2 Add filter chips UI to Shop page
    - Update `src/pages/Shop.tsx` to use useFilters hook
    - Render filter chips with labels: "Semua", "Basic Links", "Individual Charms", "Cute", "Funny"
    - Style active filter with distinct visual treatment (filled background or bold border)
    - Display product count for current filter selection
    - Ensure filter changes do NOT trigger URL navigation or page reload
    - _Requirements: 5.1, 5.8, 5.9, 5.10_

  - [~] 5.3 Implement filter logic for all categories
    - Handle "Semua" filter: return all products
    - Handle "Basic Links" filter: return products where category === 'basic'
    - Handle "Individual Charms" filter: return products where category === 'charm'
    - Handle "Cute" filter: return products where tags array includes 'cute'
    - Handle "Funny" filter: return products where tags array includes 'funny'
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7_

  - [~] 5.4 Write property test for shop filter correctness
    - **Property 4: Shop Filter Correctness**
    - **Validates: Requirements 5.2, 5.3, 5.4, 5.5, 5.6, 5.7**
    - Generate random product datasets with varied categories and tags
    - Test each filter selection returns only matching products
    - Verify no false positives or false negatives

- [ ] 6. Build complete About page
  - [~] 6.1 Create About page structure with brand narrative
    - Update `src/pages/About.tsx` with complete content structure
    - Add brand statement heading: "Small charms, big personality." with accent word
    - Include narrative paragraph explaining Italian modular bracelet heritage and Florence origins
    - Use concrete product details (9mm links, 316L steel, internal spring mechanism)
    - _Requirements: 6.1, 6.2_

  - [~] 6.2 Add comparison section to About page
    - Create two contrast cards with distinct visual treatment
    - Card 1: "Not conventional charm bracelet" with explanation of flush-mounted design
    - Card 2: "Surgical Grade material" with 316L stainless steel details
    - Style cards with blush background and steel borders
    - _Requirements: 6.3_

  - [~] 6.3 Add assembly guide to About page
    - Display 3-step assembly instructions as ordered list
    - Step 1: "Stretch two modules apart"
    - Step 2: "Release sliding latch"
    - Step 3: "Insert new charm"
    - Include visual diagram or charm icon for each step
    - _Requirements: 6.4, 6.5_

  - [~] 6.4 Add packaging section to About page
    - Display two packaging options: "Standard Canvas Pouch (free)" and "Signature Gift Box Set (+Rp 25,000)"
    - Use clear pricing information
    - Style as two distinct option cards
    - _Requirements: 6.6_

  - [~] 6.5 Implement FAQ accordion component
    - Create `src/components/FAQ.tsx` component
    - Load FAQ data from `src/data/faq.json`
    - Implement accordion with single-expand behavior (close previous when opening new)
    - Animate expansion with Framer Motion (height auto, 300ms duration)
    - Use concrete product details in FAQ answers (not generic placeholders)
    - Add FAQ questions for: sizing, material, care instructions, shipping, installation
    - _Requirements: 6.7, 6.8, 6.9, 6.10_

  - [~] 6.6 Integrate FAQ accordion into About page
    - Import and render FAQ component in About page
    - Ensure FAQ data is loaded from JSON file
    - Verify accordion expand/collapse animations work smoothly
    - _Requirements: 6.7_

- [ ] 7. Build Checkout page with WhatsApp integration
  - [~] 7.1 Create Checkout page form structure
    - Update `src/pages/Checkout.tsx` with complete form layout
    - Add form fields: full name (required), WhatsApp number (required), delivery address (required), optional order notes
    - Display visual indicators for required fields
    - Style form with consistent design tokens
    - _Requirements: 7.1, 7.2_

  - [~] 7.2 Add order summary panel to Checkout page
    - Display all cart items with quantities and prices
    - Calculate and display subtotal
    - Add packaging cost (+Rp 25,000) if gift box selected
    - Display grand total
    - Show order summary on right side (desktop) or above form (mobile)
    - _Requirements: 7.3, 7.4, 7.5, 7.11, 7.12_

  - [~] 7.3 Implement form validation
    - Validate name field is not empty
    - Validate WhatsApp number field is not empty
    - Validate address field is not empty
    - Disable submit button when any required field is empty
    - Enable submit button only when all required fields have valid input
    - _Requirements: 7.6, 7.7_

  - [~] 7.4 Create WhatsApp message generator utility
    - Create `src/lib/generateWhatsAppMessage.ts` function
    - Format message with customer name, delivery address, itemized order list
    - Format custom bracelets as: "Gelang Custom: [size] size, [count] charms: [charm names]"
    - Include packaging choice, optional gift note, and grand total
    - Format prices with Rp currency and thousand separators
    - _Requirements: 7.8, 7.10_

  - [~] 7.5 Implement WhatsApp submission
    - Wire submit button click to construct WhatsApp message
    - Generate wa.me URL with pre-filled message text
    - Open WhatsApp URL in new tab when form is valid
    - Use phone number from form input in URL
    - _Requirements: 7.8, 7.9_

  - [~] 7.6 Write property test for WhatsApp message completeness
    - **Property 5: WhatsApp Message Completeness**
    - **Validates: Requirements 7.8, 7.10**
    - Generate random cart states with various item types
    - Generate random form inputs
    - Verify all required fields present in message: name, address, items, quantities, prices, packaging, total
    - Verify custom bracelets formatted correctly

  - [~] 7.7 Write integration test for checkout flow
    - Test complete flow: add items to cart → navigate to checkout → fill form → submit
    - Verify WhatsApp URL constructed correctly
    - Verify form validation blocks submission when incomplete
    - Verify order summary displays all cart items

- [~] 8. Checkpoint: Verify all features complete and functional
  - Ensure all tests pass, ask the user if questions arise.

### Priority 4: Motion Polish and Micro-interactions

- [ ] 9. Implement page transition animations
  - [~] 9.1 Create PageTransition wrapper component
    - Create `src/components/PageTransition.tsx` with Framer Motion AnimatePresence
    - Define exit animation: fade opacity to 0, translate down 8px, 450ms duration
    - Define enter animation: clip-path reveal from bottom, 450ms duration
    - Use cubic bezier easing [0.16, 1, 0.3, 1]
    - Keep header component fixed without animation
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [~] 9.2 Integrate page transitions into router
    - Update `src/app/router.tsx` to wrap routes with PageTransition
    - Ensure transitions trigger on route changes
    - Verify header remains fixed during transitions
    - Test across all routes (Home, Shop, About, Customize, Checkout)
    - _Requirements: 8.1, 8.2, 8.3_

  - [~] 9.3 Add reduced-motion support for page transitions
    - Add prefers-reduced-motion media query check
    - Reduce transition durations to 0ms except fade (150ms) when reduced-motion enabled
    - Test with browser reduced-motion setting enabled
    - _Requirements: 8.5_

- [ ] 10. Implement product grid stagger animation
  - [~] 10.1 Add stagger animation to Shop page product grid
    - Update `src/pages/Shop.tsx` with Framer Motion stagger container
    - Define container variants with staggerChildren: 0.06 (60ms)
    - Define item variants: hidden (opacity 0, y: 12), show (opacity 1, y: 0)
    - Apply variants to product grid and ProductCard components
    - _Requirements: 9.1, 9.2, 9.3_

  - [~] 10.2 Add session-based stagger control
    - Track whether grid has been rendered in session using sessionStorage
    - Skip stagger animation on subsequent visits to Shop page
    - Display all cards immediately on repeat visits
    - _Requirements: 9.4_

  - [~] 10.3 Add reduced-motion support for grid stagger
    - Skip stagger animation when prefers-reduced-motion enabled
    - Display all cards immediately
    - _Requirements: 9.5_

  - [~] 10.4 Write property test for grid stagger timing
    - **Property 6: Grid Stagger Timing**
    - **Validates: Requirements 9.2**
    - Test product grid with N cards
    - Verify card at index i has delay of i * 60 milliseconds
    - Test with grids of various sizes (2, 4, 8, 12 cards)

- [ ] 11. Refine Customizer snap motion physics
  - [~] 11.1 Create snap physics hook
    - Create `src/features/customizer/useSnap.ts` with magnetic snap logic
    - Implement 48-pixel snap radius calculation
    - Configure spring animation: stiffness 500, damping 30
    - Calculate distance from drag position to slot center using Math.hypot
    - _Requirements: 10.1, 10.2_

  - [~] 11.2 Implement snap animation and haptic feedback
    - Animate charm to exact slot center when within snap radius
    - Allow spring to overshoot by ~4% before settling
    - Trigger 10ms haptic vibration on snap (if Vibration API supported)
    - Return charm to origin with ease-out (300ms) when released outside radius
    - _Requirements: 10.1, 10.2, 10.3, 10.7_

  - [~] 11.3 Add slot hover and focus states
    - Highlight slot border with pulsing animation when charm hovers
    - Pulse duration: 1600ms, repeat continuously while hovering
    - Display remove button with × icon on mouse hover
    - Display visible focus ring (2px offset) on keyboard focus
    - _Requirements: 10.5, 10.6, 10.8, 10.9_

  - [~] 11.4 Update BraceletBar and Slot components with snap physics
    - Integrate useSnap hook into `src/features/customizer/Slot.tsx`
    - Apply snap physics to drag handlers
    - Wire up hover and focus state handlers
    - Test drag-and-drop with spring animation
    - _Requirements: 10.1, 10.2_

  - [~] 11.5 Write property test for snap physics distance threshold
    - **Property 7: Snap Physics Distance Threshold**
    - **Validates: Requirements 10.1, 10.2**
    - Generate random drag positions relative to slot center
    - Verify charm snaps when distance < 48px
    - Verify charm returns to origin when distance >= 48px
    - Verify spring physics parameters (stiffness 500, damping 30)

- [ ] 12. Implement micro-interactions for buttons and cards
  - [~] 12.1 Add primary button hover animation
    - Update `src/components/Button.tsx` with hover animation
    - Animate ink-colored fill sliding up from bottom (250ms duration)
    - Use Framer Motion or CSS transition
    - Apply to all primary buttons throughout app
    - _Requirements: 11.1_

  - [~] 12.2 Add product card hover effects
    - Update `src/components/ProductCard.tsx` with hover animations
    - Scale card image to 1.04 (500ms duration) on hover
    - Translate "Quick add" button upward by 8px (200ms duration) on hover
    - Test hover effects feel smooth and responsive
    - _Requirements: 11.2, 11.3_

  - [~] 12.3 Add cart drawer slide animation
    - Update `src/features/cart/CartDrawer.tsx` with slide animation
    - Slide drawer from right edge (380ms duration)
    - Fade in backdrop overlay simultaneously
    - Stagger cart item appearance with 40ms delay between items
    - _Requirements: 11.4, 11.5, 11.6_

  - [~] 12.4 Add price count-up animation to Customizer
    - Update Customizer to animate price value changes
    - Count from previous value to new value over 300ms
    - Trigger animation when charm added or removed
    - Use number interpolation for smooth counting
    - _Requirements: 11.7, 11.8_

- [ ] 13. Add parallax effects to Hero and About pages
  - [~] 13.1 Implement parallax on Hero background
    - Add scroll listener to Home page Hero section
    - Translate hero background content opposite to scroll direction
    - Limit maximum offset to 40 pixels
    - Use transform for GPU acceleration
    - _Requirements: 12.1_

  - [~] 13.2 Implement parallax on About page illustration
    - Add scroll listener to About page featured image/illustration
    - Apply parallax effect with maximum offset of 40 pixels
    - Translate in opposite direction of scroll
    - _Requirements: 12.2_

  - [~] 13.3 Add reduced-motion support for parallax
    - Disable all parallax effects when prefers-reduced-motion enabled
    - Ensure parallax only on Hero and About sections (not elsewhere)
    - _Requirements: 12.3, 12.4_

  - [~] 13.4 Write property test for parallax offset limit
    - **Property 8: Parallax Offset Limit**
    - **Validates: Requirements 12.1, 12.2**
    - Generate random scroll positions
    - Verify parallax translation never exceeds 40px in either direction
    - Test on both Hero and About page elements

- [~] 14. Checkpoint: Verify all motion animations smooth and performant
  - Ensure all tests pass, ask the user if questions arise.

### Cross-Cutting Concerns

- [ ] 15. Implement responsive layout breakpoints
  - [x] 15.1 Add responsive margin and spacing rules
    - Update layout container styles with breakpoint rules
    - Apply 24px horizontal margins for viewport < 768px
    - Apply 64px horizontal margins for viewport >= 768px
    - Apply 80px vertical spacing (mobile) and 120px vertical spacing (desktop) between sections
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [~] 15.2 Add responsive Customizer slot sizes
    - Set slot size to 44px for mobile viewports
    - Set slot size to 56px for desktop viewports
    - Update Slot component with responsive sizing
    - _Requirements: 14.5, 14.6_

  - [x] 15.3 Add responsive grid columns
    - Set Shop page grid to 2 columns for mobile
    - Set Shop page grid to 4 columns for desktop
    - Use CSS Grid with breakpoint media queries
    - _Requirements: 14.7, 14.8_

  - [~] 15.4 Add responsive Checkout layout
    - Stack order summary above form on mobile viewports
    - Display form (left) and order summary (right) in two columns on desktop
    - Test layout switches at 768px breakpoint
    - _Requirements: 14.9, 14.10_

  - [~] 15.5 Write property test for responsive breakpoint compliance
    - **Property 9: Responsive Breakpoint Compliance**
    - **Validates: Requirements 14.1, 14.2, 14.7, 14.8**
    - Test at various viewport widths (360px, 640px, 768px, 1024px, 1440px)
    - Verify margins, grid columns, and spacing match specifications
    - Use JSDOM or Puppeteer for viewport testing

- [ ] 16. Optimize performance and animations
  - [~] 16.1 Ensure transform-only animations
    - Audit all animation code to verify only transform and opacity animated
    - Remove animations on width, height, margin, padding, top, left
    - Use transform: translate() instead of position changes
    - _Requirements: 15.1, 15.2_

  - [~] 16.2 Add will-change optimization
    - Apply will-change: transform to elements actively animating
    - Remove will-change when animation completes
    - Create utility hooks for will-change lifecycle
    - _Requirements: 15.6, 15.7_

  - [~] 16.3 Configure lazy loading for Customizer
    - Update `src/app/router.tsx` to lazy-load Customize route
    - Use React.lazy() and Suspense for code splitting
    - Verify Customizer chunk is separate in build output
    - _Requirements: 15.3_

  - [~] 16.4 Optimize images
    - Ensure all product images served in WebP format
    - Add explicit width and height attributes to all img elements
    - Verify images load with correct aspect ratios (no layout shift)
    - _Requirements: 15.4_

  - [x] 16.5 Add global reduced-motion support
    - Add CSS media query for prefers-reduced-motion
    - Set animation durations to 0ms except fade transitions (150ms)
    - Test with browser reduced-motion setting enabled
    - _Requirements: 15.8_

- [ ] 17. Implement accessibility features
  - [~] 17.1 Add focus indicators to all interactive elements
    - Style focus states with 2px outline offset
    - Ensure 3:1 contrast ratio for focus indicators
    - Test keyboard navigation across all pages
    - _Requirements: 16.1, 16.3_

  - [~] 17.2 Add keyboard support to Customizer
    - Enable Tab navigation through slots
    - Add Arrow key navigation between slots
    - Add Enter key to select slot
    - Add Backspace key to remove charm from slot
    - _Requirements: 16.2_

  - [~] 17.3 Add ARIA labels and semantic HTML
    - Add alt text to all product images
    - Add aria-label to buttons without text content
    - Mark required form fields with aria-required
    - Associate error messages with fields via aria-describedby
    - Add landmark regions (header, main, footer)
    - _Requirements: 16.4, 16.5, 16.6, 16.7, 16.8_

  - [x] 17.4 Ensure text color contrast
    - Verify body text has 4.5:1 contrast ratio minimum
    - Verify large text has 3:1 contrast ratio minimum
    - Test with contrast checker tool
    - _Requirements: 16.9_

  - [~] 17.5 Manage focus for Cart drawer
    - Move keyboard focus to first interactive element when drawer opens
    - Return keyboard focus to trigger element when drawer closes
    - Trap focus within drawer while open
    - _Requirements: 16.10, 16.11_

- [ ] 18. Ensure data model integrity and persistence
  - [~] 18.1 Validate JSON data structures
    - Read and validate `src/data/products.json` against Product type
    - Read and validate `src/data/charms.json` against Charm type
    - Read and validate `src/data/faq.json` against FAQ type
    - Add type guards for runtime validation
    - Log specific validation errors if structure incorrect
    - Display fallback empty state if data loading fails
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8_

  - [~] 18.2 Implement localStorage persistence
    - Update cart context to save state to localStorage key "linked.v1.cart"
    - Update Customizer to save build state to localStorage key "linked.v1.build"
    - Wrap all localStorage operations in try-catch blocks
    - Handle quota exceeded and privacy mode errors gracefully
    - Restore cart state on app initialization
    - Restore build state on Customizer initialization
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6_

  - [~] 18.3 Define cart item data structures
    - Ensure custom bracelet stored as: `{ kind: 'custom', build, qty, unitPrice }`
    - Ensure regular product stored as: `{ kind: 'product', productId, qty }`
    - Update TypeScript types to match data structures
    - _Requirements: 18.8, 18.9_

  - [~] 18.4 Write property test for localStorage persistence round-trip
    - **Property 10: LocalStorage Persistence Round-Trip**
    - **Validates: Requirements 18.1, 18.2, 18.3, 18.4**
    - Generate random cart states and build states
    - Serialize to localStorage and deserialize
    - Verify all items, quantities, charm placements preserved
    - Test with various cart configurations

  - [~] 18.5 Write property test for data model type conformance
    - **Property 11: Data Model Type Conformance**
    - **Validates: Requirements 17.4, 17.5, 17.6**
    - Load objects from products.json, charms.json, faq.json
    - Verify all required properties present
    - Verify property types match TypeScript definitions
    - Test with malformed JSON inputs

- [ ] 19. Add error boundaries and error handling
  - [~] 19.1 Implement React Error Boundary
    - Create `src/components/ErrorBoundary.tsx` component
    - Catch unhandled errors in component tree
    - Display fallback UI with retry action
    - Log errors to console with stack trace
    - _Requirements: 19.1, 19.2, 19.3_

  - [~] 19.2 Wrap application with Error Boundary
    - Update `src/app/router.tsx` to wrap routes with ErrorBoundary
    - Test error boundary by throwing test error
    - Verify fallback UI displays correctly
    - _Requirements: 19.1_

  - [~] 19.3 Add error handling for missing images and data
    - Handle missing product images with placeholder or fallback
    - Display empty state with retry action when data fails to load
    - Ensure no console errors during normal operation in production
    - _Requirements: 19.4, 19.5, 19.6, 19.7_

- [ ] 20. Configure build optimization
  - [~] 20.1 Configure Vite production build
    - Verify code splitting for Customizer route in vite.config.ts
    - Enable minification for JavaScript and CSS
    - Generate source maps for debugging
    - Configure content-hash filenames for cache busting
    - _Requirements: 20.1, 20.2, 20.3, 20.4_

  - [~] 20.2 Configure static asset handling
    - Verify static assets served from public directory without processing
    - Add hash mode to React Router if deploying to GitHub Pages
    - Configure dist directory output
    - _Requirements: 20.5, 20.6, 20.7_

  - [~] 20.3 Run production build and verify output
    - Run `npm run build` and verify no errors
    - Check dist directory for code-split chunks
    - Verify main bundle and Customizer chunk are separate
    - Test production build with `npm run preview`
    - _Requirements: 20.1, 20.2_

- [~] 21. Final checkpoint: End-to-end verification
  - Ensure all tests pass, ask the user if questions arise.
  - Verify all 20 requirements implemented and functional
  - Run full build and test production bundle
  - Test all pages and interactions in browser

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements from the requirements document for traceability
- Checkpoints ensure incremental validation at logical breakpoints
- Property tests validate universal correctness properties from the design document
- Unit tests and integration tests validate specific examples and end-to-end flows
- All motion implementations use Framer Motion primitives for consistency
- Design tokens are enforced via CSS custom properties in `src/styles/tokens.css`
- TypeScript strict mode ensures type safety across all components
- Responsive design uses 768px as primary breakpoint (mobile < 768px, desktop >= 768px)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3"] },
    { "id": 1, "tasks": ["1.4", "1.5", "1.6", "3.1"] },
    { "id": 2, "tasks": ["3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8"] },
    { "id": 3, "tasks": ["3.9", "3.10", "3.11", "5.1"] },
    { "id": 4, "tasks": ["5.2", "5.3", "5.4", "6.1"] },
    { "id": 5, "tasks": ["6.2", "6.3", "6.4", "6.5"] },
    { "id": 6, "tasks": ["6.6", "7.1", "7.2", "7.3"] },
    { "id": 7, "tasks": ["7.4", "7.5", "7.6", "7.7"] },
    { "id": 8, "tasks": ["9.1", "9.2", "9.3", "10.1"] },
    { "id": 9, "tasks": ["10.2", "10.3", "10.4", "11.1"] },
    { "id": 10, "tasks": ["11.2", "11.3", "11.4", "11.5"] },
    { "id": 11, "tasks": ["12.1", "12.2", "12.3", "12.4"] },
    { "id": 12, "tasks": ["13.1", "13.2", "13.3", "13.4"] },
    { "id": 13, "tasks": ["15.1", "15.2", "15.3", "15.4", "15.5"] },
    { "id": 14, "tasks": ["16.1", "16.2", "16.3", "16.4", "16.5"] },
    { "id": 15, "tasks": ["17.1", "17.2", "17.3", "17.4", "17.5"] },
    { "id": 16, "tasks": ["18.1", "18.2", "18.3", "18.4", "18.5"] },
    { "id": 17, "tasks": ["19.1", "19.2", "19.3"] },
    { "id": 18, "tasks": ["20.1", "20.2", "20.3"] }
  ]
}
```
