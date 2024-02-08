import BrandHeader from "./(landing)/_components/brand-header";
import EndSection from "./(landing)/_components/end-section";
import FeaturesSection from "./(landing)/_components/features-section";
import FooterSection from "./(landing)/_components/footer-section";
import Header from "./(landing)/_components/header";
import HeroMarquee from "./(landing)/_components/hero-marquee";
import HeroSection from "./(landing)/_components/hero-section";
import StatsSection from "./(landing)/_components/stats-section";

export default function LandingPage() {
  return (
    <>
      <BrandHeader />
      <Header />
      <main className="min-h-[200vh]">
        <HeroSection />
        <HeroMarquee />
        <FeaturesSection />
        <StatsSection />
        <EndSection />
        <FooterSection />
      </main>
    </>
  );
}
