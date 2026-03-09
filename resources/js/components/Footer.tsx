import { Clock8, Mail, MapPin, Phone } from "lucide-react";

interface WebsiteInfo {
  id: number;
  nama_usaha: string;
  alamat: string;
  kontak: string;
  email: string;
  jam_operasional: string;
  link_maps: string
}

interface FooterProps {
  websiteInfo: WebsiteInfo
}

const Footer = ({ websiteInfo }: FooterProps) => (
  <footer id="contact" className="bg-primary text-primary-foreground py-12 transition-all">
    <div className="container mx-auto px-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <a href="#" className="flex items-center gap-2 font-display text-xl font-bold">
            {websiteInfo.nama_usaha}
          </a>
          <p className="mt-3 text-sm text-primary-foreground/60">
            Buah Segar Berkualitas
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
          <h4 className="font-display font-semibold mb-3">Kontak</h4>
          <div className="space-y-2 text-sm text-primary-foreground/60">
            <div className="flex gap-2 items-center">
              <Phone size={16}/>
              <p>{websiteInfo.kontak}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Mail size={16}/>
              <p>{websiteInfo.email}</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3">Alamat & Jam Operasional</h4>
          <div className="space-y-2 text-sm text-primary-foreground/60">
            <div className="flex gap-2 items-center">
              <MapPin size={16}/>
              <p>{websiteInfo.alamat}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Clock8 size={16}/>
              <p>{websiteInfo.jam_operasional}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/40">
        © 2026 {websiteInfo.nama_usaha}. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
