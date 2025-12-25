import type { Room } from '../data/rooms';

const API_URL = 'http://localhost:8081/api/rooms';

const mapBackendRoomToFrontendRoom = (room: any): Room => {
    // Determine capacity based on room type
    let capacity = 1;
    let type: 'Single' | 'Double' | 'Dormitory' = 'Single';

    const apiType = room.roomType?.toUpperCase();
    if (apiType === 'DOUBLE') {
        capacity = 3;
        type = 'Double';
    } else if (apiType === 'DORMITORY') {
        capacity = 1;
        type = 'Dormitory';
    } else {
        capacity = 2; // Single rooms can accommodate 2 guests per backend rules
        type = 'Single';
    }

    return {
        id: String(room.id),
        name: `Room ${room.roomNumber}`,
        type: type,
        price: room.pricePerNight,
        capacity: capacity,
        description: `Comfortable ${type.toLowerCase()} room with modern amenities.`,
        image: room.imageUrl || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000',
        amenities: ['Free Wi-Fi', 'Daily Housekeeping', '24/7 Support'] // Default amenities since API doesn't provide them yet
    };
};

export const roomService = {
    getAllRooms: async (): Promise<Room[]> => {
        try {
            const response = await fetch(`${API_URL}/getallrooms`);
            if (!response.ok) {
                throw new Error('Failed to fetch rooms');
            }
            const data = await response.json();
            return data.map(mapBackendRoomToFrontendRoom);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            throw error;
        }
    },

    searchRooms: async (checkIn: string, checkOut: string, guests: string): Promise<Room[]> => {
        try {
            const response = await fetch(`${API_URL}/search?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to search rooms');
            }
            const data = await response.json();
            return data.map(mapBackendRoomToFrontendRoom);
        } catch (error: any) {
            console.error('Error searching rooms:', error);
            throw error;
        }
    }
};
