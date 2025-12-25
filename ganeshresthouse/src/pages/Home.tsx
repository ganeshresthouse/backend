import { Link } from 'react-router-dom';
import { Wifi, Tv, Coffee, Car } from 'lucide-react';
import { SearchForm } from '../components/SearchForm';
import { Button } from '../components/ui/Button';

export function Home() {
    return (
        <div className="flex flex-col gap-16 pb-16">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000")',
                    }}
                >
                    <div className="absolute inset-0 bg-black/50" />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Ganesh Rest House</h1>
                    <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                        Experience comfort and tranquility in our 35 beautifully appointed rooms.
                    </p>

                    <div className="max-w-4xl mx-auto text-black">
                        <SearchForm />
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Our Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                        { icon: Wifi, label: 'Free Wi-Fi' },
                        { icon: Tv, label: 'Smart TV' },
                        { icon: Coffee, label: 'Coffee Service' },
                        { icon: Car, label: 'Free Parking' },
                    ].map(({ icon: Icon, label }) => (
                        <div key={label} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                            <Icon className="h-10 w-10 text-primary mb-4" />
                            <span className="font-semibold text-lg">{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Info Section */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <img
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000"
                                alt="Hotel Interior"
                                className="rounded-xl shadow-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                                Located in the heart of the city, Ganesh Rest House offers the perfect blend of
                                convenience and comfort. Whether you're traveling solo, with family, or in a group,
                                our diverse range of rooms including singles, doubles, and dormitories caters to all needs.
                            </p>
                            <Link to="/rooms">
                                <Button size="lg">View All Rooms</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
