import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export function Contact() {

    return (
        <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-16">Contact Us</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-gray-600 mb-8">
                                Have questions about your stay? Need help with a booking?
                                Our friendly staff is available 24/7 to assist you.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                                    <p className="text-gray-600">dindi bolagi center main Road, NH-216<br />AP, India 533253</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Phone className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                                    <p className="text-gray-600">+91 8096905259</p>
                                    <p className="text-gray-600">+91 9908156339</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Mail className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                                    <p className="text-gray-600">info@ganeshresthouse.com</p>
                                    <p className="text-gray-600">bookings@ganeshresthouse.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                                    <Clock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Working Hours</h3>
                                    <p className="text-gray-600">Check-in: 10:00 AM</p>
                                    <p className="text-gray-600">Check-out: 10:00 AM</p>
                                    <p className="text-gray-600 text-sm mt-1">(Front desk open 24/7)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Image */}
                    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl group">
                        <img
                            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000"
                            alt="Ganesh Rest House Exterior"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                            <p className="text-white text-xl font-medium italic">"Your home away from home in the heart of Dindi."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
