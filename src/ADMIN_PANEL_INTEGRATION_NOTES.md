# Admin Panel Supabase Integration Notes

## Current Status

The AdminPanelEnhanced component is currently using localStorage. The API utility (`/utils/api.ts`) has been created to facilitate migration to Supabase.

## How to Use the API Utility

### Import the API
```typescript
import { testimonialsAPI, teamAPI, logosAPI, adminAPI } from '../utils/api';
```

### Example: Loading Testimonials
**Instead of**:
```typescript
const stored = localStorage.getItem('testimonials');
if (stored) {
  setTestimonials(JSON.parse(stored));
}
```

**Use**:
```typescript
testimonialsAPI.getAll()
  .then(data => setTestimonials(data.testimonials || []))
  .catch(error => console.error('Error loading testimonials:', error));
```

### Example: Creating a Testimonial
**Instead of**:
```typescript
const updated = [...testimonials, newTestimonial];
setTestimonials(updated);
localStorage.setItem('testimonials', JSON.stringify(updated));
```

**Use**:
```typescript
testimonialsAPI.create({
  name: newTestimonial.name,
  designation: newTestimonial.designation,
  company: newTestimonial.company,
  quote: newTestimonial.quote
})
  .then(result => {
    toast.success('Testimonial added successfully');
    loadTestimonials(); // Refresh list
  })
  .catch(error => {
    toast.error('Failed to add testimonial');
    console.error(error);
  });
```

### Example: Deleting a Testimonial
**Instead of**:
```typescript
const updated = testimonials.filter(t => t.id !== id);
setTestimonials(updated);
localStorage.setItem('testimonials', JSON.stringify(updated));
```

**Use**:
```typescript
testimonialsAPI.delete(id)
  .then(() => {
    toast.success('Testimonial deleted');
    loadTestimonials(); // Refresh list
  })
  .catch(error => {
    toast.error('Failed to delete testimonial');
    console.error(error);
  });
```

## Admin Panel Migration Pattern

For each section in the Admin Panel:

### 1. **Load Data on Mount**
```typescript
useEffect(() => {
  loadTestimonials();
  loadTeamMembers();
  loadLogos();
  loadClients();
}, []);

const loadTestimonials = async () => {
  try {
    const data = await testimonialsAPI.getAll();
    setTestimonials(data.testimonials || []);
  } catch (error) {
    console.error('Error loading testimonials:', error);
    toast.error('Failed to load testimonials');
  }
};

// Similar functions for team, logos, clients
```

### 2. **Create Operations**
```typescript
const handleAddTestimonial = async () => {
  try {
    await testimonialsAPI.create(newTestimonial);
    toast.success('Testimonial added');
    setNewTestimonial({ name: '', designation: '', company: '', quote: '' });
    loadTestimonials(); // Refresh
  } catch (error) {
    toast.error('Failed to add testimonial');
  }
};
```

### 3. **Update Operations**
```typescript
const handleUpdateTestimonial = async (id: string, updates: any) => {
  try {
    await testimonialsAPI.update(id, updates);
    toast.success('Testimonial updated');
    loadTestimonials(); // Refresh
  } catch (error) {
    toast.error('Failed to update testimonial');
  }
};
```

### 4. **Delete Operations**
```typescript
const handleDeleteTestimonial = async (id: string) => {
  if (!confirm('Are you sure?')) return;
  
  try {
    await testimonialsAPI.delete(id);
    toast.success('Testimonial deleted');
    loadTestimonials(); // Refresh
  } catch (error) {
    toast.error('Failed to delete testimonial');
  }
};
```

## API Methods Available

### **Testimonials**
```typescript
testimonialsAPI.getAll()                    // Get all testimonials
testimonialsAPI.create(data)                // Create new
testimonialsAPI.update(id, data)            // Update existing
testimonialsAPI.delete(id)                  // Delete
```

### **Team Members**
```typescript
teamAPI.getAll()                            // Get all team members
teamAPI.create(data)                        // Create new
teamAPI.update(id, data)                    // Update existing
teamAPI.delete(id)                          // Delete
```

### **Client Logos**
```typescript
logosAPI.getAll()                           // Get all logos
logosAPI.create(data)                       // Create new
logosAPI.delete(id)                         // Delete
```

### **Admin Functions**
```typescript
adminAPI.getClients()                       // Get all clients
adminAPI.toggleClientStatus(id)             // Activate/deactivate
```

## Data Structures

### **Testimonial**
```typescript
{
  id: string,              // UUID
  name: string,
  designation: string,
  company: string,
  quote: string,
  approved: boolean,       // Default: true
  created_at: string       // ISO timestamp
}
```

### **Team Member**
```typescript
{
  id: string,              // UUID
  name: string,
  role: string,
  image: string,           // URL
  bio?: string,
  social: {
    linkedin?: string,
    twitter?: string,
    github?: string,
    email?: string
  },
  created_at: string
}
```

### **Logo**
```typescript
{
  id: string,              // UUID
  name: string,
  image: string,           // URL
  created_at: string
}
```

### **Client**
```typescript
{
  id: string,              // UUID (from Supabase Auth)
  email: string,
  name: string,
  company?: string,
  verified: boolean,
  active: boolean,
  created_at: string
}
```

## Testing the Integration

### 1. **Test Database Connection**
```bash
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b9482a76/health
```

Should return:
```json
{"status":"ok","timestamp":"2025-10-14T..."}
```

### 2. **Test GET Endpoints**
```bash
# Get testimonials
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b9482a76/api/testimonials \
  -H "Authorization: Bearer YOUR_ANON_KEY"

# Get team members
curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b9482a76/api/team \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

### 3. **Test CREATE via Admin Panel**
1. Login to Admin Panel
2. Try adding a testimonial
3. Check database in Supabase Table Editor
4. Verify it appears on website

## Common Issues & Solutions

### **Issue**: API calls fail with 404
**Solution**: Make sure Edge Function is deployed and URL is correct

### **Issue**: "Table does not exist"
**Solution**: Run the SQL scripts to create tables (see DATABASE_SETUP.md)

### **Issue**: "Permission denied"
**Solution**: Check RLS policies are configured correctly

### **Issue**: Data doesn't appear on website
**Solution**: 
- Check browser console for errors
- Verify API is returning data
- Check component is calling the API on mount

### **Issue**: Can't delete/update
**Solution**: Verify you're using service role key on server (not anon key)

## Migration Checklist

For Admin Panel Supabase integration:

- [ ] Replace localStorage reads with API calls
- [ ] Replace localStorage writes with API calls
- [ ] Add loading states for async operations
- [ ] Add error handling with toast notifications
- [ ] Test all CRUD operations
- [ ] Verify data persists across refreshes
- [ ] Test with empty database
- [ ] Test with populated database
- [ ] Verify website reflects admin changes
- [ ] Test on mobile devices

## Notes

1. **The API utility (`/utils/api.ts`) is already created and ready to use**
2. **The server endpoints (`/supabase/functions/server/index.tsx`) are fully implemented**
3. **The database schema is documented in `/DATABASE_SETUP.md`**
4. **The Admin Panel just needs to call these APIs instead of localStorage**
5. **All other components (TeamSection, TestimonialsSection, ClientLogosSection) already use the APIs**

## Example: Complete Section Migration

Here's how the Testimonials section would look migrated:

```typescript
// At the top
const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
const [loading, setLoading] = useState(true);

// Load on mount
useEffect(() => {
  loadTestimonials();
}, []);

const loadTestimonials = async () => {
  setLoading(true);
  try {
    const data = await testimonialsAPI.getAll();
    setTestimonials(data.testimonials || []);
  } catch (error) {
    console.error('Error loading testimonials:', error);
    toast.error('Failed to load testimonials');
  } finally {
    setLoading(false);
  }
};

// Add
const handleAddTestimonial = async () => {
  try {
    await testimonialsAPI.create(newTestimonial);
    toast.success('Testimonial added successfully');
    setNewTestimonial({ name: '', designation: '', company: '', quote: '' });
    await loadTestimonials();
  } catch (error) {
    toast.error('Failed to add testimonial');
    console.error('Add testimonial error:', error);
  }
};

// Delete
const handleDeleteTestimonial = async (id: string) => {
  if (!confirm('Are you sure you want to delete this testimonial?')) return;
  
  try {
    await testimonialsAPI.delete(id);
    toast.success('Testimonial deleted');
    await loadTestimonials();
  } catch (error) {
    toast.error('Failed to delete testimonial');
    console.error('Delete testimonial error:', error);
  }
};

// In JSX
{loading ? (
  <div className="text-center py-8">Loading...</div>
) : testimonials.length === 0 ? (
  <p className="text-center text-muted-foreground py-8">
    No testimonials yet. Add one above!
  </p>
) : (
  testimonials.map(testimonial => (
    // Render testimonial
  ))
)}
```

---

**The infrastructure is ready!** Just replace localStorage calls with API calls in AdminPanelEnhanced.tsx and you're done! 🚀
