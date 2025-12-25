import { Users, Wifi, Wind, Bath } from 'lucide-react';
import type { Room } from '../data/rooms';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

interface RoomCardProps {
    room: Room;
    searchParams?: URLSearchParams;
}

export function RoomCard({ room, searchParams }: RoomCardProps) {
    const checkIn = searchParams?.get('checkIn') || '';
    const checkOut = searchParams?.get('checkOut') || '';
    const guests = searchParams?.get('guests') || '1';

    const bookingLink = `/booking/${room.id}?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
            <div className="relative h-64">
                <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-primary shadow-sm">
                    {room.type}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{room.name}</h3>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-primary">₹{room.price}</span>
                        <span className="text-gray-500 text-sm">/night</span>
                    </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2">{room.description}</p>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>Up to {room.capacity} Guests</span>
                    </div>
                    {room.amenities.slice(0, 3).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                            {amenity.includes('Wi-Fi') && <Wifi className="h-4 w-4" />}
                            {amenity.includes('AC') && <Wind className="h-4 w-4" />}
                            {amenity.includes('Bath') && <Bath className="h-4 w-4" />}
                            <span>{amenity}</span>
                        </div>
                    ))}
                </div>

                <Link to={bookingLink} className="block">
                    <Button className="w-full">Book Now</Button>
                </Link>
            </div>
        </div>
    );
}
