export interface Room {
    id: string;
    name: string;
    type: 'Single' | 'Double' | 'Dormitory';
    price: number;
    capacity: number;
    description: string;
    image: string;
    amenities: string[];
}

export const rooms: Room[] = [
    ...Array.from({ length: 15 }).map((_, i) => ({
        id: `room-${i + 1}`,
        name: `Standard Single Room ${i + 1}`,
        type: 'Single' as const,
        price: 800,
        capacity: 1,
        description: 'Cozy single room perfect for solo travelers. Includes basic amenities for a comfortable stay.',
        image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=1000',
        amenities: ['Free Wi-Fi', 'TV', 'Attached Bathroom', 'Fan'],
    })),
    ...Array.from({ length: 20 }).map((_, i) => ({
        id: `room-${i + 16}`,
        name: `Deluxe Double Room ${i + 16}`,
        type: 'Double' as const,
        price: 1500,
        capacity: 2,
        description: 'Spacious double room suitable for couples or friends. Features modern furnishings.',
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1000',
        amenities: ['Free Wi-Fi', 'AC', 'TV', 'Attached Bathroom', 'Hot Water'],
    })),
    {
        id: 'dorm-1',
        name: 'Mixed Dormitory',
        type: 'Dormitory' as const,
        price: 300,
        capacity: 10,
        description: 'Budget-friendly dormitory bed in a clean and safe environment.',
        image: 'https://images.unsplash.com/photo-1555854785-985c9e3a1e63?auto=format&fit=crop&q=80&w=1000',
        amenities: ['Shared Bathroom', 'Locker', 'Free Wi-Fi', 'Fan'],
    }
];
