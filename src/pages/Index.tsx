
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Shield, Clock, Users, ArrowRight, Star, CheckCircle } from 'lucide-react';
import { getCars, initializeData } from '../utils/storage';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const Index = () => {
  useEffect(() => {
    initializeData();
  }, []);

  const cars = getCars().slice(0, 6);
  const stats = [
    { label: 'Happy Customers', value: '10,000+', icon: Users },
    { label: 'Cars Available', value: '500+', icon: Car },
    { label: 'Years Experience', value: '15+', icon: Shield },
    { label: '24/7 Support', value: 'Always', icon: Clock }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Fully Insured',
      description: 'All our vehicles come with comprehensive insurance coverage for your peace of mind.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need help.'
    },
    {
      icon: CheckCircle,
      title: 'Easy Booking',
      description: 'Simple and fast booking process. Reserve your car in just a few clicks.'
    },
    {
      icon: Car,
      title: 'Premium Fleet',
      description: 'Choose from our diverse collection of well-maintained, premium vehicles.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Rent Your
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Dream Car
                </span>
              </h1>
              <p className="text-xl text-blue-100 max-w-lg">
                Discover freedom on four wheels with our premium car rental service. 
                From economy to luxury, find the perfect vehicle for your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/cars">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-3">
                    Browse Cars
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-900 text-lg px-8 py-3">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <img
                  src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop"
                  alt="Premium Car"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">500+</div>
                    <div className="text-sm text-blue-100">Cars Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">24/7</div>
                    <div className="text-sm text-blue-100">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Vehicles</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium vehicles, perfect for any occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card key={car.id} className="card-hover glass-effect">
                <div className="relative">
                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {car.brand} {car.model}
                    </h3>
                    <span className="text-sm text-gray-500">{car.year}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      ${car.pricePerDay}<span className="text-sm text-gray-500">/day</span>
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {car.available ? 'Available' : 'Booked'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {car.features.slice(0, 2).map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link to={`/cars/${car.id}`}>
                    <Button className="w-full btn-primary">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/cars">
              <Button size="lg" className="btn-primary">
                View All Cars
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SwiftWheels?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and premium vehicles to make your journey memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">Ready to Hit the Road?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied customers who trust SwiftWheels for their car rental needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cars">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3">
                Browse Cars Now
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
