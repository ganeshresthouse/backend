import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-4">Ganesh Rest House</h3>
                        <p className="mb-4">
                            Providing comfortable and affordable accommodation for travelers.
                            Experience the best hospitality with us.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-primary" />
                                <span>dindi bolagi center main Road, NH-216, AP</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary" />
                                <span>+91 8096905269</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary" />
                                <span>info@ganeshresthouse.com</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-6 w-6" />
                            </a>
                            <a href="#" className="hover:text-primary transition-colors">
                                <Instagram className="h-6 w-6" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} Ganesh Rest House. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
