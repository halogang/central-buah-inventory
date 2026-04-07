import { Head, usePage } from "@inertiajs/react";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ItemsSection from "@/components/ItemsSection";
import LocationSection from "@/components/LocationSection";
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
  email: string;
  jam_operasional: string;
  link_maps: string;
  hero_image: string;
  hero_image_url: string;
  about_image: string;
  about_image_url: string;
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
    <>
      <Head>
        <title>Central Buah Sutomo - Toko Buah Terdekat di Cilacap</title>
        <meta
          name="description"
          content="Cari toko, kios, agen buah segar berkualitas di Cilacap? Central Buah Sutomo: 100% segar, garansi kualitas, buah pilihan. BISA PESAN ONLINE."
        />
      </Head>
      <div className="min-h-screen scroll-smooth">
        <Navbar websiteInfo={websiteInfo}/>
        <HeroSection websiteInfo={websiteInfo} />
        <FeaturesSection />
        <ItemsSection items={items} categories={categories} />
        <AboutSection websiteInfo={websiteInfo}/>
        <CTASection websiteInfo={websiteInfo}/>
        <LocationSection websiteInfo={websiteInfo}/>
        <Footer websiteInfo={websiteInfo}/>
      </div>
    </>
  )
}

