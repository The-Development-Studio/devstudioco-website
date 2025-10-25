import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '../assets/logo.svg'; // <-- Import your logo

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const services = [
    { name: 'Web Design & Development', page: 'service-0' },
    { name: 'Custom Software Solutions', page: 'service-1' },
    { name: 'Mobile Applications', page: 'service-2' },
    { name: 'E-Commerce Solutions', page: 'service-3' },
    { name: 'Cyber Security', page: 'service-4' },
    { name: 'Graphical Designing', page: 'service-5' }
  ];

  const quickLinks = [
    { name: 'About Us', page: 'about' },
    { name: 'Our Works', page: 'works' },
    { name: 'Blog', page: 'blog' },
    { name: 'Support', page: 'support' },
    { name: 'Contact', page: 'contact' },
    { name: 'Admin Panel', page: 'admin' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={Logo} alt="The Development Studio" className="w-10 h-10 object-contain" />
              <div>
                <div className="font-bold">The Development Studio</div>
                <div className="text-xs text-muted-foreground">a Digital Solution Company</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Crafting Dreams into Designs: Your Vision, Our Artistry
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.page}>
                  <button
                    onClick={() => onNavigate(service.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Nagapattinam, Tamil Nadu, India 609504</span>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+918438028227" className="hover:text-primary transition-colors">+91 84380 28227</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+918489551887" className="hover:text-primary transition-colors">+91 84895 51887</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:info@devstudioco.com" className="hover:text-primary transition-colors">info@devstudioco.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:supports@devstudioco.com" className="hover:text-primary transition-colors">supports@devstudioco.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 The Development Studio. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <button onClick={() => onNavigate('privacy-policy')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('terms-conditions')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms & Conditions
            </button>
            <button onClick={() => onNavigate('refund-policy')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Refund Policy
            </button>
            <button onClick={() => onNavigate('cookies-policy')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
