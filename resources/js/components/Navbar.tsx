import { Menu, X} from "lucide-react";
import { useState } from "react";
import AppLogoIcon from '@/components/app-logo-icon';

const navLinks = ["Home", "Products", "About", "Contact"];

interface WebsiteInfo {
  id: number;
  nama_usaha: string;
  alamat: string;
  kontak: string;
  jam_operasional: string;
  link_maps: string
}

interface NavbarProps {
  websiteInfo: WebsiteInfo
}

const Navbar = ({ websiteInfo }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-primary/75 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <a href="#" className="flex items-center gap-2 font-display text-xl font-bold text-muted">
          <div className="flex aspect-square size-9 sm:size-10 items-center justify-center rounded-md">
              <AppLogoIcon />
          </div>
          <span className="text-[16px] sm:text-xl">{websiteInfo.nama_usaha}</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-card border-b border-border px-4 py-4 space-y-4 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
