import React from 'react';
import { Calendar, Car, Clock, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getBookings, getCars } from '../utils/storage';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const BookingsPage = () => {
  const { user } = useAuth();
  const allBookings = getBookings();
  const cars = getCars();
  
  const userBookings = user ? allBookings.filter(booking => booking.userId === user.id) : [];

  const getCarDetails = (carId: string) => {
    return cars.find(car => car.id === carId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">My Bookings</h1>
          <p className="text-gray-600">View and manage your car rental bookings</p>
        </div>

        {userBookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Car className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-500">You haven't made any car reservations yet.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {userBookings.map((booking) => {
              const car = getCarDetails(booking.carId);
              if (!car) return null;

              return (
                <Card key={booking.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">
                        {car.brand} {car.model}
                      </CardTitle>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <div className="font-medium">{car.year}</div>
                          <div className="text-sm text-gray-500">{car.category}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">Pickup Date</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDate(booking.startDate)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">Return Date</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formatDate(booking.endDate)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium">Total Amount</span>
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          ${booking.totalPrice}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>
                          Booked on {formatDate(booking.createdAt)} • 
                          Transaction ID: {booking.transactionId}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookingsPage;
