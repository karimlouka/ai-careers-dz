import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bot, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';

interface Message {
  id: string;
  role: 'bot' | 'user';
  content: string;
}

interface AIInterviewChatProps {
  jobTitle?: string;
  onComplete?: (passed: boolean, feedback: any) => void;
}

const sampleQuestions = {
  ar: [
    'مرحباً! أنا مساعدك الذكي لإجراء المقابلة. هل يمكنك أن تخبرني عن نفسك؟',
    'ما هي خبرتك السابقة في هذا المجال؟',
    'كيف تتعامل مع ضغوط العمل؟',
    'ما هي نقاط قوتك الرئيسية؟',
    'لماذا تريد العمل في هذه الوظيفة؟',
  ],
  fr: [
    'Bonjour! Je suis votre assistant intelligent pour l\'entretien. Pouvez-vous me parler de vous?',
    'Quelle est votre expérience dans ce domaine?',
    'Comment gérez-vous le stress au travail?',
    'Quels sont vos principaux points forts?',
    'Pourquoi voulez-vous ce poste?',
  ],
  en: [
    'Hello! I\'m your AI assistant for this interview. Can you tell me about yourself?',
    'What is your previous experience in this field?',
    'How do you handle work pressure?',
    'What are your main strengths?',
    'Why do you want this job?',
  ],
};

const missingSkillsData = {
  ar: [
    'مهارات التواصل الفعال',
    'إدارة الوقت',
    'العمل الجماعي',
    'حل المشكلات',
  ],
  fr: [
    'Communication efficace',
    'Gestion du temps',
    'Travail d\'équipe',
    'Résolution de problèmes',
  ],
  en: [
    'Effective communication',
    'Time management',
    'Teamwork',
    'Problem solving',
  ],
};

const adviceData = {
  ar: [
    'احصل على شهادة في مجال تخصصك',
    'طور مهاراتك اللغوية',
    'شارك في مشاريع تطوعية لاكتساب الخبرة',
    'تابع الدورات التدريبية عبر الإنترنت',
  ],
  fr: [
    'Obtenez une certification dans votre domaine',
    'Développez vos compétences linguistiques',
    'Participez à des projets bénévoles',
    'Suivez des formations en ligne',
  ],
  en: [
    'Get certified in your field',
    'Develop your language skills',
    'Participate in volunteer projects',
    'Take online training courses',
  ],
};

export function AIInterviewChat({ jobTitle, onComplete }: AIInterviewChatProps) {
  const { t, language, dir } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [passed, setPassed] = useState<boolean | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = sampleQuestions[language as keyof typeof sampleQuestions] || sampleQuestions.en;
  const missingSkills = missingSkillsData[language as keyof typeof missingSkillsData] || missingSkillsData.en;
  const advice = adviceData[language as keyof typeof adviceData] || adviceData.en;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startInterview = () => {
    setMessages([
      {
        id: '1',
        role: 'bot',
        content: questions[0],
      },
    ]);
    setCurrentQuestion(0);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < questions.length) {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: questions[nextQuestion],
      };
      setMessages(prev => [...prev, botMessage]);
      setCurrentQuestion(nextQuestion);
    } else {
      // Interview complete - determine result
      const hasPassed = Math.random() > 0.4; // Simulated result
      setPassed(hasPassed);
      setIsComplete(true);
      onComplete?.(hasPassed, { missingSkills, advice });
    }
  };

  if (messages.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-card border border-border text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center mx-auto mb-6">
          <Bot className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">{t('ai.interview.title')}</h3>
        <p className="text-muted-foreground mb-6">{t('ai.interview.subtitle')}</p>
        {jobTitle && (
          <p className="text-sm text-primary mb-6">{jobTitle}</p>
        )}
        <Button onClick={startInterview} size="lg" className="gap-2">
          <MessageSquare className="w-4 h-4" />
          {t('ai.interview.start')}
        </Button>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="p-8 rounded-2xl bg-card border border-border">
        {/* Result Header */}
        <div className={`text-center p-6 rounded-xl mb-6 ${passed ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
          {passed ? (
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          )}
          <h3 className="text-xl font-bold text-foreground mb-2">
            {passed ? t('ai.interview.passed') : t('ai.interview.failed')}
          </h3>
          <p className="text-muted-foreground">
            {passed ? t('ai.interview.passedDesc') : t('ai.interview.failedDesc')}
          </p>
        </div>

        {/* Career Path Mapping (if failed) */}
        {!passed && (
          <div className="space-y-6">
            {/* Missing Skills */}
            <div className="p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                {t('ai.careerPath.missingSkills')}
              </h4>
              <ul className="space-y-2">
                {missingSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvement Advice */}
            <div className="p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                {t('ai.careerPath.advice')}
              </h4>
              <ul className="space-y-2">
                {advice.map((tip, index) => (
                  <li key={index} className="flex items-center gap-2 text-muted-foreground">
                    <ArrowRight className="w-3 h-3 text-accent flex-shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button 
          onClick={() => { setMessages([]); setIsComplete(false); setPassed(null); setCurrentQuestion(0); }}
          variant="outline"
          className="w-full mt-6"
        >
          {t('common.back')}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-[500px]">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-teal-600 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{t('ai.interview.title')}</h3>
          <p className="text-xs text-muted-foreground">
            {currentQuestion + 1} / {questions.length}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground p-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-100" />
                <span className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={t('common.submit')}
            className="flex-1"
            disabled={isTyping}
          />
          <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
