# Iskomeet Design System

This document captures the UI/UX direction of the project so it can be recreated faithfully in a new codebase or design mockup.

## 1. Product vision

Iskomeet is a modern campus-focused social/dating app for students and young professionals in the Philippines. The visual language is warm, aspirational, and mobile-first, with a premium dating-app feel but grounded in academic identity and campus affiliation.

The experience is intentionally built like a polished mobile app shell:
- full-height phone frame
- soft shadows and rounded corners
- segmented navigation
- card-based discovery and chat flows
- subtle gradients and layered surfaces
- strong emphasis on personality, profile matching, and trust

## 2. Core design principles

### A. Clean and premium
- generous whitespace
- simple hierarchy
- soft neutral surfaces
- high-contrast text for readability

### B. Campus identity
- campus color cues are used as badge accents
- university context is treated as a social signal, not just metadata
- labels like “Campus Hub”, “Scholars”, and “Iskolar Mode” reinforce the niche

### C. Mobile-first intimacy
- every screen is designed to feel like a compact app experience
- controls are thumb-friendly
- cards are tall, stacked, and highly readable on small screens

### D. Warm romance with practicality
- rose/pink/brand red palette feels human and social
- the app still feels professional and minimal enough for a real product concept

## 3. Design language

### Color palette

Primary brand palette:
- brand-500: #FF385C
- brand-600: #E0264A
- brand-700: #BE123C
- brand-50: #FFF1F3
- brand-100: #FFE4E8

Supporting neutrals:
- ink: #0F172A
- muted text: #64748B
- paper: #FFFFFF
- background: #F8FAFC
- border: #E2E8F0
- bubble: #F1F5F9

Campus-accent colors used in cards and badges:
- maroon: #7B1113
- crimson: #800000
- pnuBlue: #1E40AF
- gold: #F59E0B
- online green: #10B981

### Typography

The project uses a modern geometric sans style with a rounded, friendly feel.

Font stack:
- "Plus Jakarta Sans"
- Inter
- system-ui
- -apple-system
- BlinkMacSystemFont
- Segoe UI
- sans-serif

Usage:
- headline text: bold / extra bold, tight tracking
- body text: medium-weight, readable, warm spacing
- labels: uppercase, small, letter-spaced
- badges: bold and compact

### Border radius
Common values used across the app:
- small pills: 9999px
- input fields: 16px to 20px
- cards and modals: 24px to 32px
- avatars and media: circular or rounded rectangle

### Shadows
The project uses soft layered shadows for depth without being heavy:
- phone shell: large and subtle
- cards: moderate elevation
- buttons: compact glow-like shadows

Examples from config:
- phone: 0 25px 70px -12px rgba(15, 23, 42, 0.25)
- card: 0 20px 30px -10px rgba(0, 0, 0, 0.12)
- glow: 0 10px 30px -5px rgba(255, 56, 92, 0.35)
- soft: 0 4px 20px -2px rgba(15, 23, 42, 0.06)

## 4. Layout system

### App shell
The app is built as a mobile shell centered in a desktop viewport:
- white or dark card container
- max width matched to a phone-like frame
- top bar, content region, bottom navigation or action bar
- consistent padding and spacing

### Screen patterns
The UI follows a few repeated patterns:

1. Feature header
   - left anchor icon or logo
   - product title
   - optional status pill
   - right-side action button

2. Profile card stack
   - image fills most of the card
   - gradient overlay for text readability
   - name, age, program, and campus tag layered on top
   - action buttons below or floating

3. Chat list and conversation screen
   - user mini-header
   - speaker bubbles with rounded corners
   - sender/receiver distinctions by color and alignment
   - quick icebreakers at the top or in the match modal

4. Search / discovery grid
   - 2-column card grid on mobile
   - image, name, age, online indicator, like button, CTA buttons
   - filter chips above the content

5. Auth / onboarding screens
   - centered card inside mobile shell
   - fields with bordered inputs and soft backgrounds
   - primary CTA with strong accent color
   - subtle step guidance underneath

## 5. Key UI components

### Buttons
- primary: filled accent color, white text, rounded corners
- secondary: neutral background, dark text
- icon buttons: circular, light hover states
- CTA buttons: strong shadow and hover scale

### Inputs
- rounded-2xl borders
- neutral grey fill with subtle focus ring
- visible labels and soft placeholder tone
- on focus: border turns brand red and a light glow ring appears

### Cards
- white base surface
- border 1px solid slate-200
- soft shadows
- subtle hover elevation

### Tags / badges
- compact pills for campuses, online state, and filters
- brand red or campus color backgrounds
- strong typography in small caps style

## 6. UI/UX details by page

### Landing page
- hero-style layout with a premium “discover your campus vibe” feel
- big headline, strong CTA, quick stats, and social trust cues
- image-based cards or profile previews for featured people
- soft gradients and layered cards to create aspiration

### Match page
- full-card swipe/discovery interface
- large photo, overlay text, campus badge, heart/skip controls
- message state feedback like “LIKE”, “PASS”, “SUPER LIKE”
- match modal with celebration and quick conversation starters

### Chat page
- sticky top header with profile summary
- quick-switcher for matched contacts
- message bubbles with aligned sender states
- typing indicator using a subtle bouncing animation
- tiny info drawer for profile details

### Search page
- search bar with campus filter chips
- “active scholars only” toggle
- 2-column profile cards
- campus and program metadata presented as compact tags

### Profile page
- personal identity card with avatar and campus info
- interest chips and short bio
- trust signals such as verification and program/year details

### Auth pages
- minimalist form structure
- clear labels, required state, and concise helper text
- strong “Create Account” or “Sign In” primary actions

## 7. Motion and micro-interactions

The project uses light motion to keep the interface responsive and lively:
- hover elevation on cards and buttons
- scale transitions on touch actions
- subtle pulse for online status
- fade-in effects in modal overlays
- typing dots bounce animation for chat

Key behaviors:
- buttons scale slightly on press
- cards brighten or shadow-up on hover
- modals animate in with soft fade/scale motion
- chips switch from neutral to accent with simple transitions

## 8. Dark mode behavior

The design supports a dark theme using Tailwind’s class-based dark mode.

Base dark values:
- background: #020817
- text: #E2E8F0
- surface: #0F172A
- panel: #111827

The dark mode is implemented as a class toggle on the html element and is applied to surfaces, text, and card backgrounds while preserving the same visual hierarchy.

## 9. Implementation notes for recreation

### Frontend stack
- React
- TypeScript
- Vite
- Tailwind CSS

### Tailwind config highlights
- darkMode: 'class'
- custom brand colors under `brand`
- campus palette under `wellfleet`
- custom shadows for phone and cards
- custom font families using Plus Jakarta Sans

### Global CSS notes
- base font set uses `Plus Jakarta Sans` with `system-ui` fallback
- color scheme variables are set in `:root` and `html.dark`
- focus states are styled with a brand red ring
- custom `typing-dot` animation adds chat personality

## 10. Visual reference summary

If you were to recreate the interface with another tool or framework, the closest match is:
- premium dating app UI
- mobile-facing “phone shell” composition
- warm pink-red brand identity
- academic/campus identity encoded through badges, labels, and filters
- soft card-based layout with robust whitespace and mobile-first spacing

## 11. Quick build instructions

```bash
npm install
npm run dev
```

## 12. Suggested design reproduction checklist

When recreating this interface, ensure the following are present:
- [ ] Modern sans typography with rounded geometry
- [ ] Warm pink/red accent palette
- [ ] Soft neutral card surfaces
- [ ] Mobile phone-shell layout
- [ ] Campus-aware badge styling
- [ ] Profile discovery cards with large imagery
- [ ] Action buttons with strong contrast and subtle hover motion
- [ ] Chat bubbles and typing indicator
- [ ] Dark mode support with class-based toggling
- [ ] Rounded corners and layered shadows across all surfaces

This is the design DNA of Iskomeet: premium, warm, campus-rooted, and optimized for mobile social discovery.
