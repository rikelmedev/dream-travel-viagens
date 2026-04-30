import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import Globe3D from '@/components/Globe3D';
import WhyChooseUs from '@/components/WhyChooseUs';
import AboutJackeline from '@/components/AboutJackeline';
import Blog from '@/components/Blog';
import FormularioQuestionario from '@/components/FormularioQuestionario';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Featured Destinations */}
        <FeaturedDestinations />

        {/* Globe 3D */}
        <Globe3D />

        {/* Why Choose Us */}
        <WhyChooseUs />

        {/* About Jackeline */}
        <AboutJackeline />

        {/* Blog */}
        <Blog />

        {/* Formulário Questionário */}
        <FormularioQuestionario />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
