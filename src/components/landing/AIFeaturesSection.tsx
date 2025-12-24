import { useLanguage } from '@/contexts/LanguageContext';
import { CompatibilityScore } from '@/components/ai/CompatibilityScore';
import { DocumentVerification } from '@/components/ai/DocumentVerification';
import { AIInterviewChat } from '@/components/ai/AIInterviewChat';
import { Brain, Shield, MessageSquare, Sparkles } from 'lucide-react';

export function AIFeaturesSection() {
  const { t, dir } = useLanguage();

  return (
    <section id="ai-features" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">{t('hero.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('ai.matchmaker.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('ai.matchmaker.subtitle')}
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Compatibility Score */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground">{t('features.match.title')}</h3>
            </div>
            <CompatibilityScore score={85} jobTitle="Software Developer" />
            <CompatibilityScore score={62} jobTitle="Project Manager" showDetails={false} />
          </div>

          {/* Document Verification */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">{t('features.verification.title')}</h3>
            </div>
            <DocumentVerification />
          </div>

          {/* AI Interview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-foreground">{t('features.interview.title')}</h3>
            </div>
            <AIInterviewChat jobTitle="Full Stack Developer" />
          </div>
        </div>
      </div>
    </section>
  );
}
