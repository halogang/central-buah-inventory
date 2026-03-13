import {Leaf, ShieldCheck, Star } from "lucide-react";

const features = [
  { icon: Leaf, title: "100% Segar", desc: "Buah dipetik langsung dari kebun dan dikirim fresh ke toko kami." },
  { icon: ShieldCheck, title: "Garansi Kualitas", desc: "Jaminan pengembalian jika buah tidak sesuai kualitas." },
  { icon: Star, title: "Buah Pilihan", desc: "Seleksi ketat dari petani terpercaya, lokal maupun import." },
];

const FeaturesSection = () => (
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">
        Mengapa Memilih Kami?
      </h2>
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="group bg-card rounded-lg p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-12 w-12 rounded-lg bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <f.icon className="h-6 w-6 text-accent-foreground group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-display text-lg font-semibold text-card-foreground">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
