import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.png';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export function Navbar() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/#features', label: t('nav.about') },
    { href: '/#how-it-works', label: t('nav.howItWorks') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
      dir={dir}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img 
              src={logo} 
              alt="AI Careers DZ" 
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors hover:text-primary ${
                  isScrolled ? 'text-foreground' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle variant={isScrolled ? 'default' : 'glass'} />
            {user ? (
              <>
                <Button
                  variant={isScrolled ? 'outline' : 'glass'}
                  onClick={() => navigate('/dashboard')}
                >
                  {t('nav.dashboard')}
                </Button>
                <Button
                  variant={isScrolled ? 'default' : 'heroAccent'}
                  onClick={handleLogout}
                >
                  {t('nav.logout')}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant={isScrolled ? 'outline' : 'glass'}
                  onClick={() => navigate('/auth?mode=login')}
                >
                  {t('nav.login')}
                </Button>
                <Button
                  variant={isScrolled ? 'default' : 'heroAccent'}
                  onClick={() => navigate('/auth?mode=signup')}
                >
                  {t('nav.signup')}
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-foreground' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b shadow-lg animate-fade-in-down">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-foreground font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <LanguageToggle />
                {user ? (
                  <>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      {t('nav.dashboard')}
                    </Button>
                    <Button onClick={handleLogout}>{t('nav.logout')}</Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => navigate('/auth?mode=login')}>
                      {t('nav.login')}
                    </Button>
                    <Button onClick={() => navigate('/auth?mode=signup')}>
                      {t('nav.signup')}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
