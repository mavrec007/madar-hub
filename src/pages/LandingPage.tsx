import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Benefits from "@/components/landing/Benefits";
import SocialProof from "@/components/landing/SocialProof";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

/**
 * صفحة الهبوط الرئيسية لتطبيق المدار الجديد
 * Landing Page for Al-Madar Al-Jadid Legal Management Platform
 */
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <Benefits />
      <SocialProof />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
