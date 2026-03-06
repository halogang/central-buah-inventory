import { Button } from "@/components/ui/button";

const CTASection = () => (
  <section className="py-20 md:py-28 bg-primary">
    <div className="container mx-auto px-4 text-center">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
        Start Managing Your Fruit Stock Now
      </h2>
      <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
        Join hundreds of fruit distributors who trust CentralBuah to power their business.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button size="lg" variant="secondary" className="text-base px-8">
          Register
        </Button>
        <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
          Login
        </Button>
      </div>
    </div>
  </section>
);

export default CTASection;
