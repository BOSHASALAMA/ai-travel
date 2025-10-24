"use client"
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { 
    Calendar, 
    Users, 
    DollarSign, 
    Mail, 
    Phone,
    CheckCircle,
    ArrowLeft,
    Search,
    User,
    CreditCard,
    MapPin
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';


function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [confirmingId, setConfirmingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const {user} = useUser()

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        filterBookings();
    }, [bookings, searchTerm]);

    const fetchBookings = async () => {
        try {
            const response = await fetch('/api/checkout');
            const data = await response.json();
            console.log("Fetched bookings data:", data);
            if (data.success) {
                const userBookings = data.data.filter(booking => booking.email === user?.primaryEmailAddress?.emailAddress);
                const filteredData = userBookings || [];
                setBookings(filteredData);
            } else {
                setError('Failed to fetch bookings');
            }
        } catch (err) {
            setError('Error loading bookings');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filterBookings = () => {
        let filtered = bookings;

        if (searchTerm) {
            filtered = filtered.filter(booking => 
                booking.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                booking.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBookings(filtered);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Not set';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const calculateDays = (checkIn, checkOut) => {
        if (!checkIn || !checkOut) return 0;
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-b-slate-600"></div>
            </div>
        );
    }


    // open confirmation modal for the booking id
    const requestCancel = (id) => {
        setConfirmingId(id);
    }

    // performs the delete, used by the modal Confirm button
    const doCancel = async (id) => {
        try {
            setError(null);
            setDeletingId(id);

            const res = await fetch(`/api/checkout/${id}`, { method: 'DELETE' });

            if (!res.ok) {
                let body = null;
                try { body = await res.json(); } catch (e) {}
                const msg = body?.message || `Failed to cancel booking (status ${res.status})`;
                throw new Error(msg);
            }

            setBookings(prev => prev.filter(b => b.id !== id));
            toast.success('Booking cancelled');
            setConfirmingId(null);
        } catch (err) {
            console.error('Cancel error:', err);
            const msg = err.message || 'Error cancelling booking';
            setError(msg);
            toast.error(msg);
        } finally {
            setDeletingId(null);
            fetchBookings();
        }
    }

    return (
        <div className="min-h-screen mt-5 bg-gradient-to-br from-slate-900 to-slate-950">
            {/* Header */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button 
                                onClick={() => router.push('/destinationsList')}
                                className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to Destinations
                            </Button>
                            <div>
                                <h1 className="text-3xl font-bold text-blue-600">My Bookings</h1>
                                <p className="text-gray-300">Manage your travel reservations</p>
                            </div>
                        </div>
                        
                        <div className="text-right">
                            <div className="text-2xl font-bold text-gray-400">{filteredBookings.length}</div>
                            <div className="text-sm text-gray-300">Total Bookings</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Search Bar */}
                <div className="bg-slate-900 rounded-xl p-6 shadow-lg mb-8">
                    <div className="relative">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 py-2 mt-2  bg-slate-900 text-gray-400 rounded-md border-1 border-gray-400  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                        <div className="flex items-center">
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-3">
                                <span className="text-white text-sm">!</span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-red-800">Error</h3>
                                <p className="text-red-600">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* success messages are shown via sonner toasts */}

                {filteredBookings.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📅</div>
                        <h2 className="text-2xl font-bold text-gray-300 mb-2">No bookings found</h2>
                        <p className="text-gray-300 mb-6">
                            {searchTerm 
                                ? 'Try adjusting your search criteria'
                                : 'Start your journey by booking your first destination!'
                            }
                        </p>
                        <Button 
                            onClick={() => router.push('/destinationsList')}
                            className="bg-[#f78547] hover:bg-[#e67435]"
                        >
                            Browse Destinations
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBookings.map((booking) => (
                            <div key={booking.id} className="bg-slate-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-400">
                                                    Booking #{booking.id}
                                                </h3>
                                                <p className="text-gray-300 text-sm">
                                                    Confirmed booking
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-blue-600">
                                                ${booking.price}
                                            </div>
                                            <div className="text-gray-300 text-sm">
                                                ${Math.round(booking.price / booking.travelers)} per person
                                            </div>
                                        </div>
                                    </div>

                                    {/* Booking Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {/* Guest Information */}
                                        <div className="bg-slate-950 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-400 mb-3 flex items-center">
                                                <User className="w-5 h-5 mr-2 text-blue-600" />
                                                Guest Information
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <span className="text-gray-300">Name: </span>
                                                    <span className="font-medium text-gray-300">{booking.firstName} {booking.lastName}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                                    <span className="text-gray-300 ">{booking.email}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                                                    <span className="text-gray-300">{booking.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Trip Details */}
                                        <div className="bg-slate-950 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-400 mb-3 flex items-center">
                                                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                                                Trip Details
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center">
                                                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                                                    <span className='text-gray-300'>{booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-300">Check-in: </span>
                                                    <span className="font-medium text-gray-300">{formatDate(booking.checkInDate)}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-300">Check-out: </span>
                                                    <span className="font-medium text-gray-300">{formatDate(booking.checkOutDate)}</span>
                                                </div>
                                                <div className="mt-2 pt-2 border-t border-blue-200">
                                                    <span className="text-blue-600 font-medium">
                                                        {calculateDays(booking.checkInDate, booking.checkOutDate)} nights
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className="bg-slate-950 rounded-lg p-4">
                                            <h4 className="font-semibold text-gray-400 mb-3 flex items-center">
                                                <CreditCard className="w-5 h-5 mr-2 text-green-500" />
                                                Payment Summary
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Per person:</span>
                                                    <span className="font-medium text-gray-300">${Math.round(booking.price / booking.travelers)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-300">Travelers:</span>
                                                    <span className="font-medium text-gray-300">{booking.travelers}</span>
                                                </div>
                                                <div className="flex justify-between pt-2 border-t border-green-200">
                                                    <span className="font-semibold text-gray-300">Total:</span>
                                                    <span className="font-bold text-green-600">${booking.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
                                        <Button 
                                            className=" hover:text-blue-600 hover:bg-blue-50"
                                        >
                                            View Details
                                        </Button>
                                        
                                        <Button 
                                            className="bg-slate-950 hover:bg-slate-500 hover:text-slate-950"
                                        >
                                            Download Receipt
                                        </Button>
                                        
                                        <Button 
                                            className="bg-slate-950 hover:bg-slate-500 hover:text-slate-950"
                                        >
                                            Contact Support
                                        </Button>
                                        
                                        <Button 
                                            variant="destructive"
                                            className="ml-auto"
                                            onClick={() => requestCancel(booking.id)}
                                            disabled={deletingId === booking.id}
                                        >
                                            {deletingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Confirmation modal (simple inline implementation) */}
                {confirmingId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/50" onClick={() => setConfirmingId(null)} />
                        <div className="bg-slate-900 rounded-lg p-6 z-10 w-11/12 max-w-lg mx-auto">
                            <h3 className="text-lg font-semibold text-gray-200 mb-2">Cancel booking</h3>
                            <p className="text-gray-400 mb-4">Are you sure you want to cancel this booking? This action cannot be undone.</p>
                            <div className="flex justify-end gap-3">
                                <Button onClick={() => setConfirmingId(null)} variant="outline" className="text-gray-300">Close</Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => doCancel(confirmingId)}
                                    disabled={deletingId === confirmingId}
                                >
                                    {deletingId === confirmingId ? 'Cancelling...' : 'Confirm Cancel'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Summary Stats */}
                {bookings.length > 0 && (
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {bookings.length}
                            </div>
                            <div className="text-gray-300">Total Bookings</div>
                        </div>
                        
                        <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-blue-500 mb-2">
                                {bookings.reduce((sum, booking) => sum + booking.travelers, 0)}
                            </div>
                            <div className="text-gray-300">Total Travelers</div>
                        </div>
                        
                        <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-green-500 mb-2">
                                ${bookings.reduce((sum, booking) => sum + booking.price, 0)}
                            </div>
                            <div className="text-gray-300">Total Revenue</div>
                        </div>

                        <div className="bg-slate-900 rounded-xl p-6 shadow-lg text-center">
                            <div className="text-3xl font-bold text-purple-500 mb-2">
                                {Math.round(bookings.reduce((sum, booking) => sum + booking.price, 0) / bookings.length) || 0}
                            </div>
                            <div className="text-gray-300">Avg. Booking Value</div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8 text-center">
                    <div className="bg-slate-900 rounded-xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-gray-400 mb-4">Quick Actions</h2>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                onClick={() => router.push('/destinationsList')}
                                className="hover:text-blue-600 hover:bg-blue-50 flex items-center gap-2"
                            >
                                <MapPin className="w-4 h-4" />
                                Browse Destinations
                            </Button>
                            
                            <Button 
                                onClick={fetchBookings}
                                className="bg-slate-950 hover:bg-slate-500 hover:text-slate-950"
                            >
                                Refresh Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingsPage; 