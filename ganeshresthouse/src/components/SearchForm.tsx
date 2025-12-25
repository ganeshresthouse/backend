import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { Button } from './ui/Button';

export function SearchForm({ className }: { className?: string }) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [dates, setDates] = useState({
        checkIn: searchParams.get('checkIn') || '',
        checkOut: searchParams.get('checkOut') || ''
    });
    const [guests, setGuests] = useState(parseInt(searchParams.get('guests') || '1'));

    // Update local state if URL params change (e.g. navigation)
    useEffect(() => {
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const guestsParam = searchParams.get('guests');

        if (checkIn || checkOut || guestsParam) {
            setDates({
                checkIn: checkIn || '',
                checkOut: checkOut || ''
            });
            setGuests(guestsParam ? parseInt(guestsParam) : 1);
        }
    }, [searchParams]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/rooms?checkIn=${dates.checkIn}&checkOut=${dates.checkOut}&guests=${guests}`);
    };

    return (
        <form onSubmit={handleSubmit} className={`bg-white p-6 rounded-lg shadow-lg ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Check In</label>
                    <div className="relative">
                        <input
                            type="date"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={dates.checkIn}
                            onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                            required
                        />
                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Check Out</label>
                    <div className="relative">
                        <input
                            type="date"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={dates.checkOut}
                            onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                            required
                        />
                        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Guests</label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            max="10"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                        />
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <Button type="submit" className="w-full">Search Available Rooms</Button>
            </div>
        </form>
    );
}
