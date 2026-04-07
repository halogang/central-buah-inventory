import heroImage from "@/assets/hero-fruits.jpg";
import {Button} from "@/components/ui/button";


const HeroSection = ({websiteInfo} : any) => {
    //replace first digit with 62 for whatsapp link
    const contactNumber = websiteInfo.kontak.replace(/^0/, '62');

    const sendWhatsApp = () => {
    
        const message = `
    Halo, saya tertarik untuk memesan buah dari Toko Buah Terdekat di Cilacap. Bisa tolong bantu saya dengan informasi lebih lanjut tentang produk dan cara pemesanannya? Terima kasih!    `.trim()
    
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
            <div
                className="relative z-10 container mx-auto px-4 py-16 md:py-28 text-center">
                <h1
                    className="font-display text-left text-4xl md:text-6xl font-black text-primary-foreground leading-tight max-w-3xl animate-fade-up flex flex-col gap-1">
                    <p className="">Toko Buah Terdekat di Cilacap</p>
                    <span className="text-secondary text-2xl md:text-4xl font-regular">Buka 24 Jam, Bisa Pesan Online</span>
                </h1>
                <p
                    className="mt-6 text-sm md:text-xl text-primary-foreground/80 max-w-2xl text-left animate-fade-up"
                    style={{
                        animationDelay: "0.15s"
                    }}>
                    Menyediakan buah-buahan segar berkualitas, dipilih langsung dari petani
                    terpercaya untuk memenuhi kebutuhan nutrisi harian hingga usaha Anda.
                </p>
                <div
                    className="mt-10 flex items-center justify-start gap-4 animate-fade-up"
                    style={{
                        animationDelay: "0.3s"
                    }}>
                    <a href="#products">
                        <Button
                            className="text-md sm:text-lg px-8 py-6 rounded-full text-primary bg-muted hover:text-primary hover:bg-muted cursor-pointer border-2 border-muted">
                            Lihat Katalog
                        </Button>
                    </a>

                    <a href="">
                        <Button onClick={sendWhatsApp}
                            className="text-md sm:text-lg px-8 py-6 rounded-full text-muted border-2 bg-transparent border-muted hover:bg-yellow-500 hover:border-yellow-500 hover:text-yellow-900 cursor-pointer">
                            Pesan Online
                        </Button>
                    </a>
                    {/* <Button size="lg" className="text-base px-8">
          Get Started
        </Button> */
                    }
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
