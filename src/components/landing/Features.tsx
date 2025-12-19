import { 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Shield, 
  BarChart3, 
  Bell 
} from "lucide-react";

/**
 * Features Section - قسم المميزات
 * يعرض المميزات الرئيسية للتطبيق بأسلوب بصري جذاب
 */

const features = [
  {
    icon: Briefcase,
    title: "إدارة القضايا",
    description: "تتبع جميع قضاياك بسهولة مع نظام تصنيف ذكي وتنبيهات المواعيد",
  },
  {
    icon: FileText,
    title: "العقود الذكية",
    description: "إنشاء ومتابعة العقود مع قوالب جاهزة وتنبيهات انتهاء الصلاحية",
  },
  {
    icon: MessageSquare,
    title: "الاستشارات القانونية",
    description: "نظام متكامل لإدارة الاستشارات مع أرشفة تلقائية وتصنيف ذكي",
  },
  {
    icon: Shield,
    title: "أمان متقدم",
    description: "حماية بياناتك بأعلى معايير التشفير مع نسخ احتياطي تلقائي",
  },
  {
    icon: BarChart3,
    title: "تقارير وإحصائيات",
    description: "لوحة تحكم شاملة مع تقارير مفصلة ورسوم بيانية تفاعلية",
  },
  {
    icon: Bell,
    title: "تنبيهات ذكية",
    description: "إشعارات مخصصة للمواعيد والاستحقاقات لتبقى دائماً على اطلاع",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            المميزات
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            كل ما تحتاجه في مكان واحد
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            أدوات متكاملة صُممت خصيصاً لتلبية احتياجات المحامين والمستشارين القانونيين
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-2xl p-6 md:p-8 hover-scale hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
