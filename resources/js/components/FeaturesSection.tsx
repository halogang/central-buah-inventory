import { Package, ArrowLeftRight, Truck, FileText, BarChart3 } from "lucide-react";

const features = [
  { icon: Package, title: "Stock Management", desc: "Real-time tracking of all fruit inventory across your warehouse." },
  { icon: ArrowLeftRight, title: "Stock In & Out", desc: "Record incoming and outgoing goods with full audit trail." },
  { icon: Truck, title: "Delivery Orders", desc: "Create and manage delivery orders for seamless logistics." },
  { icon: FileText, title: "Invoices & Payments", desc: "Generate invoices and track payment status automatically." },
  { icon: BarChart3, title: "Stock Reports", desc: "Comprehensive reports and analytics to optimize operations." },
];

const FeaturesSection = () => (
  <section className="py-20 md:py-28 bg-muted/50">
    <div className="container mx-auto px-4">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground">
        Powerful Features
      </h2>
      <p className="mt-3 text-center text-muted-foreground max-w-xl mx-auto">
        Everything you need to run your fruit distribution business efficiently.
      </p>
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
