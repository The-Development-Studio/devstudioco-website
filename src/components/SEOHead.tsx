import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

const defaultSEO = {
  title: 'The Development Studio | ISO-Certified Web, Mobile & Software Development Company',
  description: 'Leading ISO-certified software development company specializing in web design, mobile apps, custom software, e-commerce, cyber security & graphic design. 10+ years experience in Chennai, Tamil Nadu, India.',
  keywords: 'web development, mobile app development, custom software solutions, e-commerce development, cyber security services, graphic design, ISO certified company, software development company India, Chennai web development, Tamil Nadu software company, enterprise software, UI/UX design, full stack development, mobile application development, website design company, digital transformation, cloud solutions, API development, agile development, software consulting, IT services India',
  ogImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop',
  ogType: 'website',
  canonicalUrl: 'https://devstudioco.com'
};

export function SEOHead({
  title = defaultSEO.title,
  description = defaultSEO.description,
  keywords = defaultSEO.keywords,
  ogImage = defaultSEO.ogImage,
  ogType = defaultSEO.ogType,
  canonicalUrl = defaultSEO.canonicalUrl,
  noindex = false
}: SEOHeadProps) {
  
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, useProperty = false) => {
      const attribute = useProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'The Development Studio');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('theme-color', '#FF6600');
    
    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    }

    // Open Graph Meta Tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:site_name', 'The Development Studio', true);
    updateMetaTag('og:locale', 'en_US', true);

    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    updateMetaTag('twitter:site', '@devstudioco');
    updateMetaTag('twitter:creator', '@devstudioco');

    // Additional SEO Meta Tags
    updateMetaTag('application-name', 'The Development Studio');
    updateMetaTag('apple-mobile-web-app-title', 'Dev Studio');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    updateMetaTag('format-detection', 'telephone=no');
    updateMetaTag('mobile-web-app-capable', 'yes');

    // Geographic Tags
    updateMetaTag('geo.region', 'IN-TN');
    updateMetaTag('geo.placename', 'Nagapattinam, Tamil Nadu');
    updateMetaTag('geo.position', '10.7661;79.8425');
    updateMetaTag('ICBM', '10.7661, 79.8425');

    // Business Information
    updateMetaTag('organization', 'The Development Studio');
    updateMetaTag('contact', 'info@devstudioco.com');
    updateMetaTag('phone', '+91-8438028227');
    updateMetaTag('address', 'Nagapattinam, Tamil Nadu, India 609504');

    // Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'The Development Studio',
      'url': 'https://devstudioco.com',
      'logo': 'https://devstudioco.com/logo.png',
      'description': description,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Nagapattinam',
        'addressLocality': 'Nagapattinam',
        'addressRegion': 'Tamil Nadu',
        'postalCode': '609504',
        'addressCountry': 'IN'
      },
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'telephone': '+91-8438028227',
          'contactType': 'customer service',
          'email': 'info@devstudioco.com',
          'availableLanguage': ['English', 'Tamil', 'Hindi']
        },
        {
          '@type': 'ContactPoint',
          'telephone': '+91-8489551887',
          'contactType': 'technical support',
          'email': 'supports@devstudioco.com',
          'availableLanguage': ['English', 'Tamil']
        }
      ],
      'sameAs': [
        'https://www.linkedin.com/company/devstudioco',
        'https://twitter.com/devstudioco',
        'https://www.facebook.com/devstudioco',
        'https://github.com/devstudioco'
      ],
      'founder': {
        '@type': 'Person',
        'name': 'Somaskandhan M'
      },
      'numberOfEmployees': {
        '@type': 'QuantitativeValue',
        'value': 50
      },
      'areaServed': 'Worldwide',
      'slogan': 'Crafting Dreams into Designs: Your Vision, Our Artistry',
      'brand': 'The Development Studio'
    };

    let scriptTag = document.getElementById('structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, ogImage, ogType, canonicalUrl, noindex]);

  return null;
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'The Development Studio | ISO-Certified Web & Mobile App Development Company',
    description: 'Leading ISO-certified software development company in Chennai, India. Expert web development, mobile apps, custom software, e-commerce, cyber security & graphic design services. 10+ years experience.',
    keywords: 'web development company, mobile app development, custom software development, ISO certified, Chennai, Tamil Nadu, India, software company, IT services, digital transformation',
  },
  about: {
    title: 'About Us | ISO-Certified Development Team | The Development Studio',
    description: 'Learn about The Development Studio - ISO-certified software development company with 10+ years experience, 50+ team members, and 95% client satisfaction rate. Based in Chennai, India.',
    keywords: 'about development studio, ISO certified company, software development team, Chennai IT company, certified developers, experienced team',
  },
  services: {
    title: 'Our Services | Web, Mobile, Software Development | The Development Studio',
    description: 'Comprehensive software development services: Web Design & Development, Mobile Apps, Custom Software, E-Commerce Solutions, Cyber Security, and Graphic Design. ISO-certified quality.',
    keywords: 'web development services, mobile app development services, custom software solutions, e-commerce development, cyber security services, graphic design, UI/UX design',
  },
  works: {
    title: 'Our Portfolio | Successful Projects & Case Studies | The Development Studio',
    description: 'Explore our portfolio of successful web, mobile, and software development projects. Real case studies, client testimonials, and proven results from The Development Studio.',
    keywords: 'portfolio, case studies, web projects, mobile app projects, software development portfolio, client work, success stories',
  },
  careers: {
    title: 'Careers | Join Our Team | The Development Studio',
    description: 'Explore career opportunities at The Development Studio. Join our team of talented developers, designers, and innovators. Competitive salaries, great benefits, and growth opportunities.',
    keywords: 'careers, jobs, software developer jobs, web developer jobs, UI/UX designer jobs, Chennai jobs, IT jobs India, developer careers',
  },
  contact: {
    title: 'Contact Us | Get in Touch | The Development Studio',
    description: 'Contact The Development Studio for your software development needs. Email: info@devstudioco.com | Phone: +91-8438028227 | Located in Nagapattinam, Tamil Nadu, India.',
    keywords: 'contact, get in touch, software development inquiry, request quote, Chennai contact, India contact',
  },
  support: {
    title: 'Support Center | Help & Resources | The Development Studio',
    description: 'Access our comprehensive support center with FAQs, knowledge base, live chat, and ticketing system. 24/7 support for all your queries and technical issues.',
    keywords: 'support, help center, customer support, technical support, FAQs, knowledge base, live chat',
  },
  blog: {
    title: 'Blog | Tech Insights & Industry News | The Development Studio',
    description: 'Stay updated with latest technology trends, development insights, industry news, and expert tips from The Development Studio team. Technical articles and guides.',
    keywords: 'tech blog, development blog, software development articles, web development tips, mobile app insights, technology news',
  },
};
