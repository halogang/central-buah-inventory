import heroImage from "@/assets/hero-fruits.jpg";
import { Button } from "@/components/ui/button";

const HeroSection = () => (
  <section id="home" className="relative pt-16 overflow-hidden transition-all">
    <div className="absolute inset-0 z-0">
      <img src={heroImage} alt="Fresh fruits in warehouse" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-foreground/60" />
    </div>
    <div className="relative z-10 container mx-auto px-4 py-28 md:py-40 text-center">
      <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground leading-tight max-w-3xl mx-auto animate-fade-up">
        Manage Fruit Stock Easier with <span className="text-secondary">CentralBuah</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.15s" }}>
        The all-in-one inventory system for fruit distributors. Track stock, manage suppliers, create delivery orders, and generate invoices — effortlessly.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <a href="#products">
          <Button size="lg" variant="secondary" className="text-base px-8 cursor-pointer  ">
            View Products
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
