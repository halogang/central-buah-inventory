import { CheckCircle } from "lucide-react";

const points = [
  "Designed specifically for fruit distributors and warehouse operators",
  "Real-time inventory tracking with automated stock alerts",
  "Seamless supplier management and procurement workflows",
  "Complete delivery order and invoice management system",
];

const AboutSection = () => (
  <section id="about" className="py-20 md:py-28 bg-muted/50 transition-all">
    <div className="container mx-auto px-4 max-w-4xl">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">
        About CentralBuah
      </h2>
      <p className="mt-6 text-center text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        CentralBuah is a comprehensive inventory management system built for fruit distributors. 
        We help businesses streamline their warehouse operations, from tracking stock levels to 
        managing suppliers, creating delivery orders, and generating invoices — all in one platform.
      </p>
      <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {points.map((p) => (
          <div key={p} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span className="text-sm text-foreground">{p}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
