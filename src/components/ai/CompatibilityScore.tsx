import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Sparkles } from 'lucide-react';

interface CompatibilityScoreProps {
  score: number;
  jobTitle?: string;
  showDetails?: boolean;
}

export function CompatibilityScore({ score, jobTitle, showDetails = true }: CompatibilityScoreProps) {
  const { t, dir } = useLanguage();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-accent';
    if (score >= 40) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-accent to-orange-500';
    if (score >= 40) return 'from-yellow-500 to-amber-600';
    return 'from-red-500 to-rose-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-accent';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getScoreBg(score)} flex items-center justify-center`}>
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{t('ai.matchmaker.score')}</h3>
          {jobTitle && <p className="text-sm text-muted-foreground">{jobTitle}</p>}
        </div>
      </div>

      {/* Score Display */}
      <div className="flex items-center justify-center my-6">
        <div className="relative w-32 h-32">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${score * 3.52} 352`}
              strokeLinecap="round"
              className={getScoreColor(score)}
            />
          </svg>
          {/* Score Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getScoreColor(score)}`}>{score}%</span>
            <Sparkles className={`w-4 h-4 ${getScoreColor(score)}`} />
          </div>
        </div>
      </div>

      {/* Progress Bar Alternative */}
      {showDetails && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('ai.matchmaker.subtitle')}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full ${getProgressColor(score)} rounded-full transition-all duration-1000`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
