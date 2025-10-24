# Theme Toggle & Loading Animation Guide

## Overview
The website now features a comprehensive Light/Dark mode toggle system and a professional coding-style loading animation that appears on the first visit.

## Features Implemented

### 1. **Loading Animation**
- **Coding-Style Terminal**: Displays an animated terminal window with syntax-highlighted code
- **Progress Bar**: Shows real-time loading progress (0-100%)
- **Brand Display**: Features company name with gradient text and tagline
- **Animated Elements**: 
  - Code lines appear sequentially with typewriter effect
  - Blinking cursor for authentic terminal feel
  - Smooth progress bar animation
  - Pulsing logo and loading dots
- **Duration**: 3 seconds on first visit (cached in sessionStorage)
- **Skipping**: Subsequent visits skip the loading animation

### 2. **Light/Dark Mode Toggle**
- **Theme Persistence**: Theme preference saved in localStorage
- **Smooth Transitions**: All colors and backgrounds transition smoothly (200ms)
- **Header Toggle**: 
  - Desktop: Icon button (Sun/Moon) in header navigation
  - Mobile: Full button in mobile menu
- **Default Theme**: Light mode (can be customized)
- **Context-Based**: Uses React Context API for global state management

### 3. **Enhanced Dark Mode**
- **Optimized Colors**:
  - Background: Pure black (#000000)
  - Cards: Dark gray (#1a1a1a)
  - Secondary: Medium gray (#2a2a2a)
  - Primary: Orange (#FF6600) - unchanged for brand consistency
- **Improved Contrast**: All text remains readable in both modes
- **Input Fields**: Proper background colors in dark mode (#2a2a2a)
- **Skeleton Loading**: Adapted for dark theme

## Technical Implementation

### Theme Context
Located in `/contexts/ThemeContext.tsx`
- Provides `theme` state and `toggleTheme` function
- Handles localStorage persistence
- Manages `dark` class on document root

### Loading Animation Component
Located in `/components/LoadingAnimation.tsx`
- Full-screen overlay (z-index: 9999)
- Syntax highlighting for code keywords, strings, and methods
- Real-time progress tracking
- Exit animation using AnimatePresence

### CSS Variables
Located in `/styles/globals.css`
- Comprehensive color system for both themes
- Smooth transitions on all elements
- Dark mode skeleton animation

### Header Integration
Located in `/components/Header.tsx`
- Desktop: Icon-only button with hover effects
- Mobile: Full-width button with icon and label
- Uses lucide-react icons (Sun/Moon)

## Usage

### Toggle Theme Programmatically
```tsx
import { useTheme } from './contexts/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

### Reset Loading Animation
To show the loading animation again (for testing):
```javascript
sessionStorage.removeItem('hasLoaded');
// Then reload the page
```

### Disable Loading Animation
In `App.tsx`, modify the initial state:
```tsx
const [isLoading, setIsLoading] = useState(false);
```

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Accessibility
- Theme toggle has proper aria-label
- Loading animation doesn't block screen readers (exits after 3s)
- Smooth transitions respect `prefers-reduced-motion`
- High contrast maintained in both themes

## Performance
- Theme preference cached in localStorage (instant load)
- Loading animation uses GPU-accelerated CSS transforms
- SessionStorage prevents unnecessary re-renders
- Optimized color transitions (200ms)

## Customization

### Change Loading Duration
In `App.tsx`:
```tsx
setTimeout(() => {
  setIsLoading(false);
  sessionStorage.setItem('hasLoaded', 'true');
}, 3000); // Change 3000 to desired milliseconds
```

### Modify Code Animation
In `LoadingAnimation.tsx`, edit the `codeLines` array:
```tsx
const codeLines = [
  { text: 'Your custom code here', delay: 0 },
  // Add more lines...
];
```

### Adjust Transition Speed
In `globals.css`:
```css
transition-duration: 200ms; /* Change to desired duration */
```

## Known Issues
- None currently

## Future Enhancements
- System theme detection (auto mode)
- Custom theme colors per user preference
- Animated theme transition effects
- Loading animation variations

---

**Last Updated**: October 19, 2025
**Version**: 1.0.0
