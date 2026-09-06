---
name: ConstructSafe System
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e5'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fe'
  surface-container: '#ededf9'
  surface-container-high: '#e7e7f3'
  surface-container-highest: '#e1e2ed'
  on-surface: '#191b23'
  on-surface-variant: '#434655'
  inverse-surface: '#2e3039'
  inverse-on-surface: '#f0f0fb'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#943700'
  on-tertiary: '#ffffff'
  tertiary-container: '#bc4800'
  on-tertiary-container: '#ffede6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#ffdbcd'
  tertiary-fixed-dim: '#ffb596'
  on-tertiary-fixed: '#360f00'
  on-tertiary-fixed-variant: '#7d2d00'
  background: '#faf8ff'
  on-background: '#191b23'
  surface-variant: '#e1e2ed'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is built for high-stakes construction environments where clarity saves lives. The brand personality is **authoritative, dependable, and ultra-legible**. It prioritizes utility over decoration, utilizing a **Refined Minimalism** style that emphasizes information hierarchy and rapid scanning.

The aesthetic avoids "tech-bro" trends in favor of a professional, industrial-grade interface. It uses ample whitespace to reduce cognitive load for site managers who may be viewing the dashboard in high-stress or outdoor conditions. Every visual element serves a functional purpose, ensuring that safety statuses are communicated instantly and without ambiguity.

## Colors

The palette is rooted in industry-standard safety signaling. 

- **Primary (Safety Blue):** Used for primary actions, navigation, and active states. It suggests stability and technical precision.
- **Semantic Statuses:** Green (Safe), Amber (Warning), and Red (Critical) are reserved strictly for safety status reporting. These must never be used for decorative purposes.
- **Neutral/Offline:** A range of grays used for secondary information, inactive sensors, or background utility elements.
- **Background:** A very light cool gray (#f8fafc) reduces screen glare compared to pure white, while maintaining high contrast for text.

All color combinations must meet WCAG 2.1 AA standards for contrast, particularly on status indicators and primary buttons.

## Typography

The design system uses **Inter** for its exceptional legibility and systematic feel. 

- **Numerical Data:** For summary cards and "big numbers," use `display-lg` with tight letter spacing to emphasize scale.
- **Headings:** Use `headline-lg` for page titles and `headline-md` for section headers within cards.
- **Readability:** Body text stays at `16px` minimum to ensure accessibility on tablets used in the field. 
- **Labels:** Labels use a slightly heavier weight (`600`) to differentiate them from data values, ensuring users can quickly distinguish between a metric and its title.

## Layout & Spacing

The system employs a **Fluid Grid** with a robust 8px spacing scale. 

- **Desktop Layout:** A 12-column grid with a 24px gutter. Main content containers have a maximum width of 1440px to prevent excessive line lengths.
- **Tablet/Mobile:** For tablet usage (common on-site), the grid shifts to 6 columns with 16px margins.
- **Touch Targets:** All interactive elements (buttons, toggles, list items) must maintain a minimum height of 48px to accommodate gloved or moving hands.
- **Rhythm:** Use `lg` (40px) spacing between major sections and `md` (24px) for padding within cards to ensure a breathable, low-stress layout.

## Elevation & Depth

To maintain a professional, utility-oriented feel, this system uses **Low-contrast Outlines** combined with **Ambient Shadows**.

- **Surface Tiers:** The main background is level 0 (#f8fafc). Cards and containers sit on level 1 (Pure White).
- **Shadows:** Use extremely soft, high-diffusion shadows (Blur: 12px, Opacity: 4%, Color: #000) to lift cards slightly off the surface. Do not use heavy or colored shadows.
- **Borders:** All cards and input fields should feature a 1px solid border (#e2e8f0) to provide structural definition even in high-glare environments where shadows might be washed out.
- **Interactive States:** On hover or active states, the border color shifts to the primary color or a darker neutral; avoid increasing shadow depth as it adds unnecessary visual noise.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a modern, approachable feel while maintaining the structural rigidity expected in a construction/industrial context.

- **Small Components:** Checkboxes and small buttons use the 0.25rem base.
- **Cards & Modals:** Use `rounded-lg` (0.5rem) to soften the large surface areas of the dashboard.
- **Status Badges:** Use `rounded-xl` (0.75rem) or fully pill-shaped styles to differentiate them from square-ish data containers and buttons.

## Components

- **Summary Cards:** Features a `display-lg` number, a `label-md` title, and a small trend indicator. High padding (24px) is mandatory.
- **Status Badges:** To ensure accessibility, badges must include an icon (e.g., checkmark, exclamation point) AND text. Do not rely on color alone. Use a light tinted background of the status color with high-contrast dark text.
- **Buttons:** Large (48px height), solid fills for primary actions. Use "Safety Blue" for primary and a light gray for secondary actions.
- **Data Tables:** Use generous 16px vertical padding for rows. Header cells must have a light gray background (#f1f5f9) and `label-sm` uppercase text for clear separation.
- **Input Fields:** 48px height for touch-friendliness. 1px border (#cbd5e1) that thickens to 2px Primary Blue on focus.
- **Line Charts:** Use a 2px stroke width for lines. Avoid grid lines where possible, or use very light gray (#f1f5f9) to keep the focus on the trend.
- **Alert Banners:** Top-of-screen persistence for "Critical" errors, using the full Red palette with a high-contrast white text.