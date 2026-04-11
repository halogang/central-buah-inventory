import { Menu, X} from "lucide-react";
import { useState } from "react";
import AppLogoIcon from '@/components/app-logo-icon';

const navLinks = [
  {
    id: 1,
    label: "Home",
    href: '#home'
  },
  {
    id: 2,
    label: "Katalog",
    href: '#katalog'
  },
  {
    id: 3,
    label: "Tentang",
    href: '#tentang'
  },
  {
    id: 4,
    label: "Kontak",
    href: '#kontak'
  }
];

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
        <a href="https://centralbuahsutomo.com/" className="flex items-center gap-2 font-display text-xl font-bold text-muted">
          <div className="flex aspect-square size-9 sm:size-10 items-center justify-center rounded-md">
              <AppLogoIcon />
          </div>
          <span className="text-[16px] sm:text-xl">{websiteInfo.nama_usaha}</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              {link.label}
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
              key={link.id}
              href={link.href}
              className="block text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
