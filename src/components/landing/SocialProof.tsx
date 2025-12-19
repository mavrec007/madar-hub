import { Star, Quote } from "lucide-react";

/**
 * Social Proof Section - قسم الإثبات الاجتماعي
 * يعرض آراء المستخدمين والتقييمات
 */

const testimonials = [
  {
    name: "أ. محمد الزاوي",
    role: "محامي - طرابلس",
    content: "المدار الجديد غيّر طريقة إدارتي للقضايا بشكل جذري. أصبحت أكثر تنظيماً وإنتاجية.",
    rating: 5,
  },
  {
    name: "أ. فاطمة بن عمر",
    role: "مستشار قانوني - بنغازي",
    content: "منصة رائعة وسهلة الاستخدام. أنصح بها كل زميل في المجال القانوني.",
    rating: 5,
  },
  {
    name: "أ. خالد الفيتوري",
    role: "مكتب محاماة - مصراتة",
    content: "الدعم الفني ممتاز والتحديثات المستمرة تجعل المنصة تتطور باستمرار.",
    rating: 5,
  },
];

const SocialProof = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">
            آراء المستخدمين
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            ماذا يقول عملاؤنا؟
          </h2>
          <p className="text-muted-foreground text-lg">
            انضم لآلاف المحامين والمستشارين الذين يثقون بالمدار الجديد
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl p-6 md:p-8 hover-scale transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-6">
                "{testimonial.content}"
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                ))}
              </div>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">+5,000</div>
            <div className="text-sm text-muted-foreground">مستخدم نشط</div>
          </div>
          <div className="w-px h-10 bg-border hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">+50,000</div>
            <div className="text-sm text-muted-foreground">قضية مُدارة</div>
          </div>
          <div className="w-px h-10 bg-border hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">4.9/5</div>
            <div className="text-sm text-muted-foreground">متوسط التقييم</div>
          </div>
          <div className="w-px h-10 bg-border hidden sm:block" />
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">99.9%</div>
            <div className="text-sm text-muted-foreground">وقت التشغيل</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
