import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));
app.use('*', logger(console.log));

// Supabase client
const supabaseAdmin = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Helper function to generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Helper function to send email (using a placeholder - integrate with actual email service)
async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  try {
    // TODO: Integrate with actual email service (SendGrid, AWS SES, etc.)
    // For now, just log the email
    console.log('Email to:', to);
    console.log('Subject:', subject);
    console.log('Content:', html);
    
    // Simulate success
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Initialize database tables
async function initializeTables() {
  const { error: testimonialsError } = await supabaseAdmin
    .from('testimonials_b9482a76')
    .select('id')
    .limit(1);
  
  if (testimonialsError) {
    console.log('Creating testimonials table...');
    // Table will be created via Supabase UI or migrations
  }
}

// Initialize on startup
initializeTables();

// ============= TESTIMONIALS =============
app.get('/make-server-b9482a76/api/testimonials', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('testimonials_b9482a76')
      .select('*')
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ testimonials: data || [] });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return c.json({ testimonials: [] });
  }
});

app.post('/make-server-b9482a76/api/testimonials', async (c) => {
  try {
    const body = await c.req.json();
    const { name, designation, company, quote } = body;

    const { data, error } = await supabaseAdmin
      .from('testimonials_b9482a76')
      .insert([{
        name,
        designation,
        company,
        quote,
        approved: true,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, testimonial: data });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-b9482a76/api/testimonials/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { name, designation, company, quote, approved } = body;

    const { data, error } = await supabaseAdmin
      .from('testimonials_b9482a76')
      .update({ name, designation, company, quote, approved })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, testimonial: data });
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-b9482a76/api/testimonials/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { error } = await supabaseAdmin
      .from('testimonials_b9482a76')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= TEAM MEMBERS =============
app.get('/make-server-b9482a76/api/team', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('team_members_b9482a76')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return c.json({ team: data || [] });
  } catch (error) {
    console.error('Error fetching team:', error);
    return c.json({ team: [] });
  }
});

app.post('/make-server-b9482a76/api/team', async (c) => {
  try {
    const body = await c.req.json();
    const { name, role, image, bio, social } = body;

    const { data, error } = await supabaseAdmin
      .from('team_members_b9482a76')
      .insert([{
        name,
        role,
        image,
        bio,
        social,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, member: data });
  } catch (error) {
    console.error('Error creating team member:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-b9482a76/api/team/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { name, role, image, bio, social } = body;

    const { data, error } = await supabaseAdmin
      .from('team_members_b9482a76')
      .update({ name, role, image, bio, social })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, member: data });
  } catch (error) {
    console.error('Error updating team member:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-b9482a76/api/team/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { error } = await supabaseAdmin
      .from('team_members_b9482a76')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= PROJECTS =============
app.get('/make-server-b9482a76/api/projects', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('projects_b9482a76')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ projects: data || [] });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return c.json({ projects: [] });
  }
});

app.post('/make-server-b9482a76/api/projects', async (c) => {
  try {
    const body = await c.req.json();
    const { title, category, tags, image, challenge, solution, outcome, technologies } = body;

    const { data, error } = await supabaseAdmin
      .from('projects_b9482a76')
      .insert([{
        title,
        category,
        tags,
        image,
        challenge,
        solution,
        outcome,
        technologies,
        published: true,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, project: data });
  } catch (error) {
    console.error('Error creating project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-b9482a76/api/projects/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { title, category, tags, image, challenge, solution, outcome, technologies, published } = body;

    const { data, error } = await supabaseAdmin
      .from('projects_b9482a76')
      .update({ title, category, tags, image, challenge, solution, outcome, technologies, published })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, project: data });
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-b9482a76/api/projects/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { error } = await supabaseAdmin
      .from('projects_b9482a76')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= CLIENT LOGOS =============
app.get('/make-server-b9482a76/api/logos', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('client_logos_b9482a76')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return c.json({ logos: data || [] });
  } catch (error) {
    console.error('Error fetching logos:', error);
    return c.json({ logos: [] });
  }
});

app.post('/make-server-b9482a76/api/logos', async (c) => {
  try {
    const body = await c.req.json();
    const { name, image } = body;

    const { data, error } = await supabaseAdmin
      .from('client_logos_b9482a76')
      .insert([{
        name,
        image,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, logo: data });
  } catch (error) {
    console.error('Error creating logo:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-b9482a76/api/logos/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { error } = await supabaseAdmin
      .from('client_logos_b9482a76')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting logo:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= CLIENT AUTHENTICATION & OTP =============
app.post('/make-server-b9482a76/api/auth/register', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, company } = body;

    // Check if user exists
    const { data: existing } = await supabaseAdmin
      .from('clients_b9482a76')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return c.json({ success: false, error: 'Email already registered' }, 400);
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: { name, company }
    });

    if (authError) throw authError;

    // Store client info in database
    const { data, error } = await supabaseAdmin
      .from('clients_b9482a76')
      .insert([{
        id: authData.user.id,
        email,
        name,
        company,
        otp,
        otp_expiry: otpExpiry,
        verified: false,
        active: true,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Send OTP email
    await sendEmail(
      email,
      'Welcome to The Development Studio - Verify Your Account',
      `
        <h2>Welcome ${name}!</h2>
        <p>Your OTP for account verification is:</p>
        <h1 style="color: #FF6600; font-size: 32px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't register for an account, please ignore this email.</p>
        <br>
        <p>Best regards,<br>The Development Studio</p>
      `
    );

    return c.json({ 
      success: true, 
      message: 'Registration successful. Please check your email for OTP.',
      requiresOTP: true
    });
  } catch (error) {
    console.error('Error during registration:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-b9482a76/api/auth/verify-otp', async (c) => {
  try {
    const body = await c.req.json();
    const { email, otp } = body;

    const { data, error } = await supabaseAdmin
      .from('clients_b9482a76')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return c.json({ success: false, error: 'User not found' }, 404);
    }

    // Check if OTP matches and hasn't expired
    if (data.otp !== otp) {
      return c.json({ success: false, error: 'Invalid OTP' }, 400);
    }

    if (new Date(data.otp_expiry) < new Date()) {
      return c.json({ success: false, error: 'OTP has expired' }, 400);
    }

    // Mark user as verified
    const { error: updateError } = await supabaseAdmin
      .from('clients_b9482a76')
      .update({ 
        verified: true,
        otp: null,
        otp_expiry: null
      })
      .eq('email', email);

    if (updateError) throw updateError;

    return c.json({ success: true, message: 'Account verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-b9482a76/api/auth/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      return c.json({ success: false, error: 'Invalid credentials' }, 401);
    }

    // Get client data
    const { data: client, error: clientError } = await supabaseAdmin
      .from('clients_b9482a76')
      .select('*')
      .eq('email', email)
      .single();

    if (clientError || !client) {
      return c.json({ success: false, error: 'Client not found' }, 404);
    }

    if (!client.active) {
      return c.json({ success: false, error: 'Account is deactivated' }, 403);
    }

    // Generate login OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: updateError } = await supabaseAdmin
      .from('clients_b9482a76')
      .update({ otp, otp_expiry: otpExpiry })
      .eq('email', email);

    if (updateError) throw updateError;

    // Send OTP email
    await sendEmail(
      email,
      'Login OTP - The Development Studio',
      `
        <h2>Login Verification</h2>
        <p>Your OTP for login is:</p>
        <h1 style="color: #FF6600; font-size: 32px;">${otp}</h1>
        <p>This OTP will expire in 10 minutes.</p>
        <p>If you didn't attempt to login, please contact us immediately.</p>
        <br>
        <p>Best regards,<br>The Development Studio</p>
      `
    );

    return c.json({ 
      success: true, 
      message: 'OTP sent to your email',
      requiresOTP: true,
      accessToken: authData.session?.access_token
    });
  } catch (error) {
    console.error('Error during login:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= CONTACT FORMS =============
app.post('/make-server-b9482a76/api/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, company, service, message, formType } = body;

    const { data, error } = await supabaseAdmin
      .from('contact_forms_b9482a76')
      .insert([{
        name,
        email,
        phone,
        company,
        service,
        message,
        form_type: formType || 'general',
        status: 'new',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Send notification email to admin
    await sendEmail(
      'info@devstudioco.com',
      `New ${formType || 'Contact'} Form Submission`,
      `
        <h2>New Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    );

    // Send confirmation email to user
    await sendEmail(
      email,
      'Thank you for contacting The Development Studio',
      `
        <h2>Thank you, ${name}!</h2>
        <p>We've received your message and will get back to you within 24 hours.</p>
        <p>Our team is reviewing your inquiry and will reach out soon.</p>
        <br>
        <p>Best regards,<br>The Development Studio Team</p>
        <p>Phone: +91 84380 28227, +91 84895 51887</p>
        <p>Email: info@devstudioco.com</p>
      `
    );

    return c.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= NEWSLETTER =============
app.post('/make-server-b9482a76/api/newsletter/subscribe', async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;

    // Check if already subscribed
    const { data: existing } = await supabaseAdmin
      .from('newsletter_subscribers_b9482a76')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      return c.json({ success: false, error: 'Email already subscribed' }, 400);
    }

    const { data, error } = await supabaseAdmin
      .from('newsletter_subscribers_b9482a76')
      .insert([{
        email,
        subscribed: true,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Send welcome email
    await sendEmail(
      email,
      'Welcome to The Development Studio Newsletter',
      `
        <h2>Thank you for subscribing!</h2>
        <p>You're now part of The Development Studio community.</p>
        <p>We'll keep you updated with our latest insights, services, and industry news.</p>
        <br>
        <p>Best regards,<br>The Development Studio</p>
      `
    );

    return c.json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= ADMIN - Get all clients =============
app.get('/make-server-b9482a76/api/admin/clients', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('clients_b9482a76')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ clients: data || [] });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return c.json({ clients: [] });
  }
});

// ============= ADMIN - Toggle client status =============
app.put('/make-server-b9482a76/api/admin/clients/:id/toggle', async (c) => {
  try {
    const id = c.req.param('id');
    
    const { data: client } = await supabaseAdmin
      .from('clients_b9482a76')
      .select('active')
      .eq('id', id)
      .single();

    if (!client) {
      return c.json({ success: false, error: 'Client not found' }, 404);
    }

    const { data, error } = await supabaseAdmin
      .from('clients_b9482a76')
      .update({ active: !client.active })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, client: data });
  } catch (error) {
    console.error('Error toggling client status:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= JOBS =============
app.get('/make-server-b9482a76/api/jobs', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('jobs_b9482a76')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ jobs: data || [] });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return c.json({ jobs: [] });
  }
});

app.post('/make-server-b9482a76/api/jobs', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      title, 
      department, 
      location, 
      type, 
      experience, 
      salary_range,
      description, 
      responsibilities, 
      requirements, 
      benefits,
      active 
    } = body;

    const { data, error } = await supabaseAdmin
      .from('jobs_b9482a76')
      .insert([{
        title,
        department,
        location,
        type,
        experience,
        salary_range,
        description,
        responsibilities,
        requirements,
        benefits,
        active: active !== undefined ? active : true,
        posted_date: new Date().toISOString(),
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, job: data });
  } catch (error) {
    console.error('Error creating job:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-b9482a76/api/jobs/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { 
      title, 
      department, 
      location, 
      type, 
      experience, 
      salary_range,
      description, 
      responsibilities, 
      requirements, 
      benefits,
      active 
    } = body;

    const { data, error } = await supabaseAdmin
      .from('jobs_b9482a76')
      .update({ 
        title, 
        department, 
        location, 
        type, 
        experience, 
        salary_range,
        description, 
        responsibilities, 
        requirements, 
        benefits,
        active 
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, job: data });
  } catch (error) {
    console.error('Error updating job:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-b9482a76/api/jobs/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { error } = await supabaseAdmin
      .from('jobs_b9482a76')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= JOB APPLICATIONS =============
app.get('/make-server-b9482a76/api/job-applications', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('job_applications_b9482a76')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ applications: data || [] });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return c.json({ applications: [] });
  }
});

app.post('/make-server-b9482a76/api/job-applications', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      job_id,
      job_title,
      name,
      email,
      phone,
      location,
      experience,
      linkedin_url,
      portfolio_url,
      cover_letter,
      resume_url
    } = body;

    const { data, error } = await supabaseAdmin
      .from('job_applications_b9482a76')
      .insert([{
        job_id,
        job_title,
        name,
        email,
        phone,
        location,
        experience,
        linkedin_url,
        portfolio_url,
        cover_letter,
        resume_url,
        status: 'new',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Send notification email to admin
    await sendEmail(
      'info@devstudioco.com',
      `New Job Application: ${job_title}`,
      `
        <h2>New Job Application Received</h2>
        <p><strong>Position:</strong> ${job_title}</p>
        <p><strong>Applicant:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Experience:</strong> ${experience}</p>
        ${linkedin_url ? `<p><strong>LinkedIn:</strong> ${linkedin_url}</p>` : ''}
        ${portfolio_url ? `<p><strong>Portfolio:</strong> ${portfolio_url}</p>` : ''}
        <p><strong>Cover Letter:</strong></p>
        <p>${cover_letter}</p>
      `
    );

    // Send confirmation email to applicant
    await sendEmail(
      email,
      `Application Received - ${job_title}`,
      `
        <h2>Thank you for your application, ${name}!</h2>
        <p>We've received your application for the <strong>${job_title}</strong> position.</p>
        <p>Our hiring team will review your application and get back to you within 5-7 business days.</p>
        <p>In the meantime, feel free to explore more about us at our website.</p>
        <br>
        <p>Best regards,<br>The Development Studio HR Team</p>
        <p>Email: info@devstudioco.com</p>
        <p>Phone: +91 84380 28227</p>
      `
    );

    return c.json({ success: true, application: data });
  } catch (error) {
    console.error('Error submitting job application:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-b9482a76/api/job-applications/:id/status', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    const { data, error } = await supabaseAdmin
      .from('job_applications_b9482a76')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, application: data });
  } catch (error) {
    console.error('Error updating application status:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.delete('/make-server-b9482a76/api/job-applications/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const { error } = await supabaseAdmin
      .from('job_applications_b9482a76')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return c.json({ success: true });
  } catch (error) {
    console.error('Error deleting application:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= CLIENT PORTAL - PROJECTS =============
app.get('/make-server-b9482a76/api/client/projects', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user?.id || error) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { data, error: fetchError } = await supabaseAdmin
      .from('client_projects_b9482a76')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    return c.json({ projects: data || [] });
  } catch (error) {
    console.error('Error fetching client projects:', error);
    return c.json({ projects: [] });
  }
});

app.get('/make-server-b9482a76/api/client/projects/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    const id = c.req.param('id');

    if (!user?.id || error) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { data, error: fetchError } = await supabaseAdmin
      .from('client_projects_b9482a76')
      .select('*')
      .eq('id', id)
      .eq('client_id', user.id)
      .single();

    if (fetchError) throw fetchError;

    return c.json({ project: data });
  } catch (error) {
    console.error('Error fetching project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= CLIENT PORTAL - FILES =============
app.get('/make-server-b9482a76/api/client/files', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user?.id || error) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { data, error: fetchError } = await supabaseAdmin
      .from('client_files_b9482a76')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    return c.json({ files: data || [] });
  } catch (error) {
    console.error('Error fetching client files:', error);
    return c.json({ files: [] });
  }
});

// ============= CLIENT PORTAL - MESSAGES =============
app.get('/make-server-b9482a76/api/client/messages', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user?.id || error) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const { data, error: fetchError } = await supabaseAdmin
      .from('client_messages_b9482a76')
      .select('*')
      .eq('client_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    return c.json({ messages: data || [] });
  } catch (error) {
    console.error('Error fetching client messages:', error);
    return c.json({ messages: [] });
  }
});

app.post('/make-server-b9482a76/api/client/messages', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);

    if (!user?.id || error) {
      return c.json({ success: false, error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { message, project_id } = body;

    const { data, error: insertError } = await supabaseAdmin
      .from('client_messages_b9482a76')
      .insert([{
        client_id: user.id,
        project_id,
        message,
        sender: 'client',
        read: false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (insertError) throw insertError;

    // Notify admin
    await sendEmail(
      'info@devstudioco.com',
      'New Message from Client',
      `
        <h2>New Message from Client</h2>
        <p><strong>Project ID:</strong> ${project_id}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p>Please respond via the Admin Panel.</p>
      `
    );

    return c.json({ success: true, message: data });
  } catch (error) {
    console.error('Error sending client message:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

// ============= ADMIN - CLIENT MANAGEMENT =============
app.post('/make-server-b9482a76/api/admin/projects', async (c) => {
  try {
    const body = await c.req.json();
    const { client_id, name, description, status, progress, due_date, phase } = body;

    const { data, error } = await supabaseAdmin
      .from('client_projects_b9482a76')
      .insert([{
        client_id,
        name,
        description,
        status: status || 'planning',
        progress: progress || 0,
        due_date,
        phase: phase || 'Initiation',
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, project: data });
  } catch (error) {
    console.error('Error creating project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.put('/make-server-b9482a76/api/admin/projects/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();

    const { data, error } = await supabaseAdmin
      .from('client_projects_b9482a76')
      .update(body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, project: data });
  } catch (error) {
    console.error('Error updating project:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-b9482a76/api/admin/files', async (c) => {
  try {
    const body = await c.req.json();
    const { client_id, project_id, name, file_url, file_size, file_type } = body;

    const { data, error } = await supabaseAdmin
      .from('client_files_b9482a76')
      .insert([{
        client_id,
        project_id,
        name,
        file_url,
        file_size,
        file_type,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    return c.json({ success: true, file: data });
  } catch (error) {
    console.error('Error uploading file:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.post('/make-server-b9482a76/api/admin/messages', async (c) => {
  try {
    const body = await c.req.json();
    const { client_id, project_id, message } = body;

    const { data, error } = await supabaseAdmin
      .from('client_messages_b9482a76')
      .insert([{
        client_id,
        project_id,
        message,
        sender: 'admin',
        read: false,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) throw error;

    // Get client email
    const { data: client } = await supabaseAdmin
      .from('clients_b9482a76')
      .select('email, name')
      .eq('id', client_id)
      .single();

    if (client) {
      await sendEmail(
        client.email,
        'New Message from The Development Studio',
        `
          <h2>Hello ${client.name}!</h2>
          <p>You have a new message from our team:</p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #FF6600; margin: 20px 0;">
            ${message}
          </div>
          <p>Please login to your client portal to view and respond.</p>
          <br>
          <p>Best regards,<br>The Development Studio Team</p>
        `
      );
    }

    return c.json({ success: true, message: data });
  } catch (error) {
    console.error('Error sending admin message:', error);
    return c.json({ success: false, error: String(error) }, 500);
  }
});

app.get('/make-server-b9482a76/api/admin/all-messages', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('client_messages_b9482a76')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ messages: data || [] });
  } catch (error) {
    console.error('Error fetching all messages:', error);
    return c.json({ messages: [] });
  }
});

app.get('/make-server-b9482a76/api/admin/all-projects', async (c) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('client_projects_b9482a76')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ projects: data || [] });
  } catch (error) {
    console.error('Error fetching all projects:', error);
    return c.json({ projects: [] });
  }
});

// Health check
app.get('/make-server-b9482a76/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);
