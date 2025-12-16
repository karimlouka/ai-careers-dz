import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  variant?: 'default' | 'glass';
}

export function LanguageToggle({ variant = 'default' }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'fr' : 'ar');
  };

  return (
    <Button
      variant={variant === 'glass' ? 'glass' : 'ghost'}
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
    >
      <Globe className="h-4 w-4" />
      <span className="font-semibold">
        {language === 'ar' ? 'FR' : 'عربي'}
      </span>
    </Button>
  );
}
