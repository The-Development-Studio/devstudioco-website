-- ===================================================================
-- THE DEVELOPMENT STUDIO - Complete Database Setup
-- Run this entire script in Supabase SQL Editor
-- ===================================================================

-- TABLE 1: Testimonials
-- ===================================================================
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

CREATE POLICY IF NOT EXISTS "Allow public read for approved testimonials"
ON testimonials_b9482a76 FOR SELECT
USING (approved = true);

CREATE POLICY IF NOT EXISTS "Allow service role all operations on testimonials"
ON testimonials_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 2: Team Members
-- ===================================================================
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

CREATE POLICY IF NOT EXISTS "Allow public read for team members"
ON team_members_b9482a76 FOR SELECT
USING (true);

CREATE POLICY IF NOT EXISTS "Allow service role all operations on team"
ON team_members_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 3: Projects (Portfolio)
-- ===================================================================
CREATE TABLE IF NOT EXISTS projects_b9482a76 (
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

CREATE POLICY IF NOT EXISTS "Allow public read for published projects"
ON projects_b9482a76 FOR SELECT
USING (published = true);

CREATE POLICY IF NOT EXISTS "Allow service role all operations on projects"
ON projects_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 4: Client Logos
-- ===================================================================
CREATE TABLE IF NOT EXISTS client_logos_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE client_logos_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read for logos"
ON client_logos_b9482a76 FOR SELECT
USING (true);

CREATE POLICY IF NOT EXISTS "Allow service role all operations on logos"
ON client_logos_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 5: Clients (User Authentication)
-- ===================================================================
CREATE TABLE IF NOT EXISTS clients_b9482a76 (
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

CREATE POLICY IF NOT EXISTS "Users can read own data"
ON clients_b9482a76 FOR SELECT
USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Allow service role all operations on clients"
ON clients_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 6: Contact Forms
-- ===================================================================
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

CREATE POLICY IF NOT EXISTS "Allow service role all operations on contact forms"
ON contact_forms_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 7: Newsletter Subscribers
-- ===================================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE newsletter_subscribers_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow service role all operations on newsletter"
ON newsletter_subscribers_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 8: Jobs (Career Postings)
-- ===================================================================
CREATE TABLE IF NOT EXISTS jobs_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  experience TEXT NOT NULL,
  salary_range TEXT,
  description TEXT NOT NULL,
  responsibilities TEXT[] DEFAULT '{}',
  requirements TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE jobs_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow public read for active jobs"
ON jobs_b9482a76 FOR SELECT
USING (active = true);

CREATE POLICY IF NOT EXISTS "Allow service role all operations on jobs"
ON jobs_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- TABLE 9: Job Applications
-- ===================================================================
CREATE TABLE IF NOT EXISTS job_applications_b9482a76 (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs_b9482a76(id) ON DELETE CASCADE,
  job_title TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  experience TEXT NOT NULL,
  linkedin_url TEXT,
  portfolio_url TEXT,
  cover_letter TEXT NOT NULL,
  resume_url TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE job_applications_b9482a76 ENABLE ROW LEVEL SECURITY;

CREATE POLICY IF NOT EXISTS "Allow service role all operations on job applications"
ON job_applications_b9482a76 FOR ALL
USING (auth.role() = 'service_role');

-- ===================================================================
-- VERIFICATION QUERY
-- Run this to verify all tables were created successfully
-- ===================================================================
SELECT 
  'testimonials_b9482a76' as table_name,
  count(*) as row_count
FROM testimonials_b9482a76
UNION ALL
SELECT 
  'team_members_b9482a76',
  count(*)
FROM team_members_b9482a76
UNION ALL
SELECT 
  'projects_b9482a76',
  count(*)
FROM projects_b9482a76
UNION ALL
SELECT 
  'client_logos_b9482a76',
  count(*)
FROM client_logos_b9482a76
UNION ALL
SELECT 
  'clients_b9482a76',
  count(*)
FROM clients_b9482a76
UNION ALL
SELECT 
  'contact_forms_b9482a76',
  count(*)
FROM contact_forms_b9482a76
UNION ALL
SELECT 
  'newsletter_subscribers_b9482a76',
  count(*)
FROM newsletter_subscribers_b9482a76
UNION ALL
SELECT 
  'jobs_b9482a76',
  count(*)
FROM jobs_b9482a76
UNION ALL
SELECT 
  'job_applications_b9482a76',
  count(*)
FROM job_applications_b9482a76;

-- ===================================================================
-- SAMPLE DATA (Optional - for testing)
-- ===================================================================

-- Sample Team Members
INSERT INTO team_members_b9482a76 (name, role, image, bio, social)
VALUES 
  (
    'Somaskandhan',
    'Co-Managing Director',
    'https://ui-avatars.com/api/?name=Somaskandhan&size=300',
    'Visionary leader driving innovation and excellence',
    '{"email": "somaskandhan@devstudioco.com", "linkedin": "https://linkedin.com"}'::jsonb
  ),
  (
    'Rahul',
    'Head of Support & Cyber Security',
    'https://ui-avatars.com/api/?name=Rahul&size=300',
    'Expert in cybersecurity and customer support',
    '{"email": "supports@devstudioco.com", "linkedin": "https://linkedin.com", "github": "https://github.com"}'::jsonb
  ),
  (
    'Sinduja',
    'Project Admin',
    'https://ui-avatars.com/api/?name=Sinduja&size=300',
    'Creating beautiful and intuitive user experiences',
    '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}'::jsonb
  ),
  (
    'Keerthi',
    'Project Admin',
    'https://ui-avatars.com/api/?name=Keerthi&size=300',
    'Ensuring seamless project delivery',
    '{"email": "info@devstudioco.com", "linkedin": "https://linkedin.com"}'::jsonb
  ),
  (
    'Janani',
    'Marketing Specialist',
    'https://ui-avatars.com/api/?name=Janani&size=300',
    'Driving growth through strategic marketing',
    '{"email": "info@devstudioco.com", "linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}'::jsonb
  )
ON CONFLICT DO NOTHING;

-- Sample Job Postings
INSERT INTO jobs_b9482a76 (title, department, location, type, experience, salary_range, description, responsibilities, requirements, benefits, active)
VALUES 
  (
    'Senior Full Stack Developer',
    'Engineering',
    'Chennai, Tamil Nadu, India',
    'Full-time',
    '5+ years',
    '₹12-18 LPA',
    'We are looking for an experienced Full Stack Developer to join our engineering team. You will work on cutting-edge technologies and build innovative solutions for our clients.',
    ARRAY['Design and develop scalable web applications', 'Collaborate with cross-functional teams', 'Mentor junior developers', 'Write clean, maintainable code'],
    ARRAY['5+ years of experience with React, Node.js, and TypeScript', 'Strong understanding of database design', 'Experience with cloud platforms (AWS/Azure)', 'Excellent problem-solving skills'],
    ARRAY['Competitive salary with performance bonuses', 'Health insurance', 'Flexible working hours', 'Remote work options', 'Professional development opportunities'],
    true
  ),
  (
    'UI/UX Designer',
    'Design',
    'Nagapattinam, Tamil Nadu, India',
    'Full-time',
    '3-5 years',
    '₹6-10 LPA',
    'Join our creative team as a UI/UX Designer and help create beautiful, intuitive user experiences for web and mobile applications.',
    ARRAY['Create wireframes, prototypes, and high-fidelity designs', 'Conduct user research and usability testing', 'Collaborate with developers to implement designs', 'Maintain design systems and guidelines'],
    ARRAY['3+ years of UI/UX design experience', 'Proficiency in Figma, Adobe XD, or Sketch', 'Strong portfolio showcasing your work', 'Understanding of design principles and user psychology'],
    ARRAY['Creative work environment', 'Latest design tools and software', 'Health benefits', 'Flexible schedule', 'Team outings and events'],
    true
  ),
  (
    'Cyber Security Analyst',
    'Security',
    'Remote',
    'Full-time',
    '2-4 years',
    '₹8-14 LPA',
    'Protect our clients infrastructure and data as a Cyber Security Analyst. Work with the latest security tools and technologies.',
    ARRAY['Monitor security systems and respond to incidents', 'Conduct security assessments and penetration testing', 'Develop security policies and procedures', 'Provide security training to team members'],
    ARRAY['2+ years in cybersecurity or related field', 'Knowledge of security frameworks (ISO 27001, NIST)', 'Experience with security tools (SIEM, IDS/IPS)', 'Security certifications (CEH, CISSP) preferred'],
    ARRAY['Continuous learning opportunities', 'Industry certifications sponsorship', 'Competitive compensation', 'Work from anywhere', 'Health insurance'],
    true
  );

-- ===================================================================
-- SUCCESS MESSAGE
-- ===================================================================
DO $
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE '✅ All 9 tables created with RLS enabled';
  RAISE NOTICE '✅ Sample team members and job postings added';
  RAISE NOTICE '';
  RAISE NOTICE '📋 Next Steps:';
  RAISE NOTICE '1. Login to Admin Panel (info@devstudioco.com / 12345)';
  RAISE NOTICE '2. Manage job postings in the Careers tab';
  RAISE NOTICE '3. Add testimonials, projects, and client logos';
  RAISE NOTICE '4. Verify data appears on website';
  RAISE NOTICE '';
  RAISE NOTICE '📞 Support: info@devstudioco.com | +91 8438028227';
END $;
