# URL Navigation System Guide

## How It Works

The website uses **hash-based routing** for client-side navigation. This means URLs look like:
- `https://yoursite.com/#home`
- `https://yoursite.com/#about`
- `https://yoursite.com/#client-portal`

## All Available URLs

### Public Pages
```
/#home                  - Homepage with hero section
/#about                 - About page with team and certifications
/#works                 - Portfolio/Works showcase
/#blog                  - Blog posts
/#careers               - Career opportunities
/#support               - Support center
/#contact               - Contact page with forms
```

### Service Pages
```
/#service-0             - Web Design & Development
/#service-1             - Custom Software Solutions
/#service-2             - Mobile Applications
/#service-3             - E-Commerce Solutions
/#service-4             - Cyber Security
/#service-5             - Graphical Designing
```

### Portal Pages
```
/#client-portal         - Client Portal (Login + Dashboard)
/#admin                 - Admin Panel
/#admin-enhanced        - Enhanced Admin Panel with client management
```

### Legal Pages
```
/#privacy-policy        - Privacy Policy
/#terms-conditions      - Terms & Conditions
/#refund-policy         - Refund Policy
/#cookies-policy        - Cookies Policy
```

## Navigation Methods

### 1. Header Navigation
Click any link in the header menu:
- Home, About, Services (dropdown), Works, Careers, Support, Contact
- **New**: "Client Portal" button (with login icon)

### 2. Direct URL
Simply type the URL in browser:
```
https://yoursite.com/#about
https://yoursite.com/#client-portal
```

### 3. Programmatic Navigation
In code, use the `onNavigate` function:
```typescript
onNavigate('about')        // Goes to about page
onNavigate('service-0')    // Goes to first service
onNavigate('client-portal') // Goes to client portal
```

### 4. Browser Back/Forward
- Back button: Returns to previous page
- Forward button: Goes to next page
- History is properly maintained

## URL Parameters

Currently, the system uses simple hash routing without query parameters. Each page is identified by its hash value.

### Examples:
- `#home` → HomePage component
- `#about` → AboutPage component
- `#service-2` → ServicePage with ID 2 (Mobile Applications)
- `#client-portal` → ClientPortalEnhanced component

## Special Behaviors

### Client Portal
- If not authenticated: Shows login screen
- If authenticated: Shows dashboard with projects, files, messages

### Admin Panels
- Both require authentication
- `#admin` - Standard admin panel
- `#admin-enhanced` - Full client management features

### Service Pages
- Dynamic routing based on service ID
- ID 0-5 corresponds to the 6 main services

## Features

✅ **Browser Integration**
- Back/forward buttons work correctly
- Bookmarkable URLs
- Shareable links

✅ **Scroll Behavior**
- Auto-scrolls to top on page change
- Smooth scrolling enabled

✅ **State Management**
- Page state persists on refresh
- Authentication state maintained

✅ **SEO Ready**
- Each page has unique SEO metadata
- Meta tags update on navigation

## Code Structure

### App.tsx
```typescript
// Initial page from URL
const [currentPage, setCurrentPage] = useState(() => {
  const hash = window.location.hash.slice(1) || 'home';
  return hash;
});

// Update URL when page changes
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.location.hash = currentPage;
}, [currentPage]);

// Handle browser back/forward
useEffect(() => {
  const handleHashChange = () => {
    const hash = window.location.hash.slice(1) || 'home';
    setCurrentPage(hash);
  };
  window.addEventListener('hashchange', handleHashChange);
  return () => window.removeEventListener('hashchange', handleHashChange);
}, []);
```

## Testing URLs

### Quick Test Commands
Open browser console and try:
```javascript
// Navigate to about page
window.location.hash = 'about'

// Navigate to client portal
window.location.hash = 'client-portal'

// Navigate to specific service
window.location.hash = 'service-3'

// Check current page
console.log(window.location.hash)
```

## Linking to Pages

### From External Sites
```html
<a href="https://yoursite.com/#contact">Contact Us</a>
<a href="https://yoursite.com/#client-portal">Client Login</a>
```

### In Marketing Materials
```
Visit our portfolio: yoursite.com/#works
Apply for jobs: yoursite.com/#careers
Client login: yoursite.com/#client-portal
```

### In Emails
```
View your projects: https://yoursite.com/#client-portal
Read our blog: https://yoursite.com/#blog
Contact support: https://yoursite.com/#support
```

## Common Issues & Solutions

### Issue: Page doesn't load correctly
**Solution**: Ensure the hash is spelled correctly. Use lowercase.

### Issue: Back button doesn't work
**Solution**: This is now fixed with hashchange listener.

### Issue: URL shows old page after clicking link
**Solution**: The URL updates automatically via useEffect.

### Issue: Want to link to a specific section
**Solution**: Currently pages are top-level only. For sections, you can add scroll-to-section logic.

## Future Enhancements

Potential improvements (not yet implemented):

1. **Query Parameters**
   - `#blog?post=123`
   - `#service-0?package=premium`

2. **Path-based Routing**
   - `/about` instead of `/#about`
   - Requires server configuration

3. **Deep Linking**
   - `#works?category=web&filter=recent`

4. **Analytics Integration**
   - Track page views per route
   - Monitor navigation patterns

## Best Practices

1. **Always use lowercase** in hash values
2. **Use hyphens** for multi-word pages (e.g., `client-portal`, not `clientportal`)
3. **Keep URLs simple** - easy to remember and share
4. **Test on all browsers** - hash routing works universally
5. **Provide navigation** - don't rely only on URLs

## Quick Reference Table

| Page | URL Hash | Component |
|------|----------|-----------|
| Home | `#home` | HomePage |
| About | `#about` | AboutPage |
| Works | `#works` | WorksPage |
| Blog | `#blog` | BlogPage |
| Careers | `#careers` | CareersPage |
| Support | `#support` | SupportPage |
| Contact | `#contact` | ContactPage |
| Client Portal | `#client-portal` | ClientPortalEnhanced |
| Admin | `#admin` | AdminPanel |
| Admin Enhanced | `#admin-enhanced` | AdminPanelEnhanced |

---

**Note**: All URLs are case-sensitive in the hash. Always use lowercase for consistency.
