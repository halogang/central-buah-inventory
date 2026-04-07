import { CheckCircle } from "lucide-react";
import AboutImage from "@/assets/about-image.jpg";

const points = [
  "Buah lokal dipetik pagi hari, tiba di toko siang hari.", 
  "Buah import didatangkan langsung dari negara asal dengan rantai dingin terjaga.", 
  "Pelayanan ramah dan sistem pemesanan mudah."
];

const AboutSection = ({ websiteInfo }: any) => (
  <section id="about" className="py-20 md:py-28 bg-muted/50 transition-all">
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row items-center gap-12">
        
        {/* Kiri: Gambar */}
        <div className="md:w-1/2">
          <img
            src={websiteInfo.about_image_url ?? AboutImage}
            alt="Buah segar"
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Kanan: Konten */}
        <div className="md:w-1/2">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-left text-foreground">
            Tentang Central Buah Sutomo
          </h2>
          <p className="mt-6 text-left text-muted-foreground leading-relaxed">
            Central Buah Sutomo adalah toko buah segar yang telah beroperasi sejak 2010.
            Kami berkomitmen menyediakan buah-buahan lokal dan import berkualitas tinggi,
            langsung dari petani terpercaya. Dengan pengalaman bertahun-tahun, kami memahami
            pentingnya kesegaran dan kepuasan pelanggan. Baik untuk kebutuhan rumah tangga
            maupun bisnis seperti hotel, restoran, dan katering, kami siap memenuhi
            kebutuhan buah segar Anda setiap hari.
          </p>

          <div className="mt-10 grid gap-4">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">{p}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default AboutSection;