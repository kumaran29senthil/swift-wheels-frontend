
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, CreditCard, User, Car } from 'lucide-react';
import { getCars, addBooking } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import NotFound from './NotFound';

const CheckoutPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const cars = getCars();
  const car = cars.find(c => c.id === carId);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!car) {
    return <NotFound />;
  }

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const totalDays = calculateDays();
  const subtotal = totalDays * car.pricePerDay;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to make a booking');
      navigate('/login');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select pickup and return dates');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error('Return date must be after pickup date');
      return;
    }

    if (new Date(startDate) < new Date()) {
      toast.error('Pickup date cannot be in the past');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const booking = {
        id: Date.now().toString(),
        userId: user.id,
        carId: car.id,
        startDate,
        endDate,
        totalAmount: total,
        status: 'confirmed' as const,
        transactionId: `TXN${Date.now()}`,
        createdAt: new Date().toISOString()
      };

      addBooking(booking);
      
      // Simulate email notification
      toast.success('Booking confirmed! Email sent to your registered email address');
      
      setTimeout(() => {
        navigate('/bookings');
      }, 1500);
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600">Complete your car rental booking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Customer Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input value={user?.firstName || ''} disabled />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input value={user?.lastName || ''} disabled />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={user?.email || ''} disabled />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={user?.phone || ''} disabled />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Rental Dates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Pickup Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Return Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isProcessing || !car.available}
                  >
                    {isProcessing ? 'Processing...' : `Confirm Booking - $${total.toFixed(2)}`}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Vehicle Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-600">{car.year} • {car.category}</p>
                    <p className="text-blue-600 font-medium">
                      ${car.pricePerDay}/day
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex flex-wrap gap-1">
                    {car.features.slice(0, 4).map((feature, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="h-5 w-5" />
                  <span>Booking Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Rental period</span>
                  <span>{totalDays} day{totalDays !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily rate</span>
                  <span>${car.pricePerDay}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
