import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Target, MapPin, Languages } from 'lucide-react';

export function FeaturesSection() {
  const { t, dir } = useLanguage();

  const features = [
    {
      icon: Brain,
      title: t('features.ai.title'),
      description: t('features.ai.desc'),
      gradient: 'from-primary to-teal-600',
    },
    {
      icon: Target,
      title: t('features.match.title'),
      description: t('features.match.desc'),
      gradient: 'from-accent to-orange-500',
    },
    {
      icon: MapPin,
      title: t('features.local.title'),
      description: t('features.local.desc'),
      gradient: 'from-emerald-500 to-green-600',
    },
    {
      icon: Languages,
      title: t('features.bilingual.title'),
      description: t('features.bilingual.desc'),
      gradient: 'from-blue-500 to-indigo-600',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-2xl bg-card border border-border card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
