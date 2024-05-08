import React, { useEffect, useState, useContext } from 'react'
import api, { BookingURL, CreditsURL } from '../api'
import { AuthContext } from "../contexts/AuthContext";
export default function Bookings() {
    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [bookingsInfo, setBookingsInfo] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const bookingsResponse = await api.get(BookingURL + 'bookings');
            setBookingsInfo(bookingsResponse.data.data);
            setLoading(false);
        }
        fetchData();
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!currentUser) {
        return <p>You don't login</p>
    }
    if (bookingsInfo.length == 0) {
        return <p>You don't have any bookings</p>
    }

    const handleStatusToggle = async (houseId, bookingId, status, totalPrice, userId) => {
        const {data} = await api.post(BookingURL + 'toggleStatus', {
            houseId: houseId,
            bookingId: bookingId,
            status: status
        });
        totalPrice = Number(totalPrice);
        if (data.success && status === 'approved') {
            const addCreditsResponse = await api.post(CreditsURL + 'add', {creditsToAdd: totalPrice});
            if (addCreditsResponse) {
                const fetchData = async () => {
                    const bookingsResponse = await api.get(BookingURL + 'bookings');
                    setBookingsInfo(bookingsResponse.data.data);
                    setLoading(false);
                }
                fetchData();
            }
        }
        if (data.success && status === 'rejected') {
            const returnCreditsResponse = await api.post(CreditsURL + 'returnCredits', {
                userId: userId,
                creditsToAdd: totalPrice
            });
            if (returnCreditsResponse) {
                const fetchData = async () => {
                    const bookingsResponse = await api.get(BookingURL + 'bookings');
                    setBookingsInfo(bookingsResponse.data.data);
                    setLoading(false);
                }
                fetchData();
            }
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-6">Booking List</h2>
            {bookingsInfo.map((booking) => (
                <div key={booking.booking.bookingId} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                    <div className="p-4">
                        <p className="text-gray-800 text-lg font-semibold mb-2">Booking Number: {booking.booking.bookingId}</p>
                        {/* <p className="text-gray-600"><strong>User ID:</strong> {booking.uid}</p> */}
                        <p className="text-gray-600"><strong>Check-In:</strong> {new Date(booking.booking.checkIn).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Check-Out:</strong> {new Date(booking.booking.checkOut).toLocaleDateString()}</p>
                        <p className="text-gray-600"><strong>Total Price:</strong> ${booking.booking.totalPrice.toFixed(2)}</p>
                        {/* <p className="text-gray-600"><strong>Status:</strong> {booking.status}</p> */}
                    </div>
                    <div className="bg-gray-100 p-4 flex justify-end">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 mr-2 rounded"
                            onClick={() => handleStatusToggle(booking.houseId, booking.booking.bookingId, 'approved', booking.booking.totalPrice.toFixed(2), booking.booking.uid)}
                        >
                            Approve
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
                            onClick={() => handleStatusToggle(booking.houseId, booking.booking.bookingId, 'rejected', booking.booking.totalPrice.toFixed(2), booking.booking.uid)}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}