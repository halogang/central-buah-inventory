import { usePage } from "@inertiajs/react";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ItemsSection from "@/components/ItemsSection";
import Navbar from "@/components/Navbar";

interface Category {
    id: number;
    name: string;
    icon: string;
    description?: string;
}

interface WebsiteInfo {
  id: number;
  nama_usaha: string;
  alamat: string;
  kontak: string;
  jam_operasional: string;
  link_maps: string
}

interface Unit {
  id: number;
  unit_code: string;
}

interface Item {
    id: number;
    icon?: string;
    name: string;
    category?: Category;
    unit?: Unit;
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
    created_at: string;
}

export default function Home() {
  const { items, categories = [], websiteInfo } = usePage<{
      items: Item[];
      categories: Category[];
      websiteInfo: WebsiteInfo;
      errors?: Record<string, string>;
  }>().props;

  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar websiteInfo={websiteInfo}/>
      <HeroSection websiteInfo={websiteInfo} />
      <FeaturesSection />
      <ItemsSection items={items} categories={categories} />
      <AboutSection />
      <CTASection />
      <Footer websiteInfo={websiteInfo}/>
    </div>
  )
}

