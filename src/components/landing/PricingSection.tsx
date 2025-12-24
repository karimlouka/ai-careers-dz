import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Check, User, Building2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PricingSection() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();

  const seekerFeatures = [
    t('pricing.seeker.feature1'),
    t('pricing.seeker.feature2'),
    t('pricing.seeker.feature3'),
    t('pricing.seeker.feature4'),
    t('pricing.seeker.feature5'),
  ];

  const companyFeatures = [
    t('pricing.company.feature1'),
    t('pricing.company.feature2'),
    t('pricing.company.feature3'),
    t('pricing.company.feature4'),
    t('pricing.company.feature5'),
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('pricing.title')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Job Seeker Plan */}
          <div className="relative p-8 rounded-3xl bg-card border border-border shadow-lg hover:shadow-xl transition-all duration-300 group">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {t('pricing.seeker.title')}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-primary">
                {t('pricing.seeker.price')}
              </span>
              <span className="text-lg text-muted-foreground">
                {t('pricing.seeker.currency')}
              </span>
              <span className="text-muted-foreground">
                {t('pricing.seeker.period')}
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {seekerFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              onClick={() => navigate('/auth?mode=signup&role=seeker')}
              className="w-full"
              size="lg"
            >
              {t('pricing.seeker.cta')}
            </Button>
          </div>

          {/* Company Plan */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 group">
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <div className="px-4 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-semibold shadow-lg">
                {t('pricing.popular')}
              </div>
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Building2 className="w-8 h-8 text-accent-foreground" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-foreground mb-2">
              {t('pricing.company.title')}
            </h3>

            {/* Price */}
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-accent">
                {t('pricing.company.price')}
              </span>
              <span className="text-lg text-muted-foreground">
                {t('pricing.company.currency')}
              </span>
              <span className="text-muted-foreground">
                {t('pricing.company.period')}
              </span>
            </div>

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {companyFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              onClick={() => navigate('/auth?mode=signup&role=company')}
              variant="heroAccent"
              className="w-full"
              size="lg"
            >
              {t('pricing.company.cta')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
