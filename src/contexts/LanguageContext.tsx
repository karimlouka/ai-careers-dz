import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations = {
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.howItWorks': 'كيف يعمل',
    'nav.contact': 'اتصل بنا',
    'nav.login': 'تسجيل الدخول',
    'nav.signup': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',

    // Hero Section
    'hero.title': 'اعثر على وظيفة أحلامك في الجزائر',
    'hero.subtitle': 'منصة ذكية تربط الباحثين عن عمل بالشركات باستخدام الذكاء الاصطناعي لتحليل السيرة الذاتية والمطابقة الذكية',
    'hero.cta.seeker': 'أبحث عن عمل',
    'hero.cta.company': 'أبحث عن موظفين',
    'hero.stats.jobs': 'وظيفة متاحة',
    'hero.stats.companies': 'شركة مسجلة',
    'hero.stats.seekers': 'باحث عن عمل',
    'hero.stats.matches': 'مطابقة ناجحة',

    // Features Section
    'features.title': 'لماذا تختارنا؟',
    'features.subtitle': 'نقدم أفضل تجربة للبحث عن عمل في الجزائر',
    'features.ai.title': 'تحليل ذكي بالـ AI',
    'features.ai.desc': 'نحلل سيرتك الذاتية باستخدام الذكاء الاصطناعي لمطابقتك مع الوظائف المناسبة',
    'features.match.title': 'مطابقة دقيقة',
    'features.match.desc': 'خوارزمية متقدمة تضمن توافق مهاراتك مع متطلبات الوظيفة',
    'features.local.title': 'مخصص للجزائر',
    'features.local.desc': 'نفهم سوق العمل الجزائري ونوفر فرص في جميع الولايات',
    'features.bilingual.title': 'دعم ثنائي اللغة',
    'features.bilingual.desc': 'منصة متاحة بالعربية والفرنسية لخدمة جميع الجزائريين',

    // How It Works
    'howItWorks.title': 'كيف يعمل؟',
    'howItWorks.subtitle': 'خطوات بسيطة للوصول إلى وظيفتك المثالية',
    'howItWorks.step1.title': 'أنشئ حسابك',
    'howItWorks.step1.desc': 'سجل كباحث عن عمل أو كشركة في دقائق',
    'howItWorks.step2.title': 'أكمل ملفك',
    'howItWorks.step2.desc': 'ارفع سيرتك الذاتية وأضف مهاراتك وخبراتك',
    'howItWorks.step3.title': 'احصل على مطابقات',
    'howItWorks.step3.desc': 'نظامنا الذكي يجد لك الفرص المناسبة تلقائياً',
    'howItWorks.step4.title': 'تواصل وانجح',
    'howItWorks.step4.desc': 'تواصل مع الشركات وابدأ مسيرتك المهنية',

    // CTA Section
    'cta.title': 'ابدأ رحلتك المهنية اليوم',
    'cta.subtitle': 'انضم إلى آلاف الجزائريين الذين وجدوا وظائفهم معنا',
    'cta.button': 'سجل مجاناً الآن',

    // Footer
    'footer.description': 'منصة جزائرية لربط الباحثين عن عمل بالشركات',
    'footer.links': 'روابط سريعة',
    'footer.contact': 'تواصل معنا',
    'footer.rights': 'جميع الحقوق محفوظة',

    // Auth Page
    'auth.welcome': 'مرحباً بك',
    'auth.loginTitle': 'تسجيل الدخول',
    'auth.signupTitle': 'إنشاء حساب جديد',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.fullName': 'الاسم الكامل',
    'auth.loginButton': 'دخول',
    'auth.signupButton': 'إنشاء حساب',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب بالفعل؟',
    'auth.selectRole': 'اختر نوع حسابك',
    'auth.roleSeeker': 'باحث عن عمل',
    'auth.roleSeekerDesc': 'أبحث عن فرص عمل مناسبة لمهاراتي',
    'auth.roleCompany': 'شركة',
    'auth.roleCompanyDesc': 'أبحث عن موظفين موهوبين لفريقي',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',

    // Dashboard Common
    'dashboard.welcome': 'مرحباً',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.settings': 'الإعدادات',
    'dashboard.profile': 'الملف الشخصي',
    'dashboard.notifications': 'الإشعارات',

    // Job Seeker Dashboard
    'seeker.dashboard': 'لوحة تحكم الباحث',
    'seeker.myProfile': 'ملفي الشخصي',
    'seeker.myCV': 'سيرتي الذاتية',
    'seeker.skills': 'المهارات',
    'seeker.applications': 'طلباتي',
    'seeker.matches': 'الوظائف المقترحة',
    'seeker.savedJobs': 'الوظائف المحفوظة',
    'seeker.uploadCV': 'رفع السيرة الذاتية',
    'seeker.profileComplete': 'اكتمال الملف',

    // Company Dashboard
    'company.dashboard': 'لوحة تحكم الشركة',
    'company.postJob': 'نشر وظيفة',
    'company.myJobs': 'وظائفي',
    'company.candidates': 'المرشحين',
    'company.analytics': 'التحليلات',
    'company.companyProfile': 'ملف الشركة',

    // Admin Dashboard
    'admin.dashboard': 'لوحة تحكم المدير',
    'admin.users': 'المستخدمين',
    'admin.companies': 'الشركات',
    'admin.jobs': 'الوظائف',
    'admin.reports': 'التقارير',
    'admin.settings': 'إعدادات النظام',

    // Common
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.viewAll': 'عرض الكل',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.submit': 'إرسال',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.howItWorks': 'Comment ça marche',
    'nav.contact': 'Contact',
    'nav.login': 'Connexion',
    'nav.signup': 'Inscription',
    'nav.dashboard': 'Tableau de bord',
    'nav.logout': 'Déconnexion',

    // Hero Section
    'hero.title': 'Trouvez votre emploi de rêve en Algérie',
    'hero.subtitle': 'Plateforme intelligente qui connecte les chercheurs d\'emploi aux entreprises grâce à l\'IA pour l\'analyse de CV et la correspondance intelligente',
    'hero.cta.seeker': 'Je cherche un emploi',
    'hero.cta.company': 'Je recrute',
    'hero.stats.jobs': 'Offres disponibles',
    'hero.stats.companies': 'Entreprises inscrites',
    'hero.stats.seekers': 'Chercheurs d\'emploi',
    'hero.stats.matches': 'Correspondances réussies',

    // Features Section
    'features.title': 'Pourquoi nous choisir ?',
    'features.subtitle': 'Nous offrons la meilleure expérience de recherche d\'emploi en Algérie',
    'features.ai.title': 'Analyse IA intelligente',
    'features.ai.desc': 'Nous analysons votre CV avec l\'IA pour vous faire correspondre aux emplois appropriés',
    'features.match.title': 'Correspondance précise',
    'features.match.desc': 'Algorithme avancé qui garantit que vos compétences correspondent aux exigences du poste',
    'features.local.title': 'Conçu pour l\'Algérie',
    'features.local.desc': 'Nous comprenons le marché du travail algérien et offrons des opportunités dans toutes les wilayas',
    'features.bilingual.title': 'Support bilingue',
    'features.bilingual.desc': 'Plateforme disponible en arabe et français pour servir tous les Algériens',

    // How It Works
    'howItWorks.title': 'Comment ça marche ?',
    'howItWorks.subtitle': 'Étapes simples pour trouver votre emploi idéal',
    'howItWorks.step1.title': 'Créez votre compte',
    'howItWorks.step1.desc': 'Inscrivez-vous en tant que chercheur d\'emploi ou entreprise en quelques minutes',
    'howItWorks.step2.title': 'Complétez votre profil',
    'howItWorks.step2.desc': 'Téléchargez votre CV et ajoutez vos compétences et expériences',
    'howItWorks.step3.title': 'Obtenez des correspondances',
    'howItWorks.step3.desc': 'Notre système intelligent trouve automatiquement les opportunités adaptées',
    'howItWorks.step4.title': 'Connectez et réussissez',
    'howItWorks.step4.desc': 'Connectez-vous avec les entreprises et lancez votre carrière',

    // CTA Section
    'cta.title': 'Commencez votre parcours professionnel aujourd\'hui',
    'cta.subtitle': 'Rejoignez des milliers d\'Algériens qui ont trouvé leur emploi avec nous',
    'cta.button': 'Inscrivez-vous gratuitement',

    // Footer
    'footer.description': 'Plateforme algérienne connectant les chercheurs d\'emploi aux entreprises',
    'footer.links': 'Liens rapides',
    'footer.contact': 'Contactez-nous',
    'footer.rights': 'Tous droits réservés',

    // Auth Page
    'auth.welcome': 'Bienvenue',
    'auth.loginTitle': 'Connexion',
    'auth.signupTitle': 'Créer un compte',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.fullName': 'Nom complet',
    'auth.loginButton': 'Se connecter',
    'auth.signupButton': 'S\'inscrire',
    'auth.noAccount': 'Pas de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    'auth.selectRole': 'Choisissez votre type de compte',
    'auth.roleSeeker': 'Chercheur d\'emploi',
    'auth.roleSeekerDesc': 'Je cherche des opportunités adaptées à mes compétences',
    'auth.roleCompany': 'Entreprise',
    'auth.roleCompanyDesc': 'Je cherche des talents pour mon équipe',
    'auth.forgotPassword': 'Mot de passe oublié ?',

    // Dashboard Common
    'dashboard.welcome': 'Bienvenue',
    'dashboard.overview': 'Aperçu',
    'dashboard.settings': 'Paramètres',
    'dashboard.profile': 'Profil',
    'dashboard.notifications': 'Notifications',

    // Job Seeker Dashboard
    'seeker.dashboard': 'Tableau de bord chercheur',
    'seeker.myProfile': 'Mon profil',
    'seeker.myCV': 'Mon CV',
    'seeker.skills': 'Compétences',
    'seeker.applications': 'Mes candidatures',
    'seeker.matches': 'Emplois suggérés',
    'seeker.savedJobs': 'Emplois sauvegardés',
    'seeker.uploadCV': 'Télécharger CV',
    'seeker.profileComplete': 'Profil complété',

    // Company Dashboard
    'company.dashboard': 'Tableau de bord entreprise',
    'company.postJob': 'Publier une offre',
    'company.myJobs': 'Mes offres',
    'company.candidates': 'Candidats',
    'company.analytics': 'Analytiques',
    'company.companyProfile': 'Profil entreprise',

    // Admin Dashboard
    'admin.dashboard': 'Tableau de bord admin',
    'admin.users': 'Utilisateurs',
    'admin.companies': 'Entreprises',
    'admin.jobs': 'Emplois',
    'admin.reports': 'Rapports',
    'admin.settings': 'Paramètres système',

    // Common
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.viewAll': 'Voir tout',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.submit': 'Soumettre',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('wadhifa-lang');
    return (saved as Language) || 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('wadhifa-lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = language;
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
