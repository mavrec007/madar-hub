import { Scale, Download, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import logo from "@/assets/logo.png";

/**
 * Hero Section - القسم الرئيسي
 * يحتوي على العنوان الجذاب والوصف المختصر وأزرار الدعوة للعمل
 */
const Hero = () => {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(hsl(156 72% 40% / 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(156 72% 40% / 0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          <img
            src={logo}
            alt="المدار الجديد"
            className="h-24 md:h-32 mx-auto filter brightness-0 invert opacity-90"
          />
        </div>

        {/* Main Headline */}
        <h1 
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          أدِر شؤونك القانونية
          <br />
          <span className="text-gradient">بذكاء واحترافية</span>
        </h1>

        {/* Subheadline */}
        <p 
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          منصة متكاملة لإدارة القضايا والعقود والاستشارات القانونية.
          <br className="hidden md:block" />
          وفّر وقتك وزِد إنتاجيتك مع نظام ذكي مصمم للمحترفين.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <a
            href="#download"
            className="group flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
          >
            <Download className="w-5 h-5 group-hover:animate-pulse" />
            ابدأ الآن مجاناً
          </a>
          <a
            href="#features"
            className="flex items-center gap-3 glass text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10"
          >
            <Scale className="w-5 h-5" />
            اكتشف المميزات
          </a>
        </div>

        {/* Stats */}
        <div 
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          {[
            { value: "+5,000", label: "مستخدم نشط" },
            { value: "+50,000", label: "قضية مُدارة" },
            { value: "4.9", label: "تقييم المستخدمين" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToFeatures}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-float"
          aria-label="اكتشف المزيد"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
