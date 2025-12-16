import { useLanguage } from '@/contexts/LanguageContext';
import { UserPlus, FileText, Sparkles, Handshake } from 'lucide-react';

export function HowItWorksSection() {
  const { t, dir } = useLanguage();

  const steps = [
    {
      icon: UserPlus,
      number: '01',
      title: t('howItWorks.step1.title'),
      description: t('howItWorks.step1.desc'),
    },
    {
      icon: FileText,
      number: '02',
      title: t('howItWorks.step2.title'),
      description: t('howItWorks.step2.desc'),
    },
    {
      icon: Sparkles,
      number: '03',
      title: t('howItWorks.step3.title'),
      description: t('howItWorks.step3.desc'),
    },
    {
      icon: Handshake,
      number: '04',
      title: t('howItWorks.step4.title'),
      description: t('howItWorks.step4.desc'),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-border hidden md:block" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-end' : 'md:text-start'}`}>
                  <div className="p-6 rounded-2xl bg-card border border-border shadow-sm card-hover">
                    <div className="flex items-center gap-4 mb-4" style={{ flexDirection: dir === 'rtl' ? 'row-reverse' : 'row' }}>
                      <span className="text-4xl font-bold text-primary/20">{step.number}</span>
                      <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
