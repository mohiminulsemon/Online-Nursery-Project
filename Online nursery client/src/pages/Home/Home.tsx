import ExtraSection1 from "@/components/ExtraSection/ExtraSection1";
import { HeroSection } from "@/components/HeroSection/HeroSection";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import TopProducts from "@/components/TopProducts/TopProducts";
import HomeCategory from "@/components/HomeCategory/HomeCategory";
import MosaicImageGallery from "@/components/MosaicImageUser/MosaicImageGallery";
import ScrollToTopButton from "./ScrollToTopButton";
export default function Home() {
  return (
    <div className="mx-auto container">
      <HeroSection />
      <TopProducts />
      <HowItWorks />
      <HomeCategory />
      <MosaicImageGallery />
      <ExtraSection1 />
      <ScrollToTopButton />
    </div>
  );
}
