import backgroundImage from "@/assets/hero-fruits.jpg";
import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section
    className="relative py-20 md:py-28 bg-cover bg-center"
    style={{ backgroundImage: `url(${backgroundImage})` }}
  >
    {/* Overlay hijau */}
    <div className="absolute inset-0 bg-primary/85"></div>

    {/* Content */}
    <div className="relative container mx-auto px-4 text-center">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
        Kunjungi Toko Kami atau Pesan Sekarang!
      </h2>

      <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
        Dapatkan buah segar langsung dari petani dengan harga terbaik. Hubungi kami untuk pemesanan atau kunjungi toko kami.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="#contact">
          <Button className="text-lg px-8 py-6 rounded-full text-primary bg-muted hover:text-primary hover:bg-muted cursor-pointer border-2 border-muted">
            Hubungi Kami
          </Button>
        </a>

        <a href="#products">
          <Button className="text-lg px-8 py-6 rounded-full text-muted border-2 bg-transparent border-muted hover:bg-muted hover:text-primary cursor-pointer"
          >
            Lihat Katalog
          </Button>
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;