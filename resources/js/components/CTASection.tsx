import backgroundImage from "@/assets/hero-fruits.jpg";
import {Button} from "@/components/ui/button";

const CTASection = ({websiteInfo} : any) => {
  const contactNumber = websiteInfo.kontak.replace(/^0/, '62');
  const sendWhatsApp = () => {
    
        const message = `
    Halo, saya tertarik untuk memesan buah dari Toko Buah Terdekat di Cilacap. Bisa tolong bantu saya dengan informasi lebih lanjut tentang produk dan cara pemesanannya? Terima kasih!    `.trim()
    
        const url = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }
    return (
        <section
            className="relative py-20 md:py-28 bg-cover bg-center"
            style={{
                backgroundImage: `url(${websiteInfo.about_image_url ?? backgroundImage})`
            }}>
            {/* Overlay hijau */}
            <div className="absolute inset-0 bg-primary/85"></div>

            {/* Content */}
            <div className="relative container mx-auto px-4 text-center">
                <h2
                    className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
                    Kunjungi Toko Kami atau Pesan dengan Mudah!
                </h2>

                <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
                    Nikmati buah segar pilihan yang dipetik dari sumber terbaik, siap memenuhi
                    kebutuhan nutrisi harian Anda dan keluarga.
                </p>

                <div
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href={websiteInfo.link_maps} target="_blank">
                        <Button
                            className="text-lg px-8 py-6 rounded-full text-muted border-2 bg-transparent border-muted hover:bg-yellow-500 hover:border-yellow-500 cursor-pointer">
                            Lokasi Kami
                        </Button>
                    </a>
                    <a href="">
                        <Button onClick={sendWhatsApp}
                            className="text-lg px-8 py-6 rounded-full text-primary bg-muted hover:text-primary hover:bg-muted cursor-pointer border-2 border-muted">
                            Pesan Sekarang
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default CTASection;