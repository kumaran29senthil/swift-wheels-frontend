
import React, { useState } from 'react';
import { Car, Users, CreditCard, BarChart3, Plus, Edit, Trash2 } from 'lucide-react';
import { getCars, getUsers, getBookings, setCars } from '../utils/storage';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';

const AdminDashboard = () => {
  const [cars] = useState(getCars());
  const [users] = useState(getUsers());
  const [bookings] = useState(getBookings());

  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0);
  const activeBookings = bookings.filter(booking => booking.status === 'confirmed').length;
  const availableCars = cars.filter(car => car.available).length;

  const stats = [
    {
      title: 'Total Cars',
      value: cars.length,
      icon: Car,
      color: 'text-blue-600'
    },
    {
      title: 'Total Users',
      value: users.length,
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Active Bookings',
      value: activeBookings,
      icon: BarChart3,
      color: 'text-orange-600'
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: CreditCard,
      color: 'text-purple-600'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your car rental business</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cars" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cars">Cars Management</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* Cars Management */}
          <TabsContent value="cars" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Cars Management</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Car
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car) => (
                <Card key={car.id}>
                  <div className="relative">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge 
                      className={`absolute top-2 right-2 ${
                        car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {car.available ? 'Available' : 'Booked'}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-600 mb-2">{car.year} • {car.category}</p>
                    <p className="text-blue-600 font-bold mb-4">
                      ${car.pricePerDay}/day
                    </p>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bookings */}
          <TabsContent value="bookings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
            
            <div className="space-y-4">
              {bookings.map((booking) => {
                const car = cars.find(c => c.id === booking.carId);
                const user = users.find(u => u.id === booking.userId);
                
                return (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                        <div className="flex items-center space-x-3">
                          {car && (
                            <img
                              src={car.image}
                              alt={`${car.brand} ${car.model}`}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div>
                            <p className="font-medium">
                              {car ? `${car.brand} ${car.model}` : 'Unknown Car'}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Rental Period</p>
                          <p className="font-medium">
                            {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-gray-500">Total Amount</p>
                          <p className="font-bold text-blue-600">${booking.totalAmount}</p>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">All Users</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {user.firstName} {user.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Phone:</span>
                        <span className="ml-2">{user.phone}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Joined:</span>
                        <span className="ml-2">{formatDate(user.createdAt)}</span>
                      </div>
                      <div>
                        <Badge variant={user.isAdmin ? 'default' : 'secondary'}>
                          {user.isAdmin ? 'Admin' : 'Customer'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
