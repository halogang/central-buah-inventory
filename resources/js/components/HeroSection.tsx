import heroImage from "@/assets/hero-fruits.jpg";
import {Button} from "@/components/ui/button";


const HeroSection = ({websiteInfo} : any) => {
    //replace first digit with 62 for whatsapp link
    const contactNumber = websiteInfo.kontak.replace(/^0/, '62');

    const sendWhatsApp = () => {
    
        const message = `
    Halo, saya tertarik untuk memesan buah dari Toko Central Buah Sutomo. Bisa tolong bantu saya dengan informasi lebih lanjut tentang produk dan cara pemesanannya? Terima kasih!    `.trim()
    
        const url = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`
        window.open(url, '_blank')
    }
  return (
        <section id="home" className="relative overflow-hidden transition-all">
            <div className="absolute inset-0 z-0">
                <img
                    src={websiteInfo.hero_image_url ?? heroImage}
                    alt="Fresh fruits in warehouse"
                    className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-foreground/60"/>
            </div>
            <div className="absolute inset-0 bg-primary/50"></div>
            <div
                className="relative z-10 container mx-auto px-4 py-16 md:py-28 text-center flex flex-col justify-center items-center">
                <div
                    className="font-display text-center text-4xl md:text-6xl font-black text-primary-foreground leading-tight max-w-6xl animate-fade-up flex flex-col gap-1">
                    <h1 className="">Toko Buah Terdekat di Cilacap</h1>
                    <h2 className="text-secondary text-xl md:text-4xl font-light">Buka 24 Jam, Bisa Pesan Online</h2>
                </div>
                <p
                    className="mt-6 text-sm md:text-xl text-primary-foreground/80 max-w-2xl text-center animate-fade-up"
                    style={{
                        animationDelay: "0.15s"
                    }}>
                    Menyediakan buah-buahan segar berkualitas, dipilih langsung dari petani
                    terpercaya untuk memenuhi kebutuhan nutrisi harian hingga usaha Anda.
                </p>
                <div
                    className="mt-10 flex items-center justify-center gap-4 animate-fade-up"
                    style={{
                        animationDelay: "0.3s"
                    }}>
                        <a href="#katalog">
                            <Button 
                                className="text-md sm:text-lg px-8 py-6 rounded-full text-muted border-2 bg-transparent border-muted hover:bg-yellow-500 hover:border-yellow-500 hover:text-muted cursor-pointer">
                                Lihat Katalog
                            </Button>
                        </a>
                        <a href="">
                            <Button onClick={sendWhatsApp}
                                className="text-md sm:text-lg px-8 py-6 rounded-full text-primary bg-muted hover:text-primary hover:bg-muted cursor-pointer border-2 border-muted">
                                Pesan Sekarang
                            </Button>
                        </a>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
