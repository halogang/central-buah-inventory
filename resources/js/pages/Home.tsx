import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ItemsSection from "@/components/ItemsSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { usePage } from "@inertiajs/react";

interface Category {
    id: number;
    name: string;
    icon: string;
    description?: string;
}

interface Item {
    id: number;
    icon?: string;
    name: string;
    category?: Category;
    unit: string;
    purchase_price: number;
    selling_price: number;
    stock: number;
    min_stock: number;
    bad_stock: number;
    created_at: string;
}

export default function Home() {
  const { items, categories = [] } = usePage<{
      items: Item[];
      categories: Category[];
      errors?: Record<string, string>;
  }>().props;

  return (
    <div className="min-h-screen scroll-smooth">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ItemsSection items={items} categories={categories} />
      <AboutSection />
      <CTASection />
      <Footer />
    </div>
  )
}

