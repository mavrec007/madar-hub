import { Download, ArrowLeft, Smartphone } from "lucide-react";

/**
 * CTA Section - قسم الدعوة للعمل النهائية
 * يحث المستخدم على اتخاذ الإجراء (التحميل/التسجيل)
 */

const CTA = () => {
  return (
    <section id="download" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            <Smartphone className="w-4 h-4" />
            متاح على جميع الأجهزة
          </span>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            ابدأ رحلتك نحو
            <br />
            <span className="text-gradient">إدارة قانونية أفضل</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            انضم الآن واحصل على تجربة مجانية كاملة لمدة 14 يوماً.
            لا نطلب بطاقة ائتمان.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#"
              className="group flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              <Download className="w-5 h-5" />
              ابدأ التجربة المجانية
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-foreground hover:text-primary font-semibold transition-colors"
            >
              تواصل مع فريق المبيعات
            </a>
          </div>

          {/* Trust Text */}
          <p className="mt-8 text-sm text-muted-foreground">
            موثوق من قبل +5,000 محامي ومستشار قانوني في ليبيا
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
