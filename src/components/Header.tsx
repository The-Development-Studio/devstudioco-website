import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, LogIn, Sun, Moon } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../assets/logo.svg';

const services = [
  'Web Design & Development',
  'Custom Software Solutions',
  'Mobile Applications',
  'E-Commerce Solutions',
  'Cyber Security',
  'Graphical Designing'
];

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', page: 'home' },
    { name: 'About', page: 'about' },
    { name: 'Services', page: 'services', hasDropdown: true },
    { name: 'Works', page: 'works' },
    { name: 'Careers', page: 'careers' },
    { name: 'Support', page: 'support' },
    { name: 'Contact', page: 'contact' }
  ];

  // Dynamic text color based on scroll & theme
  const getTextColor = () => {
    if (isScrolled) return theme === 'light' ? 'text-black' : 'text-white';
    return 'text-white';
  };

  const getHoverColor = () => {
    return theme === 'light' ? 'hover:text-primary' : 'hover:text-primary/90';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? theme === 'light'
            ? 'bg-white shadow-lg'
            : 'bg-black/90 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img src={Logo} alt="The Development Studio" className="w-10 h-10 object-contain" />
            <div className="ml-2">
              <div className={`font-bold ${getTextColor()}`}>The Development Studio</div>
              <div className={`text-xs ${getTextColor()} text-opacity-70`}>a Digital Solution Company</div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 transition-colors ${getHoverColor()} ${getTextColor()}`}
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                    >
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          id="services-menu"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-xl border border-border p-2"
                        >
                          {services.map((service, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                onNavigate(`service-${idx}`);
                                setServicesOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 rounded-md hover:bg-accent transition-colors text-sm"
                            >
                              {service}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate(item.page)}
                    className={`transition-colors ${getHoverColor()} ${
                      currentPage === item.page ? 'text-primary' : getTextColor()
                    }`}
                  >
                    {item.name}
                  </button>
                )}
              </div>
            ))}
          </nav>

          {/* CTA & Client Portal */}
          <div className="hidden lg:flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-2 rounded-lg hover:bg-accent transition-colors ${getTextColor()}`}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>

            <Button
              variant="outline"
              onClick={() => onNavigate('client-portal')}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Client Portal
            </Button>
            <Button onClick={() => onNavigate('contact')} className="bg-primary hover:bg-primary/90">
              Start Your Project
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className={`w-6 h-6 ${getTextColor()}`} /> : <Menu className={`w-6 h-6 ${getTextColor()}`} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className={`flex items-center justify-between w-full py-2 ${getTextColor()}`}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {servicesOpen && (
                        <div className="pl-4 space-y-2">
                          {services.map((service, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                onNavigate(`service-${idx}`);
                                setMobileMenuOpen(false);
                              }}
                              className="block py-2 text-sm text-muted-foreground hover:text-primary"
                            >
                              {service}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        onNavigate(item.page);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left py-2 ${getTextColor()}`}
                    >
                      {item.name}
                    </button>
                  )}
                </div>
              ))}

              <div className="flex flex-col gap-3 pt-4">
                {/* Mobile Theme Toggle */}
                <Button variant="outline" onClick={toggleTheme} className={`flex items-center justify-center ${getTextColor()}`}>
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-4 h-4 mr-2" /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="w-4 h-4 mr-2" /> Light Mode
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    onNavigate('client-portal');
                    setMobileMenuOpen(false);
                  }}
                  className="border-primary text-primary hover:bg-primary hover:text-white"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Client Portal
                </Button>
                <Button
                  onClick={() => {
                    onNavigate('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-primary hover:bg-primary/90"
                >
                  Start Your Project
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
