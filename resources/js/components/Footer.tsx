import { Leaf } from "lucide-react";

const Footer = () => (
  <footer id="contact" className="bg-foreground text-primary-foreground py-12 transition-all">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
            <Leaf className="h-5 w-5" />
            CentralBuah
          </a>
          <p className="mt-3 text-sm text-primary-foreground/60">
            The all-in-one inventory system for fruit distributors.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Menu</h4>
          <div className="space-y-2 text-sm text-primary-foreground/60">
            {["Home", "Products", "About", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="block hover:text-primary-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Contact</h4>
          <div className="space-y-2 text-sm text-primary-foreground/60">
            <p>info@centralbuah.com</p>
            <p>+62 812 3456 7890</p>
            <p>Jakarta, Indonesia</p>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
        © 2026 CentralBuah. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
