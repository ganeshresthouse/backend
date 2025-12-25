const API_URL = 'http://localhost:8081/api/payment';

export interface PaymentOrder {
    amount: number;
    orderId: string;
    currency: string;
    status: string;
}

export const paymentService = {
    createOrder: async (bookingId: number): Promise<PaymentOrder> => {
        try {
            const response = await fetch(`${API_URL}/create/${bookingId}`, {
                method: 'POST',
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Failed to create payment order');
            }

            return await response.json();
        } catch (error: any) {
            console.error('Error creating payment order:', error);
            throw error;
        }
    },

    verifyPayment: async (paymentData: {
        razorpay_order_id: string;
        razorpay_payment_id: string;
        razorpay_signature: string;
    }): Promise<any> => {
        try {
            const response = await fetch(`${API_URL}/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Payment verification failed');
            }

            return await response.json();
        } catch (error: any) {
            console.error('Error verifying payment:', error);
            throw error;
        }
    }
};
