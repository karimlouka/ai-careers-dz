import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageToggle } from '@/components/LanguageToggle';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Briefcase, User, Building2, ArrowLeft, ArrowRight, Mail, Lock, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

type Role = 'seeker' | 'company' | null;

export default function Auth() {
  const { t, dir } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'signup');
  const [selectedRole, setSelectedRole] = useState<Role>(searchParams.get('role') as Role);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(dir === 'rtl' ? 'تم تسجيل الدخول بنجاح' : 'Connexion réussie');
        navigate('/');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { full_name: fullName, role: selectedRole }
          }
        });
        if (error) throw error;
        toast.success(dir === 'rtl' ? 'تم إنشاء الحساب بنجاح' : 'Compte créé avec succès');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir={dir} className="min-h-screen flex">
      {/* Left - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12 bg-background">
        <div className="max-w-md w-full mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">وظيفة</span>
            </Link>
            <LanguageToggle />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isLogin ? t('auth.loginTitle') : t('auth.signupTitle')}
          </h1>
          <p className="text-muted-foreground mb-8">{t('auth.welcome')}</p>

          {/* Role Selection (Signup only) */}
          {!isLogin && !selectedRole && (
            <div className="space-y-4 mb-8">
              <p className="font-medium text-foreground">{t('auth.selectRole')}</p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedRole('seeker')}
                  className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-secondary/50 transition-all text-center group"
                >
                  <User className="w-10 h-10 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">{t('auth.roleSeeker')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t('auth.roleSeekerDesc')}</p>
                </button>
                <button
                  onClick={() => setSelectedRole('company')}
                  className="p-6 rounded-xl border-2 border-border hover:border-primary hover:bg-secondary/50 transition-all text-center group"
                >
                  <Building2 className="w-10 h-10 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-foreground">{t('auth.roleCompany')}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{t('auth.roleCompanyDesc')}</p>
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          {(isLogin || selectedRole) && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('auth.fullName')}</Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10" required />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required />
                </div>
              </div>
              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? t('common.loading') : isLogin ? t('auth.loginButton') : t('auth.signupButton')}
                <Arrow className="w-4 h-4" />
              </Button>
            </form>
          )}

          {/* Toggle */}
          <p className="text-center mt-6 text-muted-foreground">
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}{' '}
            <button onClick={() => { setIsLogin(!isLogin); setSelectedRole(null); }} className="text-primary font-semibold hover:underline">
              {isLogin ? t('auth.signupButton') : t('auth.loginButton')}
            </button>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />
        <div className="text-center relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold text-white mb-4">{t('hero.title')}</h2>
          <p className="text-white/80 text-lg">{t('hero.subtitle')}</p>
        </div>
      </div>
    </div>
  );
}
