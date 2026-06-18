import BannerSection from '@/components/Banner';
import ContactUs from '@/components/ContactUs';
import FAQSection from '@/components/FAQSection';
import FeaturesSection from '@/components/FeaturdSection';
import Testimonials from '@/components/Testimonials';
import WhyDonateSection from '@/components/WhyDonateSection';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <BannerSection />
      <FeaturesSection />
      <ContactUs />
      <WhyDonateSection />
      <Testimonials />
      <FAQSection />
    </div>
  );
}
