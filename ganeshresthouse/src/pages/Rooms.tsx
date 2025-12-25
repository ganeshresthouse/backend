import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Room } from '../data/rooms';
import { roomService } from '../services/roomService';
import { RoomCard } from '../components/RoomCard';
import { SearchForm } from '../components/SearchForm';

export function Rooms() {
    const [searchParams] = useSearchParams();
    const [filterType, setFilterType] = useState<string>('all');
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const checkIn = searchParams.get('checkIn');
                const checkOut = searchParams.get('checkOut');
                const guestsParam = searchParams.get('guests');

                let data;
                if (checkIn && checkOut) {
                    data = await roomService.searchRooms(checkIn, checkOut, guestsParam || '');
                } else {
                    data = await roomService.getAllRooms();
                }
                setRooms(data);
                setError(null);
            } catch (err: any) {
                setError(err.message || 'Failed to load rooms. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, [searchParams]);

    const guests = parseInt(searchParams.get('guests') || '1');

    const filteredRooms = useMemo(() => {
        return rooms.filter(room => {
            // Filter by capacity (must accommodate at least the requested guests)
            if (room.capacity < guests) return false;

            // Filter by type
            if (filterType !== 'all' && room.type !== filterType) return false;

            return true;
        });
    }, [rooms, guests, filterType]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading rooms...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-16">
            {/* Search Header */}
            <div className="bg-white shadow-sm py-8 mb-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl font-bold mb-6">Find Your Perfect Room</h1>
                    <SearchForm className="shadow-none border border-gray-200" />

                    {error && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3 text-red-700">
                            <span className="font-semibold px-3 py-1 bg-red-100 rounded-full text-sm">Error</span>
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Filters */}
                <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
                    {['all', 'Single', 'Double', 'Dormitory'].map((type) => (
                        <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`px-6 py-2 rounded-full capitalize whitespace-nowrap transition-colors ${filterType === type
                                ? 'bg-primary text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {type === 'all' ? 'All Rooms' : type}
                        </button>
                    ))}
                </div>

                {/* Room Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredRooms.map((room) => (
                        <RoomCard key={room.id} room={room} searchParams={searchParams} />
                    ))}
                </div>

                {filteredRooms.length === 0 && (
                    <div className="text-center py-16">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No rooms found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
