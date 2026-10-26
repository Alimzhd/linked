# Requirements Document

## Introduction

This document specifies the requirements for refining the LINKED! e-commerce application to achieve Polished tier compliance with the Master Specification. The refinement addresses code quality issues, visual inconsistencies, incomplete features, and missing motion specifications across the existing React TypeScript application.

The LINKED! application is an Italian charm bracelet e-commerce site featuring an 18-slot interactive customizer, product catalog, cart system, and brand storytelling. The current implementation requires corrections to remove AI-generated patterns, align visual design with the established design system, rebuild the hero animation to match the precise 5-scene storyboard, and complete missing page sections.

## Glossary

- **Application**: The LINKED! React TypeScript web application running in Vite
- **Design_System**: The established color palette (ink, paper, steel, blush), typography (Plus Jakarta Sans, Instrument Serif, Geist Mono), and layout grid (12-column, 24px/64px margins)
- **Hero_Reel**: The 15-second looping SVG timeline animation consisting of 5 distinct scenes
- **Customizer**: The 18-slot bracelet builder interface allowing click-to-add and drag-and-drop charm placement
- **Master_Spec**: The authoritative design and technical specification document extracted from master_spec_extracted.md
- **AI_Slop**: Generic patterns introduced by AI code generation including three-card layouts, filler copy, generic gradients, and template aesthetics
- **Polished_Tier**: The second quality level requiring MVP features plus refined motion, complete content, and Master_Spec compliance
- **Home_Page**: The landing page at route "/" containing Hero_Reel, brand value section, featured carousel, and Customizer teaser
- **Shop_Page**: The product catalog page at route "/shop" with filter controls and product grid
- **About_Page**: The brand storytelling page at route "/about" containing brand narrative, comparison section, assembly guide, packaging options, and FAQ
- **Checkout_Page**: The order finalization page at route "/checkout" with form inputs and WhatsApp submission
- **Cart_Component**: The slide-over drawer component displaying cart items, packaging options, and checkout navigation
- **Three_Card_Layout**: The anti-pattern layout featuring three identical cards with icon-title-text structure
- **Page_Transition**: The animated transition between routes (450ms fade + 8px drop + clip-path reveal)
- **Grid_Stagger**: The sequential appearance animation for product cards with 60ms delay between items
- **Snap_Motion**: The magnetic spring animation for charm attachment (stiffness 500, damping 30)

## Requirements

### Requirement 1: Code Quality and AI Slop Removal

**User Story:** As a developer reviewing the codebase, I want the implementation to be free of AI-generated patterns and generic code, so that the application reflects intentional design decisions aligned with the Master_Spec.

#### Acceptance Criteria

1.1. WHEN Home_Page is rendered, THE Application SHALL NOT display a three-card layout with icon-title-text structure

1.2. WHEN any page displays brand values or benefits, THE Application SHALL use prose paragraphs or alternative layouts that avoid identical card repetition

1.3. THE Application SHALL NOT include filler words "revolutionary", "elevate", "unleash", or "seamless" in any user-facing copy

1.4. THE Application SHALL NOT use purple gradients, blue gradients, blob shapes, or random particle effects in any visual elements

1.5. WHEN displaying icons in layouts, THE Application SHALL NOT use emoji characters as decorative elements

1.6. WHEN rendering glassmorphism effects, THE Application SHALL apply blur effects exclusively to the header component

1.7. THE Application SHALL use active voice in all copy with specific subjects performing specific actions

### Requirement 2: Design System Compliance

**User Story:** As a designer reviewing the implementation, I want all visual elements to precisely match the Design_System tokens, so that the brand identity remains consistent throughout the application.

#### Acceptance Criteria

2.1. THE Application SHALL use color value #121212 for ink exclusively for text, primary buttons, and footer backgrounds

2.2. THE Application SHALL use color value #F9F9FB for paper exclusively for page backgrounds

2.3. THE Application SHALL use color value #E2E8F0 for steel exclusively for borders, card fills, and metal gradients

2.4. THE Application SHALL NOT use steel color value #E2E8F0 for text content

2.5. THE Application SHALL use color value #F4E8E1 for blush exclusively for special section backgrounds and card hover states

2.6. WHEN rendering metal gradients on links and charms, THE Application SHALL apply gradient "linear-gradient(135deg, #FFFFFF, #CBD5E1, #F1F5F9, #94A3B8)"

2.7. THE Application SHALL use Plus Jakarta Sans with weights 400, 500, or 700 for body text and headings

2.8. WHEN displaying accent words in headings, THE Application SHALL use Instrument Serif italic for exactly one word per heading

2.9. THE Application SHALL use Geist Mono or JetBrains Mono exclusively for micro labels, scene numbers, and price displays

2.10. THE Application SHALL apply border-radius value of 12px uniformly to all cards, buttons, and containers

2.11. THE Application SHALL use border-width of 1px with steel color for all structural borders

2.12. THE Application SHALL implement 12-column grid layout with 24px margins on mobile viewports and 64px margins on desktop viewports

2.13. THE Application SHALL maintain 120px vertical spacing between major sections on desktop viewports

### Requirement 3: Hero Reel Reconstruction

**User Story:** As a brand stakeholder, I want the Hero_Reel to precisely implement the 5-scene storyboard from the Master_Spec, so that the animation communicates the brand story with exact timing and visual progression.

#### Acceptance Criteria

3.1. THE Hero_Reel SHALL execute exactly 5 sequential scenes with total duration of 15000 milliseconds

3.2. THE Hero_Reel SHALL display Scene 01 "Link" from millisecond 0 to millisecond 3000 showing one steel link drawing from thin line to solid metal

3.3. WHEN Scene 01 is active, THE Hero_Reel SHALL display text "01 · LINK" in mono label and timecode "00:00 - 00:03"

3.4. THE Hero_Reel SHALL display Scene 02 "Charm" from millisecond 3000 to millisecond 6000 showing three charms (heart, star, letter) dropping and snapping to the link

3.5. WHEN Scene 02 is active, THE Hero_Reel SHALL stagger charm animations by 250 milliseconds with spring physics (stiffness 500, damping 30)

3.6. WHEN Scene 02 is active, THE Hero_Reel SHALL display text "Tambah cerita." as the scene message

3.7. THE Hero_Reel SHALL display Scene 03 "Rakit" from millisecond 6000 to millisecond 10000 showing 18 links assembling into curved bracelet with price counter

3.8. WHEN Scene 03 is active, THE Hero_Reel SHALL morph straight line to bracelet curve and animate price counter from 0 to final value over 300 milliseconds

3.9. WHEN Scene 03 is active, THE Hero_Reel SHALL display text "Rakit sendiri. Harganya langsung terlihat."

3.10. THE Hero_Reel SHALL display Scene 04 "Mix" from millisecond 10000 to millisecond 13000 with background transitioning to blush color

3.11. WHEN Scene 04 is active, THE Hero_Reel SHALL swap position of two charms with cross-fade duration of 400 milliseconds

3.12. WHEN Scene 04 is active, THE Hero_Reel SHALL rotate bracelet by 12 degrees

3.13. WHEN Scene 04 is active, THE Hero_Reel SHALL display text "Ganti kapan saja."

3.14. THE Hero_Reel SHALL display Scene 05 "Merek" from millisecond 13000 to millisecond 15000 with wordmark LINKED! and tagline reveal

3.15. WHEN Scene 05 is active, THE Hero_Reel SHALL reveal wordmark and headline "YOUR WRIST, YOUR STORY." with mask animation duration of 600 milliseconds

3.16. WHEN Scene 05 is active, THE Hero_Reel SHALL display two interactive buttons "Shop Now" and "Start Customizing"

3.17. WHEN millisecond 15000 is reached, THE Hero_Reel SHALL reset to Scene 01 and loop continuously

3.18. WHEN Hero_Reel is scrolled out of viewport, THE Hero_Reel SHALL pause animation

3.19. WHEN browser tab becomes inactive, THE Hero_Reel SHALL pause animation

3.20. WHEN user has prefers-reduced-motion enabled, THE Hero_Reel SHALL display static poster showing Scene 05 frame instead of animation

3.21. THE Hero_Reel SHALL display corner bracket decorations at all four corners with 2px borders in neutral-400 color

3.22. THE Hero_Reel SHALL display scene labels "01 · LINK", "02 · CHARM", "03 · RAKIT", "04 · MIX", "05 · MEREK" in top-left metadata

3.23. THE Hero_Reel SHALL display timecode ranges in top-right metadata in mono font

3.24. THE Hero_Reel SHALL provide dot navigation with 5 dots reflecting current scene state

3.25. THE Hero_Reel SHALL provide play/pause toggle button in bottom-right corner

### Requirement 4: Home Page Pillar Replacement

**User Story:** As a content strategist, I want the Home_Page brand values section to communicate concrete product information without three-card layouts, so that the content aligns with anti-slop guidelines.

#### Acceptance Criteria

4.1. THE Home_Page SHALL replace three-card icon-title-text layout with prose paragraphs or alternative visual structure

4.2. WHEN displaying brand values, THE Home_Page SHALL communicate material (Stainless Steel 316L), mechanism (internal spring system), and price transparency through narrative text or comparison layout

4.3. THE Home_Page SHALL include specific technical details: "9mm modular links", "surgical grade 316L", "internal spring mechanism"

4.4. THE Home_Page SHALL avoid vague benefit claims and use measurable product characteristics

4.5. WHEN displaying product benefits, THE Home_Page SHALL reference actual features from Master_Spec rather than generic marketing language

### Requirement 5: Shop Page Filter Implementation

**User Story:** As a shopper browsing products, I want functional filter controls on Shop_Page, so that I can narrow the product list by category without page reload.

#### Acceptance Criteria

5.1. THE Shop_Page SHALL display filter chips with labels "Semua", "Basic Links", "Individual Charms", "Cute", "Funny"

5.2. WHEN user clicks a filter chip, THE Shop_Page SHALL update displayed product grid to show only products matching selected category

5.3. WHEN "Semua" filter is active, THE Shop_Page SHALL display all products from products.json

5.4. WHEN "Basic Links" filter is active, THE Shop_Page SHALL display only products with category property value "basic"

5.5. WHEN "Individual Charms" filter is active, THE Shop_Page SHALL display only products with category property value "charm"

5.6. WHEN "Cute" filter is active, THE Shop_Page SHALL display only products with tags array containing "cute"

5.7. WHEN "Funny" filter is active, THE Shop_Page SHALL display only products with tags array containing "funny"

5.8. WHEN filter selection changes, THE Shop_Page SHALL NOT reload or navigate to different URL

5.9. THE Shop_Page SHALL visually indicate active filter with distinct styling (filled background, bold text, or border emphasis)

5.10. THE Shop_Page SHALL display product count for current filter selection

### Requirement 6: About Page Content Completion

**User Story:** As a visitor learning about the brand, I want the About_Page to contain complete brand narrative, assembly instructions, and FAQ content from Master_Spec, so that I understand the product value and usage.

#### Acceptance Criteria

6.1. THE About_Page SHALL display brand statement "Small charms, big personality." as primary heading

6.2. THE About_Page SHALL include narrative paragraph explaining Italian modular bracelet heritage and Florence design origins

6.3. THE About_Page SHALL display comparison section with two contrast cards: "Not conventional charm bracelet" and "Surgical Grade material"

6.4. THE About_Page SHALL provide 3-step assembly guide with steps "Stretch two modules", "Release sliding latch", "Insert new charm"

6.5. WHEN displaying assembly steps, THE About_Page SHALL show visual diagram or charm icon for each step

6.6. THE About_Page SHALL include packaging section describing "Standard Canvas Pouch" (free) and "Signature Gift Box Set" (+Rp 25,000)

6.7. THE About_Page SHALL render FAQ accordion with minimum questions covering sizing, material, care instructions, shipping, and installation

6.8. WHEN user clicks FAQ question, THE About_Page SHALL expand answer section with smooth animation

6.9. THE About_Page SHALL close previously open FAQ answer when user opens new question (single-expand accordion behavior)

6.10. THE About_Page SHALL use concrete product details from Master_Spec for all FAQ answers rather than generic placeholder text

### Requirement 7: Checkout Page Implementation

**User Story:** As a customer ready to purchase, I want a complete Checkout_Page with form validation and WhatsApp integration, so that I can finalize my order and send it to the seller.

#### Acceptance Criteria

7.1. THE Checkout_Page SHALL display form fields: full name, WhatsApp number, delivery address, and optional order notes

7.2. THE Checkout_Page SHALL mark name field, WhatsApp number field, and address field as required with visual indicators

7.3. WHEN Checkout_Page is rendered, THE Checkout_Page SHALL display order summary panel showing all cart items with quantities and prices

7.4. THE Checkout_Page SHALL calculate and display subtotal, packaging cost (if gift box selected), and grand total

7.5. WHEN user has selected gift box packaging in Cart_Component, THE Checkout_Page SHALL add Rp 25,000 to subtotal

7.6. WHEN all required fields contain valid input, THE Checkout_Page SHALL enable "Kirim pesanan via WhatsApp" button

7.7. WHEN any required field is empty, THE Checkout_Page SHALL keep submit button disabled

7.8. WHEN user clicks enabled submit button, THE Checkout_Page SHALL construct WhatsApp message containing customer name, delivery address, itemized order list with custom bracelet slot descriptions, packaging choice, optional gift note, and grand total

7.9. WHEN WhatsApp message is constructed, THE Checkout_Page SHALL open wa.me URL with pre-filled message text in new tab

7.10. THE Checkout_Page SHALL format custom bracelet items in WhatsApp message as "Gelang Custom: [size] size, [count] charms: [charm names]"

7.11. THE Checkout_Page SHALL display order summary panel on right side of form on desktop viewports

7.12. THE Checkout_Page SHALL stack order summary above form on mobile viewports

### Requirement 8: Page Transition Motion

**User Story:** As a user navigating between pages, I want smooth animated transitions that maintain visual continuity, so that the application feels polished and intentional.

#### Acceptance Criteria

8.1. WHEN user navigates to different route, THE Application SHALL animate outgoing page with opacity fade to 0 and 8px downward translation over 450 milliseconds

8.2. WHEN outgoing page animation completes, THE Application SHALL animate incoming page with clip-path reveal from bottom with duration 450 milliseconds

8.3. WHEN page transition occurs, THE Application SHALL keep header component fixed in position without animation

8.4. THE Application SHALL use cubic bezier easing [0.16, 1, 0.3, 1] for page transition animations

8.5. WHEN user has prefers-reduced-motion enabled, THE Application SHALL reduce all transition durations to 0 milliseconds except fade transitions of 150 milliseconds

### Requirement 9: Product Grid Stagger Animation

**User Story:** As a user viewing the shop or featured products, I want product cards to appear with staggered timing, so that the grid feels dynamic and draws attention to individual items.

#### Acceptance Criteria

9.1. WHEN Shop_Page product grid is rendered for first time in session, THE Application SHALL animate product cards with sequential appearance

9.2. THE Application SHALL delay each product card appearance by 60 milliseconds relative to previous card

9.3. THE Application SHALL animate product card appearance from opacity 0 to opacity 1 with upward translation of 12px

9.4. WHEN product grid has already been rendered once in session, THE Application SHALL NOT repeat stagger animation on subsequent visits

9.5. WHEN user has prefers-reduced-motion enabled, THE Application SHALL skip grid stagger animation and display all cards immediately

### Requirement 10: Customizer Snap Motion Refinement

**User Story:** As a user building a custom bracelet, I want charm placement to feel magnetic and satisfying with precise spring physics, so that the interaction matches the physical jewelry experience.

#### Acceptance Criteria

10.1. WHEN user drags charm within 48 pixels of slot center, THE Customizer SHALL attract charm to exact slot center with spring animation

10.2. THE Customizer SHALL apply spring animation with stiffness value of 500 and damping value of 30

10.3. THE Customizer SHALL allow spring animation to overshoot target position by approximately 4% before settling

10.4. WHEN charm snap animation completes, THE Customizer SHALL trigger haptic feedback vibration of 10 milliseconds duration if browser supports Vibration API

10.5. WHEN user drags charm over empty slot, THE Customizer SHALL highlight slot border with pulsing animation

10.6. THE Customizer SHALL animate slot highlight pulse with duration 1600 milliseconds repeating continuously while charm hovers

10.7. WHEN user releases charm outside 48 pixel snap radius, THE Customizer SHALL return charm to origin position with ease-out animation of 300 milliseconds duration

10.8. WHEN user hovers slot with mouse, THE Customizer SHALL display remove button with × icon

10.9. WHEN slot receives focus via keyboard navigation, THE Customizer SHALL display visible focus ring with 2px offset

### Requirement 11: Micro-interaction Specifications

**User Story:** As a user interacting with buttons and cards, I want consistent hover and interaction feedback, so that the interface feels responsive and high-quality.

#### Acceptance Criteria

11.1. WHEN user hovers primary button, THE Application SHALL animate ink-colored fill sliding up from bottom with duration 250 milliseconds

11.2. WHEN user hovers product card, THE Application SHALL scale card image to 1.04 with duration 500 milliseconds

11.3. WHEN user hovers product card, THE Application SHALL translate "Quick add" button upward by 8px with duration 200 milliseconds

11.4. WHEN Cart_Component opens, THE Application SHALL slide drawer from right edge with duration 380 milliseconds

11.5. WHEN Cart_Component opens, THE Application SHALL fade in backdrop overlay simultaneously with drawer slide

11.6. WHEN Cart_Component displays cart items, THE Application SHALL stagger item appearance with 40 millisecond delay between items

11.7. WHEN Customizer updates total price, THE Application SHALL animate price value counting from previous value to new value over 300 milliseconds

11.8. WHEN user adds or removes charm in Customizer, THE Application SHALL trigger price count animation

### Requirement 12: Parallax Effects

**User Story:** As a user scrolling through content, I want subtle parallax motion on hero and about sections, so that the page feels dimensional without being distracting.

#### Acceptance Criteria

12.1. WHEN user scrolls Home_Page with Hero_Reel visible, THE Application SHALL translate hero background content in opposite direction of scroll with maximum offset of 40 pixels

12.2. WHEN user scrolls About_Page, THE Application SHALL apply parallax effect to featured image or illustration with maximum offset of 40 pixels

12.3. THE Application SHALL NOT apply parallax effects to any elements outside Hero_Reel and About_Page

12.4. WHEN user has prefers-reduced-motion enabled, THE Application SHALL disable all parallax effects

### Requirement 13: Typography Hierarchy Enforcement

**User Story:** As a designer reviewing typography, I want strict adherence to font family rules and accent word limits, so that the typographic system remains consistent and distinctive.

#### Acceptance Criteria

13.1. WHEN rendering page headings (h1, h2, h3), THE Application SHALL use Plus Jakarta Sans with font-weight 700 for base heading text

13.2. WHEN including accent word in heading, THE Application SHALL wrap exactly one word per heading in span element with class "accent-serif"

13.3. THE Application SHALL style accent-serif class with font-family Instrument Serif, font-style italic, and font-weight 400

13.4. WHEN rendering micro labels (scene numbers, categories, metadata), THE Application SHALL use Geist Mono with font-size 10px to 11px and letter-spacing 0.05em

13.5. THE Application SHALL use font-weight 400 for body text, font-weight 500 for emphasized text, and font-weight 700 for headings and buttons

13.6. THE Application SHALL NOT use font weights other than 400, 500, or 700

### Requirement 14: Responsive Layout Compliance

**User Story:** As a user on mobile or tablet device, I want the application to adapt layout and spacing according to Master_Spec breakpoints, so that the experience is optimized for my screen size.

#### Acceptance Criteria

14.1. WHEN viewport width is below 768 pixels, THE Application SHALL apply 24px horizontal margins to layout-container elements

14.2. WHEN viewport width is 768 pixels or above, THE Application SHALL apply 64px horizontal margins to layout-container elements

14.3. WHEN viewport width is below 768 pixels, THE Application SHALL reduce vertical section spacing to 80px between major sections

14.4. WHEN viewport width is 768 pixels or above, THE Application SHALL apply 120px vertical spacing between major sections

14.5. WHEN Customizer is rendered on mobile viewport, THE Application SHALL display slot size of 44 pixels

14.6. WHEN Customizer is rendered on desktop viewport, THE Application SHALL display slot size of 56 pixels

14.7. WHEN Shop_Page grid is rendered on mobile viewport, THE Application SHALL display 2 columns

14.8. WHEN Shop_Page grid is rendered on desktop viewport, THE Application SHALL display 4 columns

14.9. WHEN Checkout_Page is rendered on mobile viewport, THE Application SHALL stack order summary above form

14.10. WHEN Checkout_Page is rendered on desktop viewport, THE Application SHALL display form on left and order summary on right in two-column layout

### Requirement 15: Performance and Optimization

**User Story:** As a user on mid-range mobile device, I want smooth 60fps animations and fast page loads, so that the application performs well regardless of my device capabilities.

#### Acceptance Criteria

15.1. THE Application SHALL animate only CSS transform and opacity properties

15.2. THE Application SHALL NOT animate properties that trigger layout reflow (width, height, margin, padding, top, left)

15.3. WHEN Customizer route is accessed, THE Application SHALL lazy-load Customizer component code

15.4. THE Application SHALL serve images in WebP format with explicit width and height attributes

15.5. WHEN animations run, THE Application SHALL target 60 frames per second performance on mid-range mobile devices

15.6. THE Application SHALL use CSS will-change property exclusively on elements actively animating

15.7. THE Application SHALL remove will-change property when animation completes

15.8. WHEN user has prefers-reduced-motion enabled, THE Application SHALL set animation duration to 0 milliseconds for all animations except fade transitions of 150 milliseconds

### Requirement 16: Accessibility Standards

**User Story:** As a user relying on keyboard navigation or screen reader, I want the application to be fully operable and understandable, so that I can complete shopping tasks without barriers.

#### Acceptance Criteria

16.1. THE Application SHALL provide visible focus indicators with 2px outline offset on all interactive elements

16.2. THE Application SHALL enable Customizer operation exclusively via keyboard using Tab, Arrow keys, Enter, and Backspace

16.3. WHEN interactive element receives keyboard focus, THE Application SHALL display focus indicator with color contrast ratio of at least 3:1 against background

16.4. THE Application SHALL provide alt text for all product images describing the charm or bracelet shown

16.5. THE Application SHALL label all buttons with text content or aria-label attributes

16.6. THE Application SHALL mark form fields as required using aria-required attribute

16.7. WHEN form validation fails, THE Application SHALL display error messages associated with fields via aria-describedby

16.8. THE Application SHALL provide landmark regions (header, main, footer) for screen reader navigation

16.9. THE Application SHALL ensure text color contrast ratio of at least 4.5:1 for body text and 3:1 for large text

16.10. WHEN Cart_Component opens, THE Application SHALL move keyboard focus to first interactive element in drawer

16.11. WHEN Cart_Component closes, THE Application SHALL return keyboard focus to element that triggered opening

### Requirement 17: Data Model Integrity

**User Story:** As a developer maintaining product data, I want consistent data structures in JSON files matching TypeScript types, so that the application renders products correctly without runtime errors.

#### Acceptance Criteria

17.1. THE Application SHALL load product data from src/data/products.json file

17.2. THE Application SHALL load charm data from src/data/charms.json file

17.3. THE Application SHALL load FAQ data from src/data/faq.json file

17.4. THE Application SHALL validate that each product object contains properties: id (string), name (string), category (string), price (number), inStock (boolean), image (string)

17.5. THE Application SHALL validate that each charm object contains properties: id (string), name (string), category (string), addPrice (number), inStock (boolean), symbol (string)

17.6. THE Application SHALL validate that each FAQ object contains properties: question (string), answer (string)

17.7. WHEN loading data fails or JSON is malformed, THE Application SHALL log error to console and display fallback empty state

17.8. THE Application SHALL match product and charm objects to TypeScript type definitions in src/types/index.ts

### Requirement 18: Cart and Local Storage Persistence

**User Story:** As a user building a custom bracelet, I want my cart and customizer state to persist across page reloads, so that I don't lose my work if I accidentally refresh or close the tab.

#### Acceptance Criteria

18.1. WHEN user adds item to cart, THE Application SHALL serialize cart state and save to localStorage key "linked.v1.cart"

18.2. WHEN user modifies charm placement in Customizer, THE Application SHALL serialize build state and save to localStorage key "linked.v1.build"

18.3. WHEN Application initializes, THE Application SHALL attempt to restore cart state from localStorage key "linked.v1.cart"

18.4. WHEN Application initializes Customizer, THE Application SHALL attempt to restore build state from localStorage key "linked.v1.build"

18.5. WHEN localStorage access fails due to privacy mode or quota exceeded, THE Application SHALL catch exception and continue with empty state

18.6. THE Application SHALL wrap all localStorage read and write operations in try-catch blocks

18.7. WHEN cart state structure changes in future version, THE Application SHALL increment version number in localStorage key to avoid data corruption

18.8. THE Application SHALL store custom bracelet in cart as object with properties: kind "custom", build object, qty number, unitPrice number

18.9. THE Application SHALL store regular product in cart as object with properties: kind "product", productId string, qty number

### Requirement 19: Error Boundary and Console Hygiene

**User Story:** As a developer debugging the application, I want zero console errors in production build and graceful error handling, so that issues are caught without breaking the user experience.

#### Acceptance Criteria

19.1. THE Application SHALL implement React Error Boundary component wrapping main application routes

19.2. WHEN unhandled error occurs in component tree, THE Application SHALL catch error in Error Boundary and display fallback UI

19.3. THE Application SHALL log caught errors to console with component stack trace

19.4. THE Application SHALL NOT log errors or warnings to console during normal operation in production build

19.5. THE Application SHALL handle missing image files by displaying placeholder or fallback image

19.6. WHEN product data fails to load, THE Application SHALL display empty state message with retry action

19.7. THE Application SHALL validate JSON data structure on load and log specific validation errors if structure is incorrect

### Requirement 20: Build and Deployment Optimization

**User Story:** As a developer deploying the application, I want optimized production build with code splitting and asset optimization, so that initial load time is minimized for users.

#### Acceptance Criteria

20.1. WHEN running production build, THE Application SHALL code-split Customizer route into separate JavaScript chunk

20.2. WHEN running production build, THE Application SHALL minify JavaScript and CSS output

20.3. WHEN running production build, THE Application SHALL generate source maps for debugging

20.4. THE Application SHALL configure Vite to output assets with content-hash filenames for cache busting

20.5. THE Application SHALL serve static assets from public directory without processing

20.6. THE Application SHALL configure React Router to use hash mode if deploying to GitHub Pages or similar static host

20.7. THE Application SHALL provide build output in dist directory ready for upload to static hosting

20.8. THE Application SHALL include meta tags for Open Graph and social media sharing with brand name, description, and preview image
