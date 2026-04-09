# Design System Strategy: Modern Palace

## 1. Overview & Creative North Star: "The Digital Curator"
The Creative North Star for this design system is **"The Digital Curator."** We are not building a website; we are curating a digital gala. The "Modern Palace" aesthetic rejects the rigid, boxy constraints of standard web templates in favor of an editorial, high-fashion layout that breathes with "Crisp Ivory" space.

To achieve this, we employ **Intentional Asymmetry**. Elements should never feel "trapped" in a grid. We use overlapping imagery, off-center typography, and generous vertical rhythm to create a sense of movement. The goal is to blend the weight of traditional heritage with the ethereal lightness of modern luxury.

## 2. Colors: The Palette of Sovereignty
Our palette is rooted in the warmth of Liquid Gold and the depth of Royal Indigo, set against a pristine, expansive background.

### The Color Logic
*   **Primary (Liquid Gold - `#745b00`):** Used for key brand moments and primary CTAs. It represents the "gilt" of the palace.
*   **Secondary (Royal Indigo - `#505d86`):** Our anchor. Use this for moments of high-toned sophistication or interactive states to provide a cool contrast to the gold.
*   **Tertiary (Amethyst - `#6042d6`):** A modern "royal" pivot. Use sparingly for micro-interactions or special category highlights.
*   **Surface (Crisp Ivory - `#faf9f5`):** The canvas. It is warmer than pure white, providing a gallery-like feel.

### Critical Visual Rules
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. To separate content, utilize background shifts (e.g., transitioning from `surface` to `surface-container-low`) or generous white space.
*   **The Glass & Gradient Rule:** To evoke "Liquid Gold," use subtle linear gradients for primary buttons, transitioning from `primary` (#745b00) to `primary_container` (#d5af37). Floating cards should utilize **Glassmorphism**: a background of `surface_container_lowest` at 80% opacity with a `20px` backdrop-blur.
*   **Surface Hierarchy:** Layering is achieved through tonal nesting. A `surface_container_low` section should house `surface_container_lowest` cards to create a "lift" that feels organic, not engineered.

## 3. Typography: Regal Contrast
The typography is a dialogue between the old world and the new.

*   **Display & Headlines (Newsreader):** A high-contrast, regal serif. This font carries the heritage. Use `display-lg` for hero statements with tight letter-spacing (-0.02em) to evoke high-fashion mastheads.
*   **Body & Titles (Manrope):** A clean, geometric sans-serif. This provides the "Modern" in Modern Palace. It ensures that despite the ornamental headlines, the functional information remains legible and contemporary.
*   **Hierarchy as Identity:** Use `label-md` in all-caps with increased letter-spacing (+0.1em) for category tags. This mimics the labeling found in luxury boutiques.

## 4. Elevation & Depth: Tonal Layering
In a "Modern Palace," we do not use heavy shadows that muddy the Ivory surfaces. Depth must feel like light passing through crystal.

*   **The Layering Principle:** Avoid shadows for static elements. Instead, use the `surface-container` tiers. 
    *   *Base:* `surface`
    *   *Section:* `surface-container-low`
    *   *Card:* `surface-container-lowest`
*   **Ambient Shadows:** For floating elements (Modals, Hovered Cards), use a "Sunlight Shadow": `0px 20px 40px rgba(77, 70, 53, 0.06)`. The tint is derived from the `on_surface_variant` to ensure it feels like a natural shadow on an ivory floor.
*   **The Ghost Border:** If a boundary is required for accessibility (e.g., input fields), use `outline_variant` at **20% opacity**. It should be felt, not seen.

## 5. Components: Editorial Elements

### Buttons: The Royal Seal
*   **Primary:** Gradient of `primary` to `primary_container`. Text in `on_primary`. Shape: `md` (0.375rem) for a tailored look.
*   **Secondary:** Ghost style. No fill, `outline` at 20% opacity, text in `secondary`.
*   **Interaction:** On hover, buttons should subtly scale (1.02x) rather than just changing color, mimicking a physical press.

### Cards: The Gallery Frame
*   Forbid dividers. Use `body-md` for descriptions and `label-sm` for metadata.
*   Images within cards should use the `lg` (0.5rem) corner radius, while the card container remains `none` (0px) or `sm` (0.125rem) to maintain an architectural, sharp-edged feel.

### Interactive "Inquiry" Inputs
*   Text inputs should be "Minimalist Editorial": A single bottom border using `outline_variant` at 40%. When focused, the border transforms into a 2px `primary` (Gold) line that animates from the center.

### Signature Component: The "Curated Masonry"
Instead of a standard grid for event portfolios, use a staggered masonry layout where images have varying aspect ratios (4:5, 1:1, 2:3). This breaks the "template" feel and elevates the imagery to art-gallery status.

## 6. Do's and Don'ts

### Do:
*   **Do** use "Negative Space" as a functional element. If a section feels crowded, double the padding.
*   **Do** use `secondary` (Royal Indigo) for "Actionable Luxury"—links, active states, and icons.
*   **Do** apply `newsreader` in italic for "soft" emphasis within serif blocks to add a human, calligraphic touch.

### Don't:
*   **Don't** use pure black (#000000). Always use `on_surface` (#1b1c1a) to keep the contrast sophisticated.
*   **Don't** use heavy drop shadows or "Material" style floating action buttons. Luxury is grounded.
*   **Don't** use standard "Success Green" or "Warning Orange" unless absolutely necessary for system errors; try to style these within the `error` tokens provided to maintain the palette's integrity.