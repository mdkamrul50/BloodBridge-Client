import BannerSection from '@/components/Banner';
import ContactUs from '@/components/ContactUs';
import FeaturesSection from '@/components/FeaturdSection';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <BannerSection />
      <FeaturesSection />
      <ContactUs />
    </div>
  );
}
