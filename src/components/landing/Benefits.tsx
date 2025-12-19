import { Check, Zap, Clock, Users } from "lucide-react";

/**
 * Benefits Section - قسم الفوائد
 * يوضح لماذا المدار الجديد أفضل من البدائل
 */

const benefits = [
  {
    icon: Zap,
    title: "توفير الوقت بنسبة 70%",
    description: "أتمتة المهام الروتينية والإجراءات المتكررة لتركز على الأعمال الأهم",
  },
  {
    icon: Clock,
    title: "متابعة لحظية",
    description: "تتبع حالة جميع القضايا والعقود في الوقت الفعلي من أي مكان",
  },
  {
    icon: Users,
    title: "تعاون سلس",
    description: "مشاركة الملفات والتعاون مع فريقك بكفاءة وأمان تام",
  },
];

const checkItems = [
  "واجهة عربية سهلة الاستخدام",
  "دعم فني متاح على مدار الساعة",
  "تحديثات مستمرة ومجانية",
  "تكامل مع الأنظمة الأخرى",
  "نسخ احتياطي تلقائي يومي",
  "تقارير قابلة للتخصيص",
];

const Benefits = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              لماذا المدار الجديد؟
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              حلول ذكية
              <br />
              <span className="text-gradient">لتحديات حقيقية</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              بني المدار الجديد على خبرة سنوات في فهم احتياجات المحامين والمستشارين القانونيين. نقدم لك نظاماً متكاملاً يحل مشاكلك اليومية بفعالية.
            </p>

            {/* Benefits List */}
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Checklist Card */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-heading font-bold text-foreground mb-6">
              ما ستحصل عليه مع المدار الجديد
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {checkItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="mt-8 pt-8 border-t border-border grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">98%</div>
                <div className="text-sm text-muted-foreground">نسبة رضا العملاء</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">دعم فني متواصل</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
