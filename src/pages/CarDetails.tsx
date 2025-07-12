
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Users, Fuel, Gauge, Shield } from 'lucide-react';
import { getCars } from '../utils/storage';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import NotFound from './NotFound';

const CarDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const cars = getCars();
  const car = cars.find(c => c.id === id);

  if (!car) {
    return <NotFound />;
  }

  const handleBookNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/checkout/${car.id}`);
  };

  const carSpecs = [
    { icon: Users, label: 'Passengers', value: car.passengers },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: Gauge, label: 'Transmission', value: car.transmission },
    { icon: Shield, label: 'Insurance', value: 'Included' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/cars" className="inline-flex items-center text-blue-600 hover:text-blue-500">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cars
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Car Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{car.rating}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Car Details */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {car.brand} {car.model}
                </h1>
                <span className="text-lg text-gray-500">{car.year}</span>
              </div>
              <p className="text-gray-600">{car.description}</p>
            </div>

            {/* Price and Availability */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">
                      ${car.pricePerDay}
                    </span>
                    <span className="text-gray-500 ml-2">per day</span>
                  </div>
                  <span className={`px-4 py-2 rounded-full font-medium ${
                    car.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {car.available ? 'Available' : 'Currently Booked'}
                  </span>
                </div>
                
                <Button 
                  onClick={handleBookNow}
                  disabled={!car.available}
                  className="w-full"
                  size="lg"
                >
                  {car.available ? 'Book Now' : 'Not Available'}
                </Button>
              </CardContent>
            </Card>

            {/* Car Specifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {carSpecs.map((spec, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <spec.icon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-sm text-gray-500">{spec.label}</div>
                        <div className="font-medium">{spec.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {car.features.map((feature, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-md"
                    >
                      {feature}
                    </span>
                  ))}
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

export default CarDetails;
