import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Bath, Check, CreditCard, Lock, Users, Wifi, Wind } from 'lucide-react';
import type { Room } from '../data/rooms';
import { roomService } from '../services/roomService';
import { bookingService } from '../services/bookingService';
import { paymentService } from '../services/paymentService';
import { Button } from '../components/ui/Button';

export function Booking() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [room, setRoom] = useState<Room | undefined>(undefined);
    const [isLoadingRoom, setIsLoadingRoom] = useState(true);
    const [loadingError, setLoadingError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const rooms = await roomService.getAllRooms();
                const foundRoom = rooms.find(r => r.id === id);
                setRoom(foundRoom);
            } catch (err) {
                setLoadingError('Failed to load room details.');
            } finally {
                setIsLoadingRoom(false);
            }
        };
        fetchRoom();
    }, [id]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        checkIn: '',
        checkOut: '',
        guests: 1,

    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [bookingError, setBookingError] = useState<string | null>(null);
    const [summary, setSummary] = useState<any>(null);

    // Initialize form with URL params
    useEffect(() => {
        const checkIn = searchParams.get('checkIn');
        const checkOut = searchParams.get('checkOut');
        const guests = searchParams.get('guests');

        if (checkIn || checkOut || guests) {
            setFormData(prev => ({
                ...prev,
                checkIn: checkIn || prev.checkIn,
                checkOut: checkOut || prev.checkOut,
                guests: guests ? parseInt(guests) : prev.guests
            }));
        }
    }, [searchParams]);

    const nights = useMemo(() => {
        if (!formData.checkIn || !formData.checkOut) return 0;
        const start = new Date(formData.checkIn);
        const end = new Date(formData.checkOut);
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    }, [formData.checkIn, formData.checkOut]);

    const totalPrice = useMemo(() => {
        if (!room) return 0;
        return room.price * (nights || 1);
    }, [room, nights]);


    if (isLoadingRoom) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-xl text-gray-600">Loading room details...</div>
            </div>
        );
    }

    if (loadingError) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <div className="text-xl text-red-600 mb-4">{loadingError}</div>
                <Button onClick={() => navigate('/rooms')}>Back to Rooms</Button>
            </div>
        );
    }

    if (!room) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold mb-4">Room not found</h2>
                <Button onClick={() => navigate('/rooms')}>Back to Rooms</Button>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setBookingError(null);

        try {
            // 1. Create Booking
            const bookingData = {
                roomId: parseInt(room.id),
                checkIn: formData.checkIn,
                checkOut: formData.checkOut,
                guests: formData.guests,
                fullName: formData.name,
                email: formData.email,
                phone: formData.phone
            };

            const bookingResult = await bookingService.createBooking(bookingData);

            // 2. Create Payment Order
            const orderResult = await paymentService.createOrder(bookingResult.id);

            // 3. Initialize Razorpay
            const options = {
                key: 'rzp_test_RuhTa4XOhS99d4', // ✅ Updated with your KEY_ID
                amount: orderResult.amount,
                currency: orderResult.currency,
                name: 'Ganesh Rest House',
                description: `Payment for Room ${room.name}`,
                order_id: orderResult.orderId,
                handler: async function (response: any) {
                    try {
                        setIsProcessing(true);
                        // 4. Verify Payment on Backend
                        await paymentService.verifyPayment({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature
                        });

                        setSummary({
                            ...bookingResult,
                            id: bookingResult.id,
                            amount: bookingResult.amount,
                            status: 'PAID' // Assuming verification makes it PAID
                        });
                        setIsSubmitted(true);
                    } catch (verifyErr: any) {
                        setBookingError(verifyErr.message || 'Payment verification failed');
                    } finally {
                        setIsProcessing(false);
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone
                },
                theme: {
                    color: '#2563eb'
                },
                modal: {
                    ondismiss: function () {
                        setIsProcessing(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (err: any) {
            setBookingError(err.message || 'Failed to process booking. Please try again.');
            setIsProcessing(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                    Thank you for booking with Ganesh Rest House. We have sent a confirmation email to <span className="font-semibold">{formData.email}</span>.
                </p>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 w-full max-w-md text-left">
                    <h3 className="font-bold border-b pb-2 mb-4">Booking Summary</h3>
                    <p><span className="text-gray-500">Booking ID:</span> #{summary?.id}</p>
                    <p><span className="text-gray-500">Room:</span> {room.name}</p>
                    <p><span className="text-gray-500">Check-In:</span> {formData.checkIn}</p>
                    <p><span className="text-gray-500">Check-Out:</span> {formData.checkOut}</p>
                    <p><span className="text-gray-500">Amount:</span> ₹{summary?.amount}</p>
                    <p><span className="text-gray-500">Status:</span> <span className="text-blue-600 font-semibold">{summary?.status}</span></p>
                </div>
                <Button onClick={() => navigate('/')}>Return Home</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Room Details */}
                    <div>
                        <img
                            src={room.image}
                            alt={room.name}
                            className="w-full h-[400px] object-cover rounded-2xl shadow-lg mb-8"
                        />

                        <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
                        <div className="flex items-center gap-4 text-2xl font-bold text-primary mb-6">
                            ₹{room.price} <span className="text-base font-normal text-gray-500">/ night</span>
                        </div>

                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">{room.description}</p>

                        <h3 className="text-xl font-bold mb-4">Amenities</h3>
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {room.amenities.map(amenity => (
                                <div key={amenity} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                                    {amenity.includes('Wi-Fi') && <Wifi className="h-5 w-5 text-primary" />}
                                    {amenity.includes('AC') && <Wind className="h-5 w-5 text-primary" />}
                                    {amenity.includes('Bath') && <Bath className="h-5 w-5 text-primary" />}
                                    {!amenity.includes('Wi-Fi') && !amenity.includes('AC') && !amenity.includes('Bath') && <Users className="h-5 w-5 text-primary" />}
                                    <span>{amenity}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Booking & Payment Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg h-fit border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6">Book This Room</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Guest Details */}
                            <div className="border-b border-gray-100 pb-6">
                                <h3 className="text-lg font-semibold mb-4">Guest Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Check In</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={formData.checkIn}
                                            onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Check Out</label>
                                        <input
                                            type="date"
                                            required
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={formData.checkOut}
                                            onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <label className="text-sm font-medium text-gray-700">Guests</label>
                                    <select
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={formData.guests}
                                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                                    >
                                        {[...Array(room.capacity)].map((_, i) => (
                                            <option key={i + 1} value={i + 1}>{i + 1} Guest{i !== 0 && 's'}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 mb-4">
                                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <input
                                            type="tel"
                                            required
                                            placeholder="+91 98765 43210"
                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Details */}


                            {bookingError && (
                                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                    {bookingError}
                                </div>
                            )}

                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-600 font-medium">Total Price</span>
                                        {nights > 0 && (
                                            <span className="text-xs text-gray-500">₹{room.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                                        )}
                                    </div>
                                    <span className="text-2xl font-bold text-primary">₹{totalPrice}</span>
                                </div>
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full relative"
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <span className="flex items-center gap-2">
                                            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                            Processing Payment...
                                        </span>
                                    ) : (
                                        'Confirm & Pay'
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
