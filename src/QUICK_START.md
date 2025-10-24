# Quick Start Guide - The Development Studio

## 🚀 Get Started in 5 Minutes

### Step 1: Create Database Tables (Required)

1. Go to your Supabase dashboard at https://supabase.com
2. Navigate to **SQL Editor**
3. Copy and paste this SQL script:

```sql
-- Testimonials Table
CREATE TABLE testimonials_b9482a76 (
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

CREATE POLICY "Allow service role all operations"
ON testimonials_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- Team Members Table
CREATE TABLE team_members_b9482a76 (
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

-- Client Logos Table
CREATE TABLE client_logos_b9482a76 (
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

-- Clients Table
CREATE TABLE clients_b9482a76 (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
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

-- Contact Forms Table
CREATE TABLE contact_forms_b9482a76 (
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

-- Newsletter Subscribers Table
CREATE TABLE newsletter_subscribers_b9482a76 (
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

4. Click **Run** to execute
5. Go to **Table Editor** and verify all 6 tables exist

### Step 2: Test Admin Panel

1. Open your website
2. Navigate to **Admin Panel** (usually /admin or click Admin in header)
3. Login with:
   - **Email**: info@devstudioco.com
   - **Password**: 12345
4. You should see the dashboard

### Step 3: Add Initial Content

#### Add Team Members:
1. In Admin Panel, go to **Team Members** tab
2. Click **Add Team Member**
3. Fill in details for each team member:
   - **Somaskandhan** - Founder & CEO
   - **Rahul** - Lead Developer
   - **Sinduja** - UI/UX Designer
   - **Keerthi** - Project Manager
   - **Janani** - Marketing Specialist
4. Use default profile images or add URLs

#### Add Testimonials (Optional):
1. Go to **Testimonials** tab
2. Click **Add Testimonial**
3. Fill in: Name, Designation, Company, Quote
4. No need for profile images!

#### Add Client Logos (Optional):
1. Go to **Logos** tab
2. Click **Add Logo**
3. Enter company name and logo URL
4. Logos will scroll automatically

### Step 4: Test Website Features

✅ **Homepage**: Check all sections load
✅ **About Page**: Team section should show
✅ **Services**: Navigate through all 6 services
✅ **Contact**: Submit a test form
✅ **Testimonials**: Should appear if you added any
✅ **Client Logos**: Should scroll if you added any

### Step 5: Configure Email (Optional but Recommended)

Without email configuration:
- ✅ Website works perfectly
- ✅ Forms submit successfully
- ❌ OTP emails only log to console
- ❌ No actual emails sent

To enable emails:
1. Sign up for SendGrid (free tier available)
2. Get API key
3. Add to Supabase: Settings → Edge Functions → Add `SENDGRID_API_KEY`
4. Update `sendEmail` function in `/supabase/functions/server/index.tsx`

## ⚡ What's Working Right Now

### ✅ Fully Functional (No Email Needed)
- Complete website with all pages
- Admin panel for content management
- Team members section
- Testimonials (when added)
- Client logos with infinite scroll
- Contact forms (submissions logged)
- Newsletter subscription (emails logged)
- Responsive design
- All micro-interactions
- Legal pages (Privacy, Terms, Refund)

### ⏳ Requires Email Service
- Client registration OTP delivery
- Login OTP delivery  
- Contact form email notifications
- Newsletter welcome emails

## 📞 Support Contact

**The Development Studio**
- **Email**: info@devstudioco.com, supports@devstudioco.com
- **Phone**: +91 84380 28227, +91 84895 51887
- **Address**: Nagapattinam, Tamil Nadu, India 609504
- **Currency**: INR (₹)

## 🎯 Next Steps

1. ✅ Complete database setup (Step 1 above)
2. ✅ Add your team members
3. ⏸️ Add client testimonials (optional)
4. ⏸️ Add client logos (optional)
5. ⏸️ Configure email service (when ready)
6. ⏸️ Customize legal pages if needed
7. ⏸️ Test on mobile/tablet
8. 🚀 Deploy to production!

## 🔍 Troubleshooting

**Problem**: Admin panel shows "No data"
**Solution**: Make sure you created the database tables in Step 1

**Problem**: Forms don't submit
**Solution**: Check browser console for errors. Verify database setup.

**Problem**: OTP not working
**Solution**: Expected! Email service not configured. Check server logs for OTP code.

**Problem**: Sections not showing
**Solution**: Intentional! Empty sections are hidden. Add content via Admin Panel.

## 📚 More Documentation

- **Full Guide**: See `/PRODUCTION_READY_GUIDE.md`
- **Database Setup**: See `/DATABASE_SETUP.md`
- **API Reference**: Check `/utils/api.ts`

---

**You're all set! 🎉** Your professional corporate website is ready to go live!
