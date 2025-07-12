
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import { getCars } from '../utils/storage';
import { Car } from '../types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const CarsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const cars = getCars();
  const brands = Array.from(new Set(cars.map(car => car.brand)));

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBrand = brandFilter === 'all' || car.brand === brandFilter;
      
      const matchesPrice = priceRange === 'all' ||
                          (priceRange === 'low' && car.pricePerDay <= 50) ||
                          (priceRange === 'medium' && car.pricePerDay > 50 && car.pricePerDay <= 100) ||
                          (priceRange === 'high' && car.pricePerDay > 100);
      
      const matchesAvailability = availabilityFilter === 'all' ||
                                 (availabilityFilter === 'available' && car.available) ||
                                 (availabilityFilter === 'booked' && !car.available);

      return matchesSearch && matchesBrand && matchesPrice && matchesAvailability;
    });
  }, [cars, searchTerm, brandFilter, priceRange, availabilityFilter]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Cars</h1>
          <p className="text-gray-600">Find the perfect car for your journey</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search cars..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map(brand => (
                  <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">$0 - $50</SelectItem>
                <SelectItem value="medium">$51 - $100</SelectItem>
                <SelectItem value="high">$100+</SelectItem>
              </SelectContent>
            </Select>

            <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cars</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="booked">Booked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCars.length} of {cars.length} cars
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card key={car.id} className="hover:shadow-lg transition-shadow">
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
                  {car.features.slice(0, 3).map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md">
                      {feature}
                    </span>
                  ))}
                </div>
                <Link to={`/cars/${car.id}`}>
                  <Button className="w-full">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CarsPage;
