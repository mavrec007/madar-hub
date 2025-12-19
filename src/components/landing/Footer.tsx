import logo from "@/assets/logo.png";

/**
 * Footer Section - قسم التذييل
 * يحتوي على روابط التنقل ومعلومات الاتصال
 */

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img
              src={logo}
              alt="المدار الجديد"
              className="h-12 mb-4 opacity-70"
            />
            <p className="text-muted-foreground max-w-md leading-relaxed">
              منصة المدار الجديد هي الحل الأمثل لإدارة الشؤون القانونية بكفاءة واحترافية. نساعدك على التركيز على ما يهم حقاً.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">روابط سريعة</h4>
            <ul className="space-y-3">
              {["المميزات", "الأسعار", "الدعم الفني", "المدونة"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">قانوني</h4>
            <ul className="space-y-3">
              {["سياسة الخصوصية", "شروط الاستخدام", "اتفاقية الترخيص"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} المدار الجديد. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6">
            {["تويتر", "لينكد إن", "فيسبوك"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
