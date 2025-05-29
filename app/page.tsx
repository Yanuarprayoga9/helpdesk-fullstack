import { CTASection } from "@/components/landing/cta-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { RoleBasedAccess } from "@/components/landing/role-based-access";
import { TechStackSection } from "@/components/landing/tech-stack-section";


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header/>
      <HeroSection />
      <FeaturesSection />
      <RoleBasedAccess />
      <TechStackSection />
      <CTASection />
      <Footer />
    </main>
  )
}
