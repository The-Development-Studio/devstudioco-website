# Database Setup Guide for The Development Studio

## Important Note
This application uses Supabase for backend services. The following tables need to be created in your Supabase project.

## Required Tables

### 1. testimonials_b9482a76
Stores client testimonials displayed on the website.

```sql
CREATE TABLE testimonials_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  approved BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE testimonials_b9482a76 ENABLE ROW LEVEL SECURITY;

-- Allow public read access for approved testimonials
CREATE POLICY "Allow public read for approved testimonials"
ON testimonials_b9482a76 FOR SELECT
USING (approved = true);

-- Allow service role full access
CREATE POLICY "Allow service role all operations"
ON testimonials_b9482a76 FOR ALL
USING (auth.role() = 'service_role');
```

### 2. team_members_b9482a76
Stores team member information.

```sql
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
```

### 3. projects_b9482a76
Stores portfolio projects displayed on the Works page.

```sql
CREATE TABLE projects_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  outcome TEXT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE projects_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read for published projects"
ON projects_b9482a76 FOR SELECT
USING (published = true);

CREATE POLICY "Allow service role all operations on projects"
ON projects_b9482a76 FOR ALL
USING (auth.role() = 'service_role');
```

### 4. client_logos_b9482a76
Stores client company logos for the moving carousel.

```sql
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
```

### 5. clients_b9482a76
Stores client registration and authentication data.

```sql
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
```

### 6. contact_forms_b9482a76
Stores contact form submissions.

```sql
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
```

### 7. newsletter_subscribers_b9482a76
Stores newsletter email subscriptions.

```sql
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

## Setup Instructions

1. **Access Supabase Dashboard**
   - Go to your Supabase project at https://supabase.com
   - Navigate to SQL Editor

2. **Run SQL Scripts**
   - Copy each table creation script above
   - Execute them one by one in the SQL Editor
   - Verify all tables are created successfully

3. **Verify Setup**
   - Go to Table Editor
   - Confirm all 7 tables exist with correct schemas

4. **Email Service Configuration (Optional)**
   Currently, the email service logs to console. To enable actual email sending:
   
   - Sign up for an email service (SendGrid, AWS SES, Resend, etc.)
   - Get your API key
   - Update the `sendEmail` function in `/supabase/functions/server/index.tsx`
   - Add your email API key as an environment variable in Supabase

## Environment Variables

The following environment variables are automatically available:
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key (server-side only)
- `SUPABASE_ANON_KEY` - Anonymous key (client-side)

## Testing the Setup

1. **Test Database Connection**
   - Visit your app
   - Check browser console for errors
   - Admin panel should load without errors

2. **Test API Endpoints**
   ```bash
   # Health check
   curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b9482a76/health
   
   # Get testimonials
   curl https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-b9482a76/api/testimonials
   ```

3. **Test Admin Panel**
   - Login to admin panel: info@devstudioco.com / 12345
   - Try adding a testimonial
   - Try adding a team member
   - Verify data appears on website

## Production Checklist

- [ ] All database tables created
- [ ] Row Level Security (RLS) policies enabled
- [ ] Email service configured (optional but recommended)
- [ ] API endpoints tested
- [ ] Admin panel access verified
- [ ] Client registration flow tested
- [ ] OTP verification tested (will only log to console without email service)
- [ ] Contact forms working
- [ ] Newsletter subscription working

## Security Notes

⚠️ **Important**: This is a development/prototype setup. For production:

1. **Enable Email Service**: OTPs won't work without actual email delivery
2. **SSL/HTTPS**: Ensure all connections use HTTPS
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Input Validation**: Server validates all inputs
5. **GDPR Compliance**: Add proper data handling policies
6. **Backup Strategy**: Set up automated database backups
7. **Monitoring**: Enable error tracking and monitoring

## Support

For questions or issues:
- Email: info@devstudioco.com
- Phone: +91 84380 28227, +91 84895 51887
