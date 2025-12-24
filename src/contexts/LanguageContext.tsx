import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'fr' | 'en';

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
    'nav.pricing': 'الأسعار',

    // Hero Section
    'hero.title': 'اعثر على وظيفة أحلامك في الجزائر',
    'hero.subtitle': 'منصة ذكية تربط الباحثين عن عمل بالشركات باستخدام الذكاء الاصطناعي لتحليل السيرة الذاتية والمطابقة الذكية',
    'hero.cta.seeker': 'أبحث عن عمل',
    'hero.cta.company': 'أبحث عن موظفين',
    'hero.stats.jobs': 'وظيفة متاحة',
    'hero.stats.companies': 'شركة مسجلة',
    'hero.stats.seekers': 'باحث عن عمل',
    'hero.stats.matches': 'مطابقة ناجحة',
    'hero.badge': 'مدعوم بالذكاء الاصطناعي',

    // Features Section
    'features.title': 'لماذا تختارنا؟',
    'features.subtitle': 'نقدم أفضل تجربة للبحث عن عمل في الجزائر',
    'features.ai.title': 'تحليل ذكي بالـ AI',
    'features.ai.desc': 'نحلل سيرتك الذاتية باستخدام الذكاء الاصطناعي لمطابقتك مع الوظائف المناسبة',
    'features.match.title': 'مطابقة دقيقة',
    'features.match.desc': 'خوارزمية متقدمة تضمن توافق مهاراتك مع متطلبات الوظيفة',
    'features.local.title': 'مخصص للجزائر',
    'features.local.desc': 'نفهم سوق العمل الجزائري ونوفر فرص في جميع الولايات',
    'features.bilingual.title': 'دعم متعدد اللغات',
    'features.bilingual.desc': 'منصة متاحة بالعربية والفرنسية والإنجليزية لخدمة جميع الجزائريين',
    'features.verification.title': 'التحقق من الوثائق',
    'features.verification.desc': 'نظام ذكي للتحقق من صحة الشهادات والوثائق باستخدام AI/OCR',
    'features.interview.title': 'مقابلة مع الذكاء الاصطناعي',
    'features.interview.desc': 'مقابلة أولية مع روبوت ذكي لتقييم مهاراتك قبل المقابلة النهائية',

    // How It Works
    'howItWorks.title': 'كيف يعمل؟',
    'howItWorks.subtitle': 'خطوات بسيطة للوصول إلى وظيفتك المثالية',
    'howItWorks.step1.title': 'أنشئ حسابك',
    'howItWorks.step1.desc': 'سجل كباحث عن عمل أو كشركة في دقائق',
    'howItWorks.step2.title': 'أكمل ملفك',
    'howItWorks.step2.desc': 'ارفع سيرتك الذاتية وأضف مهاراتك وخبراتك',
    'howItWorks.step3.title': 'احصل على مطابقات',
    'howItWorks.step3.desc': 'نظامنا الذكي يجد لك الفرص المناسبة تلقائياً',
    'howItWorks.step4.title': 'مقابلة AI',
    'howItWorks.step4.desc': 'أجب على أسئلة الذكاء الاصطناعي واحصل على تقييم فوري',
    'howItWorks.step5.title': 'المقابلة النهائية',
    'howItWorks.step5.desc': 'تواصل مع الشركات وابدأ مسيرتك المهنية',

    // AI Features
    'ai.matchmaker.title': 'نظام المطابقة الذكي',
    'ai.matchmaker.subtitle': 'نسبة التوافق بين ملفك ومتطلبات الوظيفة',
    'ai.matchmaker.score': 'نسبة التوافق',
    'ai.verification.title': 'التحقق من الوثائق',
    'ai.verification.subtitle': 'نظام ذكي للكشف عن الاحتيال والتحقق من صحة الوثائق',
    'ai.verification.upload': 'ارفع وثيقتك للتحقق',
    'ai.verification.verified': 'تم التحقق بنجاح',
    'ai.verification.pending': 'قيد المراجعة',
    'ai.verification.failed': 'فشل التحقق',
    'ai.interview.title': 'مقابلة مع الذكاء الاصطناعي',
    'ai.interview.subtitle': 'أجب على أسئلة الروبوت الذكي لتقييم مهاراتك',
    'ai.interview.start': 'ابدأ المقابلة',
    'ai.interview.passed': 'مبروك! نجحت في المقابلة',
    'ai.interview.passedDesc': 'يمكنك الآن التقدم للمقابلة النهائية مع الشركة',
    'ai.interview.failed': 'تحتاج إلى تطوير بعض المهارات',
    'ai.interview.failedDesc': 'إليك بعض النصائح لتحسين فرصك',
    'ai.careerPath.title': 'خريطة المسار المهني',
    'ai.careerPath.missingSkills': 'المهارات المطلوبة',
    'ai.careerPath.advice': 'نصائح للتحسين',

    // Pricing Section
    'pricing.title': 'خطط الاشتراك',
    'pricing.subtitle': 'اختر الخطة المناسبة لك',
    'pricing.seeker.title': 'للباحثين عن عمل',
    'pricing.seeker.price': '1,000',
    'pricing.seeker.currency': 'دج',
    'pricing.seeker.period': '/شهر',
    'pricing.seeker.feature1': 'رفع السيرة الذاتية',
    'pricing.seeker.feature2': 'تحليل AI للسيرة الذاتية',
    'pricing.seeker.feature3': 'مطابقة ذكية مع الوظائف',
    'pricing.seeker.feature4': 'مقابلة مع الذكاء الاصطناعي',
    'pricing.seeker.feature5': 'خريطة المسار المهني',
    'pricing.seeker.cta': 'اشترك الآن',
    'pricing.company.title': 'للشركات',
    'pricing.company.price': '10,000',
    'pricing.company.currency': 'دج',
    'pricing.company.period': '/سنة',
    'pricing.company.feature1': 'نشر عدد غير محدود من الوظائف',
    'pricing.company.feature2': 'الوصول لقاعدة بيانات المرشحين',
    'pricing.company.feature3': 'فلترة ذكية بالذكاء الاصطناعي',
    'pricing.company.feature4': 'التحقق من وثائق المرشحين',
    'pricing.company.feature5': 'تحليلات وتقارير متقدمة',
    'pricing.company.cta': 'اشترك الآن',
    'pricing.popular': 'الأكثر شعبية',

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
    'nav.pricing': 'Tarifs',

    // Hero Section
    'hero.title': 'Trouvez votre emploi de rêve en Algérie',
    'hero.subtitle': 'Plateforme intelligente qui connecte les chercheurs d\'emploi aux entreprises grâce à l\'IA pour l\'analyse de CV et la correspondance intelligente',
    'hero.cta.seeker': 'Je cherche un emploi',
    'hero.cta.company': 'Je recrute',
    'hero.stats.jobs': 'Offres disponibles',
    'hero.stats.companies': 'Entreprises inscrites',
    'hero.stats.seekers': 'Chercheurs d\'emploi',
    'hero.stats.matches': 'Correspondances réussies',
    'hero.badge': 'Propulsé par l\'IA',

    // Features Section
    'features.title': 'Pourquoi nous choisir ?',
    'features.subtitle': 'Nous offrons la meilleure expérience de recherche d\'emploi en Algérie',
    'features.ai.title': 'Analyse IA intelligente',
    'features.ai.desc': 'Nous analysons votre CV avec l\'IA pour vous faire correspondre aux emplois appropriés',
    'features.match.title': 'Correspondance précise',
    'features.match.desc': 'Algorithme avancé qui garantit que vos compétences correspondent aux exigences du poste',
    'features.local.title': 'Conçu pour l\'Algérie',
    'features.local.desc': 'Nous comprenons le marché du travail algérien et offrons des opportunités dans toutes les wilayas',
    'features.bilingual.title': 'Support multilingue',
    'features.bilingual.desc': 'Plateforme disponible en arabe, français et anglais pour servir tous les Algériens',
    'features.verification.title': 'Vérification des documents',
    'features.verification.desc': 'Système intelligent pour vérifier l\'authenticité des certificats et documents avec AI/OCR',
    'features.interview.title': 'Entretien avec l\'IA',
    'features.interview.desc': 'Entretien initial avec un robot intelligent pour évaluer vos compétences avant l\'entretien final',

    // How It Works
    'howItWorks.title': 'Comment ça marche ?',
    'howItWorks.subtitle': 'Étapes simples pour trouver votre emploi idéal',
    'howItWorks.step1.title': 'Créez votre compte',
    'howItWorks.step1.desc': 'Inscrivez-vous en tant que chercheur d\'emploi ou entreprise en quelques minutes',
    'howItWorks.step2.title': 'Complétez votre profil',
    'howItWorks.step2.desc': 'Téléchargez votre CV et ajoutez vos compétences et expériences',
    'howItWorks.step3.title': 'Obtenez des correspondances',
    'howItWorks.step3.desc': 'Notre système intelligent trouve automatiquement les opportunités adaptées',
    'howItWorks.step4.title': 'Entretien IA',
    'howItWorks.step4.desc': 'Répondez aux questions de l\'IA et obtenez une évaluation instantanée',
    'howItWorks.step5.title': 'Entretien final',
    'howItWorks.step5.desc': 'Connectez-vous avec les entreprises et lancez votre carrière',

    // AI Features
    'ai.matchmaker.title': 'Système de correspondance intelligent',
    'ai.matchmaker.subtitle': 'Taux de compatibilité entre votre profil et les exigences du poste',
    'ai.matchmaker.score': 'Score de compatibilité',
    'ai.verification.title': 'Vérification des documents',
    'ai.verification.subtitle': 'Système intelligent de détection de fraude et de vérification des documents',
    'ai.verification.upload': 'Téléchargez votre document pour vérification',
    'ai.verification.verified': 'Vérifié avec succès',
    'ai.verification.pending': 'En cours de révision',
    'ai.verification.failed': 'Échec de la vérification',
    'ai.interview.title': 'Entretien avec l\'IA',
    'ai.interview.subtitle': 'Répondez aux questions du robot intelligent pour évaluer vos compétences',
    'ai.interview.start': 'Commencer l\'entretien',
    'ai.interview.passed': 'Félicitations ! Vous avez réussi l\'entretien',
    'ai.interview.passedDesc': 'Vous pouvez maintenant postuler pour l\'entretien final avec l\'entreprise',
    'ai.interview.failed': 'Vous devez développer certaines compétences',
    'ai.interview.failedDesc': 'Voici quelques conseils pour améliorer vos chances',
    'ai.careerPath.title': 'Cartographie du parcours professionnel',
    'ai.careerPath.missingSkills': 'Compétences requises',
    'ai.careerPath.advice': 'Conseils d\'amélioration',

    // Pricing Section
    'pricing.title': 'Plans d\'abonnement',
    'pricing.subtitle': 'Choisissez le plan qui vous convient',
    'pricing.seeker.title': 'Pour les chercheurs d\'emploi',
    'pricing.seeker.price': '1 000',
    'pricing.seeker.currency': 'DZD',
    'pricing.seeker.period': '/mois',
    'pricing.seeker.feature1': 'Télécharger votre CV',
    'pricing.seeker.feature2': 'Analyse IA du CV',
    'pricing.seeker.feature3': 'Correspondance intelligente avec les emplois',
    'pricing.seeker.feature4': 'Entretien avec l\'IA',
    'pricing.seeker.feature5': 'Cartographie du parcours professionnel',
    'pricing.seeker.cta': 'S\'abonner maintenant',
    'pricing.company.title': 'Pour les entreprises',
    'pricing.company.price': '10 000',
    'pricing.company.currency': 'DZD',
    'pricing.company.period': '/an',
    'pricing.company.feature1': 'Publier des offres illimitées',
    'pricing.company.feature2': 'Accès à la base de données des candidats',
    'pricing.company.feature3': 'Filtrage intelligent par IA',
    'pricing.company.feature4': 'Vérification des documents des candidats',
    'pricing.company.feature5': 'Analyses et rapports avancés',
    'pricing.company.cta': 'S\'abonner maintenant',
    'pricing.popular': 'Le plus populaire',

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
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.howItWorks': 'How It Works',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'nav.pricing': 'Pricing',

    // Hero Section
    'hero.title': 'Find Your Dream Job in Algeria',
    'hero.subtitle': 'Intelligent platform connecting job seekers with companies using AI for CV analysis and smart matching',
    'hero.cta.seeker': 'I\'m Looking for a Job',
    'hero.cta.company': 'I\'m Hiring',
    'hero.stats.jobs': 'Available Jobs',
    'hero.stats.companies': 'Registered Companies',
    'hero.stats.seekers': 'Job Seekers',
    'hero.stats.matches': 'Successful Matches',
    'hero.badge': 'Powered by AI',

    // Features Section
    'features.title': 'Why Choose Us?',
    'features.subtitle': 'We offer the best job search experience in Algeria',
    'features.ai.title': 'Smart AI Analysis',
    'features.ai.desc': 'We analyze your CV using AI to match you with suitable jobs',
    'features.match.title': 'Precise Matching',
    'features.match.desc': 'Advanced algorithm ensuring your skills match job requirements',
    'features.local.title': 'Made for Algeria',
    'features.local.desc': 'We understand the Algerian job market and offer opportunities in all wilayas',
    'features.bilingual.title': 'Multilingual Support',
    'features.bilingual.desc': 'Platform available in Arabic, French, and English to serve all Algerians',
    'features.verification.title': 'Document Verification',
    'features.verification.desc': 'Intelligent system to verify certificate and document authenticity using AI/OCR',
    'features.interview.title': 'AI Interview',
    'features.interview.desc': 'Initial interview with an intelligent bot to assess your skills before the final interview',

    // How It Works
    'howItWorks.title': 'How It Works?',
    'howItWorks.subtitle': 'Simple steps to find your ideal job',
    'howItWorks.step1.title': 'Create Your Account',
    'howItWorks.step1.desc': 'Register as a job seeker or company in minutes',
    'howItWorks.step2.title': 'Complete Your Profile',
    'howItWorks.step2.desc': 'Upload your CV and add your skills and experience',
    'howItWorks.step3.title': 'Get Matches',
    'howItWorks.step3.desc': 'Our smart system automatically finds suitable opportunities',
    'howItWorks.step4.title': 'AI Interview',
    'howItWorks.step4.desc': 'Answer AI questions and get instant assessment',
    'howItWorks.step5.title': 'Final Interview',
    'howItWorks.step5.desc': 'Connect with companies and start your career',

    // AI Features
    'ai.matchmaker.title': 'Smart Matching System',
    'ai.matchmaker.subtitle': 'Compatibility rate between your profile and job requirements',
    'ai.matchmaker.score': 'Compatibility Score',
    'ai.verification.title': 'Document Verification',
    'ai.verification.subtitle': 'Intelligent fraud detection and document verification system',
    'ai.verification.upload': 'Upload your document for verification',
    'ai.verification.verified': 'Successfully Verified',
    'ai.verification.pending': 'Under Review',
    'ai.verification.failed': 'Verification Failed',
    'ai.interview.title': 'AI Interview',
    'ai.interview.subtitle': 'Answer the smart bot\'s questions to assess your skills',
    'ai.interview.start': 'Start Interview',
    'ai.interview.passed': 'Congratulations! You passed the interview',
    'ai.interview.passedDesc': 'You can now apply for the final interview with the company',
    'ai.interview.failed': 'You need to develop some skills',
    'ai.interview.failedDesc': 'Here are some tips to improve your chances',
    'ai.careerPath.title': 'Career Path Mapping',
    'ai.careerPath.missingSkills': 'Required Skills',
    'ai.careerPath.advice': 'Improvement Tips',

    // Pricing Section
    'pricing.title': 'Subscription Plans',
    'pricing.subtitle': 'Choose the plan that suits you',
    'pricing.seeker.title': 'For Job Seekers',
    'pricing.seeker.price': '1,000',
    'pricing.seeker.currency': 'DZD',
    'pricing.seeker.period': '/month',
    'pricing.seeker.feature1': 'Upload your CV',
    'pricing.seeker.feature2': 'AI CV Analysis',
    'pricing.seeker.feature3': 'Smart job matching',
    'pricing.seeker.feature4': 'AI Interview',
    'pricing.seeker.feature5': 'Career path mapping',
    'pricing.seeker.cta': 'Subscribe Now',
    'pricing.company.title': 'For Companies',
    'pricing.company.price': '10,000',
    'pricing.company.currency': 'DZD',
    'pricing.company.period': '/year',
    'pricing.company.feature1': 'Post unlimited jobs',
    'pricing.company.feature2': 'Access candidate database',
    'pricing.company.feature3': 'AI-powered smart filtering',
    'pricing.company.feature4': 'Candidate document verification',
    'pricing.company.feature5': 'Advanced analytics and reports',
    'pricing.company.cta': 'Subscribe Now',
    'pricing.popular': 'Most Popular',

    // CTA Section
    'cta.title': 'Start Your Career Journey Today',
    'cta.subtitle': 'Join thousands of Algerians who found their jobs with us',
    'cta.button': 'Sign Up for Free',

    // Footer
    'footer.description': 'Algerian platform connecting job seekers with companies',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.rights': 'All rights reserved',

    // Auth Page
    'auth.welcome': 'Welcome',
    'auth.loginTitle': 'Login',
    'auth.signupTitle': 'Create Account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.loginButton': 'Login',
    'auth.signupButton': 'Sign Up',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.selectRole': 'Choose your account type',
    'auth.roleSeeker': 'Job Seeker',
    'auth.roleSeekerDesc': 'I\'m looking for opportunities matching my skills',
    'auth.roleCompany': 'Company',
    'auth.roleCompanyDesc': 'I\'m looking for talented people for my team',
    'auth.forgotPassword': 'Forgot password?',

    // Dashboard Common
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Overview',
    'dashboard.settings': 'Settings',
    'dashboard.profile': 'Profile',
    'dashboard.notifications': 'Notifications',

    // Job Seeker Dashboard
    'seeker.dashboard': 'Seeker Dashboard',
    'seeker.myProfile': 'My Profile',
    'seeker.myCV': 'My CV',
    'seeker.skills': 'Skills',
    'seeker.applications': 'My Applications',
    'seeker.matches': 'Suggested Jobs',
    'seeker.savedJobs': 'Saved Jobs',
    'seeker.uploadCV': 'Upload CV',
    'seeker.profileComplete': 'Profile Complete',

    // Company Dashboard
    'company.dashboard': 'Company Dashboard',
    'company.postJob': 'Post a Job',
    'company.myJobs': 'My Jobs',
    'company.candidates': 'Candidates',
    'company.analytics': 'Analytics',
    'company.companyProfile': 'Company Profile',

    // Admin Dashboard
    'admin.dashboard': 'Admin Dashboard',
    'admin.users': 'Users',
    'admin.companies': 'Companies',
    'admin.jobs': 'Jobs',
    'admin.reports': 'Reports',
    'admin.settings': 'System Settings',

    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.viewAll': 'View All',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.submit': 'Submit',
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
