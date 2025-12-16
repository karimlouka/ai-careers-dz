import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Rocket } from 'lucide-react';

export function CTASection() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/20 backdrop-blur-sm mb-8">
            <Rocket className="w-8 h-8 text-accent" />
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>

          {/* Button */}
          <Button
            variant="heroAccent"
            size="xl"
            onClick={() => navigate('/auth?mode=signup')}
            className="min-w-[250px]"
          >
            {t('cta.button')}
            <Arrow className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
