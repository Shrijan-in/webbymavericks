# Design System Specification: High-End Editorial

## 1. Overview & Creative North Star
The **Creative North Star** for this design system is **"WEBBY MAVERICKS."** 

This system is designed to reject the "template" aesthetic that plagues modern web agencies. Instead of rigid, symmetrical grids, we utilize intentional asymmetry, overlapping elements, and extreme typographic scale to create a cinematic, editorial experience. The goal is to move beyond static layouts into a space of "premium craftsmanship," where every element feels curated rather than generated. 

We achieve depth not through heavy shadows, but through the sophisticated interplay of dark tones, glassmorphism, and "negative space as a luxury."

---

## 2. Colors & Tonal Hierarchy

The palette is rooted in deep blacks and neutral slates, punctuated by the high-contrast `primary` cyan-white and the warmth of `tertiary` gold.

### The "No-Line" Rule
Explicitly prohibit 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the structural definition required.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of frosted glass or fine paper.
- **Base Layer:** `surface` (#131313) - The canvas.
- **Sectioning:** `surface-container-low` (#1c1b1b) - For secondary information zones.
- **Elevation:** `surface-container-high` (#2a2a2a) - For interactive cards and modals.
- **Glassmorphism:** Use `surface-variant` with a `backdrop-filter: blur(20px)` and an opacity of 40-60%. This allows background imagery or motion to bleed through, creating a sense of environmental depth.

### Signature Textures
Avoid flat primary blocks. For main CTAs or featured sections, utilize a subtle gradient:
- **Primary Gradient:** Transitioning from `primary` (#c3f5ff) to `primary-container` (#00e5ff) at a 135-degree angle. This provides a "glow" that flat colors lack.

---

## 3. Typography

The typographic strategy relies on a high-contrast pairing: a high-waisted, sophisticated serif for storytelling and a precision sans-serif for functional utility.

| Role | Font Family | Size | Character |
| :--- | :--- | :--- | :--- |
| **Display (L/M/S)** | Newsreader | 3.5rem / 2.75rem / 2.25rem | Cinematic, elegant, used for hero headers and punchy statements. |
| **Headline (L/M/S)** | Newsreader | 2.0rem / 1.75rem / 1.5rem | Used for section titles. Pair with `primary` color for emphasis. |
| **Title (L/M/S)** | Inter | 1.375rem / 1.125rem / 1.0rem | Bold sans-serif for card titles and subtitles. |
| **Body (L/M/S)** | Inter | 1.0rem / 0.875rem / 0.75rem | High legibility, generous line-height (1.6) for reading comfort. |
| **Label (M/S)** | Inter | 0.75rem / 0.6875rem | All-caps, wide letter-spacing (0.05em) for a technical/premium feel. |

---

## 4. Elevation & Depth

We eschew traditional "drop shadows" in favor of **Tonal Layering**.

- **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural lift.
- **Ambient Shadows:** If a floating effect is required (e.g., a modal), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);`. The shadow color must be a tinted version of the background, never pure black on a grey surface.
- **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline-variant` token at **15% opacity**. 100% opaque borders are forbidden as they "flatten" the cinematic depth.
- **Glass Interaction:** Interactive cards should use `surface-container-highest` with a `backdrop-blur`. Upon hover, increase the blur and the brightness slightly to simulate light hitting the glass.

---

## 5. Components

### Buttons
- **Primary:** `primary` background with `on_primary` text. Use `full` roundedness. Hover state: Scale 1.02 with a `primary-fixed-dim` outer glow.
- **Secondary:** Transparent background with a `Ghost Border` (`outline-variant` at 20%). 
- **Tertiary/Ghost:** Text only, using `primary` color. Animate an underline from center-out on hover.

### Inputs & Forms
- **Fields:** Use `surface-container-high` for the background. No borders.
- **Focus State:** A 1px subtle glow of `primary` and a transition of the label to `primary` color.
- **Submit:** Large, wide buttons that span the form container to emphasize the "Connect" action.

### Cards & Lists
- **The Spacing Rule:** Forbid the use of divider lines in lists. Use the spacing scale (e.g., 2rem vertical gaps) or a subtle shift from `surface-container-low` to `surface-container-lowest` to distinguish items.
- **Image Containers:** Use `xl` (0.75rem) roundedness. Place a subtle `secondary` overlay on images to maintain text contrast.

### Featured Components: "The Cinematic Reel"
- **Horizontal Scroll Portfolio:** Instead of a vertical list, use a horizontal "reel" that snaps to the center, utilizing `surface-container-highest` for the active item and `surface-dim` for inactive items.

---

## 6. Do's and Don'ts

### Do
- **Do use asymmetrical layouts.** Place a heading on the left and body text slightly offset to the right to create "Editorial Tension."
- **Do use "Breathable" Spacing.** When in doubt, double the margin. Space is a luxury indicator.
- **Do utilize Newsreader for emphasis.** Mix Serif and Sans-serif in the same sentence to highlight key verbs (e.g., "Websites that *sell* while you *sleep*").

### Don't
- **Don't use pure white (#FFFFFF) for body text.** Use `on_surface_variant` (#bac9cc) to reduce eye strain and maintain the "dark mode" mood.
- **Don't use standard icons.** Use custom, thin-stroke (1px) SVG icons that match the `outline` token.
- **Don't use hard-edged boxes.** Every container should feel soft, utilizing the `md` to `xl` roundedness scale.
- **Don't use 1px dividers.** If a line is necessary, make it a "Ghost Border" that fades out at both ends using a linear gradient.