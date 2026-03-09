import heroImage from "@/assets/hero-fruits.jpg";
import { Button } from "@/components/ui/button";

interface WebsiteInfo {
  id: number;
  nama_usaha: string;
  alamat: string;
  kontak: string;
  jam_operasional: string;
  link_maps: string
}

interface HeroProps {
  websiteInfo: WebsiteInfo
}

const HeroSection = ({ websiteInfo }: HeroProps) => (
  <section id="home" className="relative pt-16 overflow-hidden transition-all">
    <div className="absolute inset-0 z-0">
      <img src={heroImage} alt="Fresh fruits in warehouse" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/60" />
    </div>
    <div className="relative z-10 container mx-auto px-4 py-28 md:py-40 text-center">
      <h1 className="font-display text-4xl md:text-6xl font-extrabold text-primary-foreground leading-tight max-w-3xl mx-auto animate-fade-up">
        Buah Segar Setiap Hari <span className="text-secondary text-5xl font-medium">{websiteInfo.nama_usaha}</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.15s" }}>
        Buah Segar Berkualitas — Menyediakan buah-buahan segar pilihan langsung dari petani terpercaya untuk keluarga dan bisnis Anda.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <a href="#products">
          <Button className="text-lg px-8 py-6 rounded-full text-primary bg-muted hover:text-primary hover:bg-muted cursor-pointer border-2 border-muted">
            Lihat Katalog
          </Button>
        </a>

        <a href="#products">
          <Button className="text-lg px-8 py-6 rounded-full text-muted border-2 bg-transparent border-muted hover:bg-muted hover:text-primary cursor-pointer"
          >
            Daftar Harga
          </Button>
        </a>
        {/* <Button size="lg" className="text-base px-8">
          Get Started
        </Button> */}
      </div>
    </div>
  </section>
);

export default HeroSection;
