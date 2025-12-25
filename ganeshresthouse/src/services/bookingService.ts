const API_URL = 'http://localhost:8081/api/bookings';

export interface BookingRequest {
    roomId: number;
    checkIn: string;
    checkOut: string;
    guests: number;
    fullName: string;
    email: string;
    phone: string;
}

export interface BookingResponse {
    id: number;
    createdAt: string;
    room: any;
    checkIn: string;
    checkOut: string;
    fullName: string;
    email: string;
    phone: string;
    guests: number;
    amount: number;
    status: string;
    razorpayOrderId: string | null;
    razorpayPaymentId: string | null;
}

export const bookingService = {
    createBooking: async (bookingData: BookingRequest): Promise<BookingResponse> => {
        try {
            const response = await fetch(`${API_URL}/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to create booking');
            }

            return await response.json();
        } catch (error: any) {
            console.error('Error creating booking:', error);
            throw error;
        }
    }
};
