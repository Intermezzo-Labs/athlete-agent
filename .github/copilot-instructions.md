# Copilot Custom Instructions

This is a **Next.js 15 enterprise application** using:

- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- Radix UI primitives
- class-variance-authority
- Storybook
- Vitest + Playwright
- PNPM
- App Router

All generated code must be:

- Fully typed
- Accessible (WCAG AA compliant)
- Server-component first
- Production-ready
- Clean and readable
- Enterprise-grade

---

# Design Reference

Visual direction inspired by https://y.co

Design principles:

- Extremely minimal
- High-contrast typography
- Strong editorial hierarchy
- Generous white space
- No visual noise
- Subtle interaction states
- Monochrome base + single accent color
- Professional, institutional tone
- No decorative gradients unless subtle

---

# Visual System Rules

## 1. Color System

Base:

- Background: `bg-white`
- Primary text: `text-black`
- Secondary text: `text-neutral-600`
- Borders: `border-neutral-200`
- Hover states: `bg-neutral-50`

Accent:

- YC Orange: `#FF6600`
- Use only for:
  - Primary buttons
  - Links
  - Key callouts
  - Minimal highlights

Never:

- Overuse accent
- Use loud gradients
- Add random brand colors

---

## 2. Typography

Typography is the primary design element.

Use:

- System UI or Inter font stack
- Large bold headlines
- Clean paragraph spacing
- Strong hierarchy

Hierarchy:

- Hero H1: `text-5xl md:text-6xl font-semibold tracking-tight`
- Section H2: `text-3xl md:text-4xl font-semibold`
- Subheading: `text-lg text-neutral-600`
- Body: `text-base leading-relaxed`
- Small: `text-sm text-neutral-500`

Avoid:

- Decorative fonts
- Tight line-height on body text
- Excessive letter spacing

---

## 3. Layout Rules

- Max width: `max-w-6xl`
- Content centered
- Large vertical spacing: `py-24`
- Prefer whitespace over separators
- Avoid clutter

Standard container pattern:

```tsx
<section className="py-24">
  <div className="mx-auto max-w-6xl px-6">
    {/* content */}
  </div>
</section>
```

---

## 4. Buttons

Primary Button:

```
className="inline-flex items-center justify-center rounded-md bg-[#FF6600] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 transition duration-200 ease-in-out"
```

Secondary Button:

```
className="inline-flex items-center justify-center rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-black hover:bg-neutral-50 transition duration-200 ease-in-out"
```

Avoid:

- Heavy shadows
- Neon effects
- Over-rounded pill buttons

---

## 5. Cards

Cards should feel editorial, not SaaS-dashboard heavy.

```
className="border border-neutral-200 rounded-lg p-8 bg-white"
```

Avoid:

- Large shadows
- Bright backgrounds
- Playful UI effects

---

## 6. Navigation

Clean, thin borders, minimal links, subtle hover states. No animated underline gimmicks.

```tsx
<nav className="border-b border-neutral-200">
  <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
    {/* content */}
  </div>
</nav>
```

---

## 7. Interaction Philosophy

Animations must be:

- Subtle
- 150–200ms
- Ease-in-out
- No bounce
- No overshoot

Use only:

```
transition duration-200 ease-in-out
```

---

# Code Architecture Rules

## 1. Component Structure

- Server components by default
- Client components only when required
- Reusable UI components under `/components/ui`
- Feature components under `/components/feature`
- No business logic inside page files

## 2. Tailwind Usage

- Utility-first only
- Avoid custom CSS files
- Use class-variance-authority for variants
- Use tailwind-merge when combining classes
- Use spacing scale instead of hardcoded px values

Never:

- Inline style objects
- Arbitrary values without reason

## 3. Accessibility

All components must:

- Use semantic HTML
- Include ARIA attributes when needed
- Maintain visible focus states
- Support keyboard navigation
- Maintain 4.5:1 contrast minimum

## 4. Performance

- Avoid unnecessary client components
- No heavy animation libraries
- Use `next/image` for images
- Avoid large dependency additions
- Prevent layout shifts
- Prefer streaming and server rendering

---

# Copy Style Guidelines

Tone must be:

- Direct
- Confident
- Institutional
- Clear

No fluff, no hype, no emoji, no exaggerated marketing language.

**Wrong:**

> The future of AI is here and it's revolutionizing everything!

**Correct:**

> We support early-stage founders building enduring companies.

---

# Example Hero Pattern

```tsx
<section className="py-32">
  <div className="mx-auto max-w-4xl px-6 text-center">
    <h1 className="text-5xl md:text-6xl font-semibold tracking-tight">
      Backing founders building the future.
    </h1>
    <p className="mt-6 text-lg text-neutral-600">
      We invest in early-stage startups and help them grow into enduring companies.
    </p>
    <div className="mt-10 flex justify-center gap-4">
      {/* buttons */}
    </div>
  </div>
</section>
```

---

# Copilot Priorities

When generating code:

1. Clarity over cleverness
2. Simplicity over complexity
3. Whitespace over decoration
4. Typography over graphics
5. Institutional trust over startup flashiness
6. Accessibility first
7. Server component first

---

# Default Fallback Rules

If unsure, default to:

- White background
- Black text
- Neutral borders
- Strong typography
- Large spacing
- Minimal interaction
