# Smooth Animations & Mouse Movements Guide

## ✅ Implemented Features

### 1. **Custom Cursor with Natural Movement**
- **Location**: `/components/CustomCursor.tsx`
- **Features**:
  - Natural, responsive cursor dot using `useSpring` for smooth movement
  - Trailing outer ring with subtle delay for depth effect
  - Click ripple animation that expands and fades
  - Automatic hover detection on all interactive elements
  - Respects user's motion preferences (prefers-reduced-motion)
  - Hidden on mobile devices (< 768px)
  - **Optimized Spring Configs**:
    - Main cursor: `{ damping: 25, stiffness: 500, mass: 0.2 }` - Fast & responsive
    - Outer ring: `{ damping: 28, stiffness: 350, mass: 0.3 }` - Smooth trailing

### 2. **Scroll Progress Indicator**
- **Location**: `/components/ScrollProgress.tsx`
- **Features**:
  - Top bar showing scroll progress with smooth spring animation
  - Scroll-to-top button that appears after scrolling 300px
  - Smooth fade-in/fade-out with spring physics
  - Magnetic hover and tap effects

### 3. **Company Milestones Timeline**
- **Location**: `/components/CompanyTimeline.tsx`
- **Integrated in**: `/components/AboutPage.tsx`
- **Milestones Displayed**:
  - **2020**: Company Founded
  - **2020-2023**: 50+ Projects & Corporate Brandings Delivered
  - **2023**: Government Recognition
  - **2024**: ISO Certification & First Major Client
  - **Present**: Global Service Provider
- **Animation Features**:
  - Staggered reveal animations
  - Pulsing glow effects on milestone icons
  - Smooth hover lift effects on cards
  - Responsive timeline with vertical line connector

### 4. **Parallax Mouse Movement Components**

#### ParallaxWrapper
- **Location**: `/components/ParallaxWrapper.tsx`
- **Usage**: Wraps elements that should follow mouse movement
- **Features**:
  - Configurable intensity
  - Smooth spring-based movement
  - Tracks mouse position relative to element center

#### ParallaxLayer
- **Location**: `/components/ParallaxWrapper.tsx`
- **Usage**: Creates depth with different movement speeds
- **Features**:
  - Configurable depth multiplier
  - Global mouse tracking
  - Layered parallax effect

#### ParallaxCard & ParallaxSection
- **Location**: `/components/ParallaxCard.tsx`
- **Usage**: Scroll-based parallax effects
- **Features**:
  - Smooth Y-axis movement based on scroll
  - Fade in/out based on viewport position
  - Configurable offset and speed

### 5. **Magnetic Button Component**
- **Location**: `/components/MagneticButton.tsx`
- **Features**:
  - Buttons that pull towards the cursor
  - Configurable magnetic strength
  - Spring-based smooth follow effect
  - Scale animations on hover and tap
  - Also includes `MagneticDiv` for non-button elements

### 6. **Smooth Reveal Animations**
- **Location**: `/components/SmoothReveal.tsx`
- **Animation Directions**:
  - `up`: Slides from bottom
  - `down`: Slides from top
  - `left`: Slides from right
  - `right`: Slides from left
  - `scale`: Scales in from 80%
- **Features**:
  - Configurable delay and duration
  - Viewport-based triggering (only animates when in view)
  - Staggered reveal for multiple elements

### 7. **Mouse Follower Gradient**
- **Location**: `/components/MouseFollowerGradient.tsx`
- **Variants**:
  - **MouseFollowerGradient**: Radial gradient following cursor
  - **MouseFollowerSpotlight**: Spotlight effect following cursor
- **Features**:
  - Smooth spring-based movement
  - Non-intrusive (pointer-events: none)
  - Subtle ambient lighting effect

### 8. **Smooth Scroll Utilities**
- **Location**: `/utils/useSmoothScroll.ts`
- **Functions**:
  - `useSmoothScroll()`: Hook for anchor link smooth scrolling
  - `scrollToTop()`: Programmatic scroll to top
  - `scrollToElement()`: Scroll to specific element with offset
- **Features**:
  - Automatic handling of hash navigation
  - Configurable offset for fixed headers

### 9. **Scroll Reveal Hook**
- **Location**: `/utils/useScrollReveal.ts`
- **Hooks**:
  - `useScrollReveal()`: Detects when element enters viewport
  - `useScrollProgress()`: Returns scroll percentage (0-100)
  - `useScrollDirection()`: Returns 'up', 'down', or null
- **Features**:
  - IntersectionObserver-based
  - Configurable threshold and root margin
  - Optional trigger-once mode

### 10. **Global CSS Animations**
- **Location**: `/styles/globals.css`
- **Animations Added**:
  ```css
  - @keyframes float
  - @keyframes floatSlow
  - @keyframes pulse-slow
  - @keyframes glow
  - @keyframes slideInUp/Left/Right
  - @keyframes fadeIn
  - @keyframes scaleIn
  - @keyframes gradient-shift
  ```
- **Utility Classes**:
  ```css
  - .animate-float
  - .animate-float-slow
  - .animate-pulse-slow
  - .animate-glow
  - .hover-lift
  - .magnetic
  - .reveal / .reveal.active
  - .parallax-layer
  - .fade-in / .fade-in-up / .fade-in-left / .fade-in-right
  - .scale-in
  - .gpu-accelerated
  - .smooth-transform
  - .page-transition
  ```

### 11. **Enhanced Global Transitions**
- All interactive elements have smooth cubic-bezier transitions
- Button hover effects with subtle lift
- Link hover with opacity transitions
- Smooth page transitions
- Hardware-accelerated transforms

## 🎨 Usage Examples

### Basic Smooth Reveal
```tsx
<SmoothReveal direction="up" delay={0.2}>
  <div>Content that slides up smoothly</div>
</SmoothReveal>
```

### Parallax Mouse Effect
```tsx
<ParallaxWrapper intensity={0.1}>
  <Card>This card follows your mouse!</Card>
</ParallaxWrapper>
```

### Magnetic Button
```tsx
<MagneticButton 
  strength={0.3}
  className="px-6 py-3 bg-primary text-white rounded-lg"
>
  Hover Me!
</MagneticButton>
```

### Scroll-Based Parallax
```tsx
<ParallaxCard offset={50}>
  <div>Moves with scroll position</div>
</ParallaxCard>
```

## 🚀 Performance Optimizations

1. **Spring Animations**: Using Motion's `useSpring` for 60fps smooth animations
2. **Hardware Acceleration**: CSS transforms use GPU acceleration
3. **Passive Event Listeners**: Scroll and mouse events use `{ passive: true }`
4. **IntersectionObserver**: Efficient viewport detection for scroll reveals
5. **will-change**: Applied to animated elements for browser optimization
6. **RequestAnimationFrame**: Implicit through Motion's animation system

## 📝 Configuration Options

### Custom Cursor
- Adjust spring config in `/components/CustomCursor.tsx`
- **Main cursor**: `{ damping: 25, stiffness: 500, mass: 0.2 }` - Responsive & natural
- **Outer ring**: `{ damping: 28, stiffness: 350, mass: 0.3 }` - Smooth trailing
- **Tips**: 
  - Increase stiffness (500-700) for snappier response
  - Increase damping (25-35) to reduce bounce
  - Lower mass (0.1-0.3) for lighter, faster movement

### Scroll Progress
- Change appearance threshold in `ScrollToTopButton` (default: 300px)
- Modify spring config for progress bar smoothness

### Parallax Effects
- Adjust `intensity` prop for stronger/weaker effects
- Modify `depth` prop for layered parallax strength
- Change spring configs for different feel

## 🎯 Company Milestones Integration

The Company Timeline is automatically displayed on the About page and shows:
- Visual timeline with animated icons
- Smooth scroll reveals for each milestone
- Pulsing glow effects on milestone markers
- Responsive design (vertical on mobile, alternating on desktop)
- Government recognition and ISO certification highlights

## ✨ Best Practices

1. Use `SmoothReveal` for content that should animate on scroll
2. Apply `ParallaxWrapper` to hero sections and key visual elements
3. Use `MagneticButton` for important CTAs
4. Keep magnetic strength between 0.2-0.5 for best UX
5. Stagger animations with delays (0.1s increments work well)
6. Use `gpu-accelerated` class for complex animations
7. Test on lower-end devices to ensure 60fps

## 🔧 Troubleshooting

- **Cursor lag**: Reduce stiffness value in spring config
- **Too fast movement**: Increase damping value
- **Animations not triggering**: Check viewport threshold
- **Scroll jank**: Ensure passive event listeners are used
- **Mobile performance**: Reduce parallax intensity on mobile

## 📦 Dependencies

All animations use the Motion library (`motion/react`):
- No additional dependencies required
- All components are self-contained
- Lightweight and performant
- Full TypeScript support

---

**Last Updated**: October 20, 2025
**Status**: ✅ Complete and Production-Ready
