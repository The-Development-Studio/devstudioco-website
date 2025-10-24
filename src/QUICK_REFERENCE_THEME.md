# Quick Reference - Theme & Loading

## 🎯 Quick Commands

### Reset Loading Animation (Show Again)
```javascript
sessionStorage.removeItem('hasLoaded');
// Then refresh page
```

### Check Current Theme
```javascript
localStorage.getItem('theme'); // 'light' or 'dark'
```

### Force Light Mode
```javascript
localStorage.setItem('theme', 'light');
// Then refresh page
```

### Force Dark Mode
```javascript
localStorage.setItem('theme', 'dark');
// Then refresh page
```

### Clear All Preferences
```javascript
sessionStorage.clear();
localStorage.removeItem('theme');
// Then refresh page
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `/contexts/ThemeContext.tsx` | Theme state management |
| `/components/LoadingAnimation.tsx` | Loading screen |
| `/components/Header.tsx` | Theme toggle UI |
| `/styles/globals.css` | Color variables |

## 🎨 Quick Theme Toggle

### In Component
```tsx
import { useTheme } from './contexts/ThemeContext';

const { theme, toggleTheme } = useTheme();

// Current theme
console.log(theme); // 'light' or 'dark'

// Toggle
toggleTheme();
```

## ⚙️ Configuration

### Loading Duration
**File**: `/App.tsx` (line 49)
```tsx
}, 3000); // milliseconds
```

### Default Theme
**File**: `/contexts/ThemeContext.tsx` (line 15)
```tsx
return savedTheme || 'light'; // or 'dark'
```

### Disable Loading
**File**: `/App.tsx` (line 39)
```tsx
const [isLoading] = useState(false);
```

## 🎨 Color Reference

### Light Mode
```css
Background: #ffffff
Text: #000000
Primary: #FF6600
```

### Dark Mode
```css
Background: #000000
Text: #ffffff
Primary: #FF6600
```

## 🚀 Browser DevTools

### Check Loading State
```javascript
sessionStorage.getItem('hasLoaded')
// null = will show loading
// 'true' = will skip loading
```

### Check Theme State
```javascript
document.documentElement.classList.contains('dark')
// true = dark mode
// false = light mode
```

## 📱 User Features

- **Desktop**: Theme toggle icon in header (top-right)
- **Mobile**: Theme toggle button in mobile menu
- **Loading**: Shows once per session (3 seconds)
- **Persistence**: Theme saved forever, loading resets on tab close

## 🔧 Troubleshooting

### Loading animation won't show again
```javascript
sessionStorage.removeItem('hasLoaded');
```

### Theme won't persist
Check localStorage is enabled in browser

### Dark mode not applying
```javascript
// Force refresh
document.documentElement.classList.toggle('dark');
```

### Colors look wrong
Clear cache and hard reload (Ctrl+Shift+R)

## ✅ Status Indicators

Loading Animation: ✅ Active  
Light Mode: ✅ Active  
Dark Mode: ✅ Active  
Theme Toggle: ✅ Active  
Persistence: ✅ Active  

---

**Last Updated**: October 19, 2025
