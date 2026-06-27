# Design System Inspired by Xiaomi

## 1. Visual Theme & Atmosphere

The Xiaomi design system embodies a bold, forward-thinking aesthetic that balances minimalism with energetic vibrancy. The visual identity centers on clean, purposeful interfaces with striking accent colors that command attention without overwhelming the user. This is a tech-forward brand language that emphasizes clarity, precision, and accessibility across a diverse product ecosystem. The atmosphere is professional yet approachable, grounded in neutral tones with decisive pops of vibrant orange that signal innovation, action, and energy. The design philosophy prioritizes functional elegance—every element serves a purpose while maintaining a sophisticated, modern appearance suited to both tech enthusiasts and everyday consumers.

**Key Characteristics**

- Bold orange accent driving CTAs and highlights
- Predominantly neutral, almost monochromatic base palette
- Sharp, minimal visual hierarchy
- Tech-forward, professional aesthetic
- High contrast for accessibility and clarity
- Clean, uncluttered interface language
- Action-oriented design with energetic accents
- Versatile, scalable component system

## 2. Color Palette & Roles

### Primary

- **Action Orange** (`#FF6900`): Primary CTA buttons, active states, brand highlights, and key interactive elements
- **Action Orange Dark** (`#BE7600`): Hover states, secondary emphasis, and darker backgrounds for contrast

### Accent Colors

- **Orange Light** (`#FF7819`): Subtle highlights and accent overlays
- **Orange Medium** (`#FF8733`): Secondary accent applications
- **Orange Warm** (`#FF964C`): Tertiary accent for layered emphasis
- **Orange Pale** (`#FFA566`): Light accent backgrounds and disabled states
- **Orange Light Pale** (`#FFB47F`): Very light accent backgrounds
- **Orange Lightest** (`#FFC399`): Minimal accent applications and ghost states

### Interactive

- **Text on Dark** (`#FFFFFF`): Text and icons on dark backgrounds
- **Link Text** (`#303030`): Secondary text links and navigation elements
- **Icon Default** (`#191919`): Primary icon color

### Neutral Scale

- **Charcoal** (`#191919`): Primary text, headings, and dominant UI elements
- **Dark Gray** (`#303030`): Secondary text, subheadings, and secondary information
- **Pure Black** (`#000000`): Highest contrast text and critical UI elements
- **Gray Medium** (`#AEAEAE`): Disabled states, placeholders, and subtle text
- **Gray Light** (`#E8E8E8`): Subtle borders and divider lines

### Surface & Borders

- **White** (`#FFFFFF`): Primary surface and card backgrounds
- **Off White** (`#F7F8FA`): Subtle surface variations and light backgrounds
- **Neutral Light** (`#F7F7F7`): Alternative light surface for contrast

## 3. Typography Rules

### Font Family

**Primary:** MiSans Latin, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif

**Secondary:** MiSans Latin, sans-serif

### Hierarchy

| Role           | Font         | Size | Weight | Line Height | Letter Spacing | Notes                           |
| -------------- | ------------ | ---- | ------ | ----------- | -------------- | ------------------------------- |
| Display        | MiSans Latin | 32px | 700    | 40px        | 0px            | Page headlines, hero sections   |
| Heading Large  | MiSans Latin | 30px | 700    | 37.5px      | 0px            | Section titles, major headings  |
| Heading Medium | MiSans Latin | 16px | 700    | 20px        | 0px            | Card titles, subsections        |
| Body Bold      | MiSans Latin | 14px | 700    | 17.5px      | 0px            | Feature emphasis, strong text   |
| Body Regular   | MiSans Latin | 14px | 400    | 16.1px      | 0px            | Paragraph text, descriptions    |
| Button         | MiSans Latin | 16px | 400    | 18.4px      | 0px            | CTA and navigation buttons      |
| Small          | MiSans Latin | 24px | 600    | 24px        | 0px            | Feature callouts, emphasis text |
| Link           | MiSans Latin | 14px | 400    | 17.5px      | 0px            | Hyperlinks, navigation links    |

### Principles

- **Hierarchy through weight:** Typography relies on bold (700) weights for headings and semibold (600) for callouts to establish clear information hierarchy
- **Consistent line spacing:** Generous line heights ensure readability across screen sizes and reduce cognitive load
- **Minimal font sizes:** System uses constrained sizes (14px, 16px, 24px, 30px, 32px) to maintain consistency and predictability
- **Functional emphasis:** Bold weight is used strategically for features, CTAs, and critical information rather than decorative styling

## 4. Component Stylings

### Buttons

#### Primary Button

- **Background:** `#191919`
- **Text Color:** `#FFFFFF`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 32px`
- **Height:** `36px`
- **Border Radius:** `12px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Line Height:** `16.1px`
- **Hover State:** Darken background to `#0A0A0A`, increase shadow to `0px 4px 12px rgba(25, 25, 25, 0.15)`
- **Active State:** Scale to `0.98`, maintain `#191919`
- **Disabled State:** Set background to `#AEAEAE`, text to `#FFFFFF`, cursor to `not-allowed`

#### Secondary Button

- **Background:** `transparent`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 12px`
- **Height:** `34px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Line Height:** `16.1px`
- **Hover State:** Add underline, set text color to `#FF6900`
- **Active State:** Set text color to `#BE7600`
- **Disabled State:** Set text color to `#AEAEAE`

#### Tertiary / Ghost Button

- **Background:** `transparent`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 6px`
- **Height:** `48px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Line Height:** `16.1px`
- **Hover State:** Set background to `#F7F7F7`, text color to `#FF6900`
- **Active State:** Set background to `#E8E8E8`
- **Disabled State:** Set text color to `#AEAEAE`

#### Icon Button

- **Background:** `transparent`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 6px`
- **Height:** `48px`
- **Width:** `48px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Hover State:** Set background to `#F7F7F7`
- **Active State:** Set background to `#E8E8E8`, text color to `#FF6900`

### Cards & Containers

#### Product Card

- **Background:** `#FFFFFF`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px`
- **Border Radius:** `0px`
- **Border:** `1px solid #E8E8E8`
- **Box Shadow:** `none`
- **Line Height:** `17.5px`
- **Min Height:** `178.5px`
- **Min Width:** `187.5px`
- **Hover State:** Add shadow `0px 4px 12px rgba(25, 25, 25, 0.08)`, lift slightly with transform `translateY(-4px)`
- **Image Area:** Full width, 140px height, object-fit cover
- **Content Padding:** `12px 12px 12px 12px`

#### Section Card

- **Background:** `#F7F8FA`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `24px 32px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Line Height:** `17.5px`

#### Featured Container

- **Background:** `#FFFFFF`
- **Text Color:** `#191919`
- **Padding:** `40px 32px`
- **Border Radius:** `0px`
- **Border:** `0px`
- **Min Height:** `400px`
- **Display:** `flex`
- **Align Items:** `center`

### Inputs & Forms

#### Text Input

- **Background:** `transparent`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `1px 14px 1px 36px`
- **Height:** `38px`
- **Border Radius:** `12px`
- **Border:** `1px solid #E8E8E8`
- **Box Shadow:** `none`
- **Line Height:** `16.1px`
- **Placeholder Color:** `#AEAEAE`
- **Focus State:** Border color `#FF6900`, box-shadow `0px 0px 0px 2px rgba(255, 105, 0, 0.1)`
- **Error State:** Border color `#D32F2F`, background `#FFEBEE`
- **Disabled State:** Background `#F7F7F7`, text color `#AEAEAE`, cursor `not-allowed`

#### Search Input (Dark)

- **Background:** `#191919`
- **Text Color:** `#FFFFFF`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `1px 36px 1px 14px`
- **Height:** `38px`
- **Border Radius:** `12px`
- **Border:** `0px`
- **Box Shadow:** `none`
- **Line Height:** `16.1px`
- **Placeholder Color:** `rgba(255, 255, 255, 0.5)`
- **Focus State:** Box-shadow `0px 0px 0px 2px rgba(255, 105, 0, 0.2)`

### Navigation

#### Primary Navigation Bar

- **Background:** `#FFFFFF`
- **Text Color:** `#191919`
- **Height:** `48px`
- **Padding:** `0px 32px`
- **Border Radius:** `0px`
- **Border Bottom:** `1px solid #E8E8E8`
- **Box Shadow:** `rgba(25, 25, 25, 0.06) 0px 6px 16px 0px`
- **Display:** `flex`
- **Align Items:** `center`
- **Gap:** `32px`
- **Hover State:** Text color `#FF6900`, underline appears
- **Active State:** Text color `#FF6900`, border-bottom `3px solid #FF6900`

#### Navigation Link

- **Background:** `transparent`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Padding:** `0px 6px`
- **Height:** `48px`
- **Line Height:** `17.5px`
- **Hover State:** Color `#FF6900`
- **Active State:** Color `#FF6900`, border-bottom `3px solid #FF6900`

#### Breadcrumb Navigation

- **Font Size:** `14px`
- **Font Weight:** `400`
- **Color:** `#303030`
- **Separator:** `/` in `#AEAEAE`
- **Active Link Color:** `#191919`
- **Inactive Link Color:** `#AEAEAE`
- **Line Height:** `17.5px`

### Badges

#### Primary Badge

- **Background:** `#FF6900`
- **Text Color:** `#FFFFFF`
- **Font Size:** `12px`
- **Font Weight:** `600`
- **Padding:** `4px 8px`
- **Border Radius:** `4px`
- **Border:** `0px`
- **Display:** `inline-block`

#### Secondary Badge

- **Background:** `#F7F7F7`
- **Text Color:** `#191919`
- **Font Size:** `12px`
- **Font Weight:** `600`
- **Padding:** `4px 8px`
- **Border Radius:** `4px`
- **Border:** `1px solid #E8E8E8`
- **Display:** `inline-block`

### Tabs

#### Tab Navigation

- **Background:** `transparent`
- **Text Color:** `#191919`
- **Font Size:** `14px`
- **Font Weight:** `400`
- **Height:** `44px`
- **Padding:** `0px 16px`
- **Border Radius:** `0px`
- **Border Bottom:** `2px solid transparent`
- **Line Height:** `17.5px`
- **Cursor:** `pointer`
- **Hover State:** Color `#FF6900`
- **Active State:** Color `#FF6900`, border-bottom `2px solid #FF6900`
- **Disabled State:** Color `#AEAEAE`, cursor `not-allowed`

## 5. Layout Principles

### Spacing System

- **Base Unit:** `4px`
- **Scale:** `4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 60px`
- **Margins:** Use `16px`, `24px`, `32px` for section separation
- **Padding:** Use `12px`, `16px`, `20px`, `32px`, `40px` for content areas
- **Gaps:** Use `16px`, `20px`, `32px`, `60px` for component spacing
- **Usage Context:**
  - `4px, 8px`: Micro interactions, icon padding, tight grouping
  - `12px, 16px`: Component padding, small spacing
  - `20px, 24px`: Section spacing, medium gaps
  - `32px, 40px`: Large content padding, major section spacing
  - `60px`: Full-section vertical gaps, hero spacing

### Grid & Container

- **Max Width:** `1440px`
- **Container Padding:** `32px` on desktop, `16px` on tablet, `12px` on mobile
- **Column Strategy:** 12-column grid for desktop layouts
- **Gutter Width:** `16px` between columns
- **Section Patterns:**
  - Full-width hero sections with internal max-width containers
  - Centered content blocks with breathing room
  - Grid-based product displays with consistent column widths
  - Sidebar + main content layouts with 1:3 or 1:4 ratios

### Whitespace Philosophy

The design system employs generous whitespace to reduce cognitive load and emphasize key content. Spacing is used deliberately to create visual hierarchy and guide user attention. Empty space is treated as an active design element, not wasted real estate. Sections are clearly delineated through spacing and background color changes rather than heavy borders.

### Border Radius Scale

- **`4px`:** Badges, small components, and minimal rounding
- **`12px`:** Buttons, input fields, and medium-sized interactive elements
- **`0px`:** Cards, containers, navigation, and major UI surfaces (sharp, modern aesthetic)

## 6. Depth & Elevation

| Level      | Treatment                                 | Use                                   |
| ---------- | ----------------------------------------- | ------------------------------------- |
| Flat       | No shadow, `box-shadow: none`             | Base surfaces, cards, backgrounds     |
| Raised     | `0px 4px 12px rgba(25, 25, 25, 0.08)`     | Hovered cards, lifted containers      |
| Navigation | `rgba(25, 25, 25, 0.06) 0px 6px 16px 0px` | Header, persistent navigation         |
| Overlay    | `0px 8px 24px rgba(25, 25, 25, 0.12)`     | Modals, dropdowns, floating content   |
| Highest    | `0px 12px 32px rgba(25, 25, 25, 0.15)`    | Full-screen overlays, critical modals |

**Shadow Philosophy:** The Xiaomi design system uses subtle, minimal shadows primarily for navigation and interactive feedback. Shadows are kept soft and diffused, avoiding hard or dramatic elevation. This maintains the clean, modern aesthetic while providing necessary depth cues for interactivity. Shadows are used sparingly on hover states and persistent UI elements rather than as a primary design language.

## 7. Do's and Don'ts

### Do

- Use `#FF6900` (Action Orange) as the dominant accent for all primary CTAs and interactive states
- Apply generous whitespace (`16px`–`40px`) between major sections to reduce visual clutter
- Prioritize `#191919` text on light backgrounds and `#FFFFFF` text on dark backgrounds for optimal contrast
- Use the MiSans Latin font family consistently across all text elements
- Employ `12px` border-radius exclusively for buttons and input fields; keep cards and containers at `0px` radius
- Scale typography through weight (400, 600, 700) rather than multiple font families
- Group related components with `16px` gaps and larger sections with `32px`–`60px` spacing
- Add subtle hover shadows (`0px 4px 12px rgba(25, 25, 25, 0.08)`) to interactive cards
- Implement focus states with colored borders (`#FF6900`) and light shadow rings
- Test all interactive elements on both desktop and mobile for consistent touch target sizes

### Don't

- Don't use orange accents (`#FF6900`, `#BE7600`) for non-interactive, non-highlighted elements
- Don't apply bold (700) weight to body text; reserve it strictly for headings and emphasis
- Don't mix border-radius values on cards; maintain `0px` for architectural consistency
- Don't exceed two primary font weights in a single section (avoid mixing 400, 600, and 700 on same line)
- Don't add shadows to every interactive element; limit shadows to hover states and persistent navigation
- Don't increase spacing beyond `60px` between sections without justification
- Don't use colors outside the defined palette for UI elements; maintain consistency
- Don't apply transparency to text elements; use solid colors from the neutral scale
- Don't create custom button styles; use defined primary, secondary, tertiary, or icon variants only
- Don't apply more than one visual effect (shadow + color change + scale) on a single hover state

## 8. Responsive Behavior

### Breakpoints

| Breakpoint    | Width        | Key Changes                                                         |
| ------------- | ------------ | ------------------------------------------------------------------- |
| Mobile        | 320px–767px  | Single column, full-width cards, stacked navigation, `12px` padding |
| Tablet        | 768px–1023px | 2–3 columns, reduced padding to `16px`, horizontal scroll optional  |
| Desktop       | 1024px+      | Full 12-column grid, `32px` padding, max-width `1440px`             |
| Large Desktop | 1440px+      | Same layout, centered with breathing room                           |

### Touch Targets

- **Minimum height:** `44px` for all interactive elements on mobile
- **Minimum width:** `44px` for icon buttons and small controls
- **Minimum padding:** `8px` around touch targets to prevent accidental presses
- **Spacing between targets:** `8px` minimum to avoid overlap
- **Links and buttons:** Ensure full `48px` height on mobile for comfort

### Collapsing Strategy

- **Navigation:** Collapse primary nav into hamburger menu below `768px`; show full nav on tablet and desktop
- **Product grid:** Switch from 4 columns (desktop) → 3 columns (tablet) → 2 columns (mobile)
- **Padding:** Reduce from `32px` (desktop) → `16px` (tablet) → `12px` (mobile)
- **Font sizes:** Maintain declared sizes across breakpoints; adjust line-height for mobile readability
- **Containers:** Stack side-by-side sections vertically on mobile; maintain side-by-side on tablet+
- **Images:** Use `max-width: 100%` and `height: auto` for responsive scaling
- **Modals:** Use full viewport on mobile; constrain to `90vw` max on tablet+
- **Whitespace:** Reduce gaps by `50%` on mobile (e.g., `32px` → `16px`), maintain on tablet+

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Action Orange (`#FF6900`)
- **CTA Hover:** Action Orange Dark (`#BE7600`)
- **Primary Text:** Charcoal (`#191919`)
- **Secondary Text:** Dark Gray (`#303030`)
- **Text on Dark:** White (`#FFFFFF`)
- **Background:** White (`#FFFFFF`)
- **Light Background:** Off White (`#F7F8FA`)
- **Disabled/Placeholder:** Gray Medium (`#AEAEAE`)
- **Borders/Dividers:** Gray Light (`#E8E8E8`)
- **Icon Default:** Charcoal (`#191919`)

### Iteration Guide

1. **Apply MiSans Latin consistently** across all text; fall back to system fonts if unavailable.

2. **Use Action Orange (`#FF6900`) for all primary CTAs, active states, and brand highlights** — never use secondary orange shades for main interactions.

3. **Primary buttons are solid `#191919` with `#FFFFFF` text, `14px` font weight 400, `12px` border-radius, `0px 32px` padding, `36px` height.**

4. **Cards and containers use `0px` border-radius** for architectural sharpness; only buttons and inputs use `12px` radius.

5. **Primary text is Charcoal (`#191919`), secondary text is Dark Gray (`#303030`), and disabled/placeholder text is Gray Medium (`#AEAEAE`).**

6. **Spacing scale is `4px`, `8px`, `12px`, `16px`, `20px`, `24px`, `32px`, `40px`, `60px` — use only these values.**

7. **Typography hierarchy uses weight (400, 600, 700) and size (12px, 14px, 16px, 24px, 30px, 32px) — no custom sizes.**

8. **Hover states add soft shadows (`0px 4px 12px rgba(25, 25, 25, 0.08)`) and slight lift (`translateY(-4px)`) for cards.**

9. **Focus states use colored borders (`#FF6900`) with subtle ring shadow (`0px 0px 0px 2px rgba(255, 105, 0, 0.1)`).**

10. **Navigation bars use `#FFFFFF` background with `1px solid #E8E8E8` bottom border and navigation shadow `rgba(25, 25, 25, 0.06) 0px 6px 16px 0px`.**

11. **Responsive design: single column mobile → 2–3 columns tablet → full grid desktop; adjust padding from `12px` (mobile) → `16px` (tablet) → `32px` (desktop).**

12. **Minimize shadows: use only on hover states (cards), persistent navigation, and overlays — never on every element.**
