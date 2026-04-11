import {MapPin, Phone, Clock, MessageCircle} from "lucide-react";
import {Button} from "@/components/ui/button";

interface WebsiteInfo {
    id: number;
    nama_usaha: string;
    alamat: string;
    kontak: string;
    email: string;
    jam_operasional: string;
    link_maps: string
}

interface Props {
    websiteInfo: WebsiteInfo
}

const LocationSection = ({websiteInfo} : Props) => {
    const contactNumber = websiteInfo.kontak.replace(/^0/, '62');
    const sendWhatsApp = () => {
        
            const message = `
        Halo, saya tertarik untuk memesan buah dari Toko Buah Terdekat di Cilacap. Bisa tolong bantu saya dengan informasi lebih lanjut tentang produk dan cara pemesanannya? Terima kasih!    `.trim()
        
            const url = `https://wa.me/${contactNumber}?text=${encodeURIComponent(message)}`
            window.open(url, '_blank')
        }
    return (
        <section id="contact" className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-6">

                {/* Title */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <h2 className="text-6xl font-extrabold font-display">
                        Lokasi
                        <span className="text-yellow-300"> Kami</span>
                    </h2>

                    <p className="mt-4 text-primary-foreground/80">
                        Kunjungi toko kami untuk pelayanan langsung atau hubungi kami melalui kontak
                        yang tersedia.
                    </p>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-10 items-start">

                    {/* Left Card */}
                    <div className="bg-white text-gray-800 rounded-3xl p-8 shadow-lg">

                        {/* Address */}
                        <div className="flex gap-3 mb-6">
                            <MapPin className="text-red-500 shrink-0"/>
                            <div>
                                <h3 className="font-semibold text-lg">
                                    {websiteInfo.nama_usaha}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {websiteInfo.alamat}
                                </p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-6">

                            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl">
                                <Phone className="text-green-600"/>
                                <div>
                                    <p className="text-sm font-medium">WhatsApp</p>
                                    <p className="text-sm text-gray-600">
                                        {websiteInfo.kontak}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 bg-gray-100 p-4 rounded-xl">
                                <Clock className="text-red-500"/>
                                <div>
                                    <p className="text-sm font-medium">Jam Operasional</p>
                                    <p className="text-sm text-gray-600">
                                        {websiteInfo.jam_operasional}
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">

                            <a href={websiteInfo.link_maps} target="_blank" className="w-full">
                                <Button
                                    className="w-full bg-yellow-500 hover:bg-yellow-600/80 text-white rounded-lg px-6 py-5">
                                    <MapPin size={18} className=""/>
                                    Buka Google Maps
                                </Button>
                            </a>

                            <Button onClick={sendWhatsApp}
                                className="w-full bg-green-500 hover:bg-green-600/80 text-white rounded-lg px-6 py-5">
                                <MessageCircle size={18} className=""/>
                                Hubungi WhatsApp
                            </Button>

                        </div>

                    </div>

                    {/* Map */}
                    <div className="rounded-3xl overflow-hidden shadow-lg">
                        <iframe src={websiteInfo.link_maps} className="w-full h-105" loading="lazy"/>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default LocationSection;