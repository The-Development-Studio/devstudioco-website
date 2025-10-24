# Setup Instructions - Fix API Errors

## ⚠️ Current Status

The website is trying to connect to Supabase, but the database tables haven't been created yet. This is causing the "Not Found" errors.

## ✅ Quick Fix (2 Options)

### Option 1: Create Database Tables (Recommended for Production)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com
   - Sign in to your account
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Paste This SQL**

```sql
-- Create all required tables at once

-- 1. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE testimonials_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for approved testimonials"
ON testimonials_b9482a76 FOR SELECT
USING (approved = true);

CREATE POLICY "Allow service role all operations on testimonials"
ON testimonials_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- 2. Team Members Table
CREATE TABLE IF NOT EXISTS team_members_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  image TEXT,
  bio TEXT,
  social JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE team_members_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for team members"
ON team_members_b9482a76 FOR SELECT
USING (true);

CREATE POLICY "Allow service role all operations on team"
ON team_members_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- 3. Client Logos Table
CREATE TABLE IF NOT EXISTS client_logos_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE client_logos_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for logos"
ON client_logos_b9482a76 FOR SELECT
USING (true);

CREATE POLICY "Allow service role all operations on logos"
ON client_logos_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- 4. Clients Table
CREATE TABLE IF NOT EXISTS clients_b9482a76 (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  otp TEXT,
  otp_expiry TIMESTAMP WITH TIME ZONE,
  verified BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE clients_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
ON clients_b9482a76 FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Allow service role all operations on clients"
ON clients_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- 5. Contact Forms Table
CREATE TABLE IF NOT EXISTS contact_forms_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  service TEXT,
  message TEXT NOT NULL,
  form_type TEXT DEFAULT 'general',
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE contact_forms_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role all operations on contact forms"
ON contact_forms_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- 6. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE newsletter_subscribers_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow service role all operations on newsletter"
ON newsletter_subscribers_b9482a76 FOR ALL
USING (auth.role() = 'service_role');
```

4. **Run the Query**
   - Click the "Run" button
   - Wait for success message
   - Go to "Table Editor" to verify all 6 tables exist

5. **Refresh Your Website**
   - The errors should be gone
   - Sections will be hidden (no data yet)
   - Use Admin Panel to add content

### Option 2: Temporary Fix (Use Default Data)

If you want to see the website working immediately without Supabase:

1. **Update Components to Show Default Data**

The components already have default data fallbacks. The errors occur but the site still works - the sections just hide themselves when empty.

2. **To see content immediately**, you can:
   - Login to Admin Panel (info@devstudioco.com / 12345)
   - Add team members, testimonials, and logos
   - They'll be stored in localStorage temporarily

## 🎯 What Happens After Setup

### With Database Tables Created:
- ✅ No more errors in console
- ✅ All data persists across refreshes
- ✅ Admin Panel saves to database
- ✅ Production-ready
- ✅ Multiple admins can manage content

### Without Database (Using localStorage):
- ⚠️ Errors in console (can be ignored)
- ⚠️ Data only saved locally (one browser)
- ⚠️ Data cleared if cookies/storage cleared
- ⚠️ Not suitable for production

## 📝 Verify Setup

After creating tables, test:

1. **Health Check**
   - Open browser console
   - Run: `fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b9482a76/health').then(r => r.json()).then(console.log)`
   - Should return: `{status: "ok", timestamp: "..."}`

2. **Check Tables**
   - In Supabase, go to Table Editor
   - You should see 6 tables:
     - testimonials_b9482a76
     - team_members_b9482a76
     - client_logos_b9482a76
     - clients_b9482a76
     - contact_forms_b9482a76
     - newsletter_subscribers_b9482a76

3. **Test Admin Panel**
   - Navigate to Admin Panel
   - Login: info@devstudioco.com / 12345
   - Add a test testimonial
   - Check Supabase Table Editor - it should appear there
   - Refresh website - testimonial should still be there

## 🆘 Still Having Issues?

### Error: "Failed to fetch"
**Cause**: Supabase Edge Function not deployed or wrong URL
**Fix**: Check `/utils/supabase/info.tsx` has correct projectId

### Error: "Table does not exist"
**Cause**: Database tables not created
**Fix**: Run the SQL script above

### Error: "Permission denied"
**Cause**: RLS policies not configured
**Fix**: The SQL script includes RLS policies - run it again

### Error: "CORS error"
**Cause**: CORS not configured on server
**Fix**: Already configured in `/supabase/functions/server/index.tsx`

## 📞 Need Help?

The errors you're seeing are **expected** until you create the database tables. The website will still work, but without persistent data storage.

**Current behavior**:
- ✅ Website displays correctly
- ✅ All pages work
- ✅ Forms submit (to localStorage)
- ⚠️ Console shows fetch errors (can be ignored)
- ⚠️ Sections auto-hide when empty

**After database setup**:
- ✅ No console errors
- ✅ Data persists
- ✅ Production-ready
- ✅ Multi-user admin access

---

**Recommendation**: Create the database tables now (takes 2 minutes) for the best experience!
