
import { Car, User, Booking } from '../types';
import { hashPassword } from './auth';

const STORAGE_KEYS = {
  CARS: 'car_rental_cars',
  USERS: 'car_rental_users',
  BOOKINGS: 'car_rental_bookings',
  CURRENT_USER: 'car_rental_current_user',
} as const;

// Initialize dummy data
export const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.CARS)) {
    const dummyCars: Car[] = [
      {
        id: '1',
        brand: 'Tesla',
        model: 'Model 3',
        year: 2023,
        pricePerDay: 89,
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop',
        category: 'luxury',
        transmission: 'automatic',
        fuelType: 'electric',
        seats: 5,
        features: ['Autopilot', 'Premium Audio', 'Glass Roof', 'Supercharging'],
        available: true,
        rating: 4.8,
        reviews: 124
      },
      {
        id: '2',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        pricePerDay: 125,
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
        category: 'suv',
        transmission: 'automatic',
        fuelType: 'petrol',
        seats: 7,
        features: ['All-Wheel Drive', 'Premium Interior', 'Navigation', 'Heated Seats'],
        available: true,
        rating: 4.7,
        reviews: 89
      },
      {
        id: '3',
        brand: 'Audi',
        model: 'A4',
        year: 2022,
        pricePerDay: 75,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        category: 'midsize',
        transmission: 'automatic',
        fuelType: 'petrol',
        seats: 5,
        features: ['Quattro AWD', 'Virtual Cockpit', 'Premium Plus', 'Bang & Olufsen'],
        available: true,
        rating: 4.6,
        reviews: 67
      },
      {
        id: '4',
        brand: 'Toyota',
        model: 'Camry',
        year: 2023,
        pricePerDay: 65,
        image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop',
        category: 'midsize',
        transmission: 'automatic',
        fuelType: 'hybrid',
        seats: 5,
        features: ['Hybrid Engine', 'Toyota Safety 2.0', 'Wireless Charging', 'JBL Audio'],
        available: true,
        rating: 4.5,
        reviews: 156
      },
      {
        id: '5',
        brand: 'Mercedes',
        model: 'C-Class',
        year: 2023,
        pricePerDay: 95,
        image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
        category: 'luxury',
        transmission: 'automatic',
        fuelType: 'petrol',
        seats: 5,
        features: ['MBUX Infotainment', 'AMG Line', 'Panoramic Roof', 'Burmester Audio'],
        available: true,
        rating: 4.7,
        reviews: 93
      },
      {
        id: '6',
        brand: 'Honda',
        model: 'Civic',
        year: 2022,
        pricePerDay: 45,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        category: 'compact',
        transmission: 'manual',
        fuelType: 'petrol',
        seats: 5,
        features: ['Honda Sensing', 'Apple CarPlay', 'LED Headlights', 'Turbo Engine'],
        available: true,
        rating: 4.4,
        reviews: 203
      },
      {
        id: '7',
        brand: 'Ford',
        model: 'Explorer',
        year: 2023,
        pricePerDay: 85,
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&h=600&fit=crop',
        category: 'suv',
        transmission: 'automatic',
        fuelType: 'petrol',
        seats: 7,
        features: ['4WD', 'Third Row Seating', 'SYNC 4', 'Co-Pilot360'],
        available: true,
        rating: 4.3,
        reviews: 78
      },
      {
        id: '8',
        brand: 'Nissan',
        model: 'Altima',
        year: 2022,
        pricePerDay: 55,
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop',
        category: 'midsize',
        transmission: 'automatic',
        fuelType: 'petrol',
        seats: 5,
        features: ['ProPILOT Assist', 'Zero Gravity Seats', 'Bose Audio', 'Remote Start'],
        available: false,
        rating: 4.2,
        reviews: 134
      },
      {
        id: '9',
        brand: 'Porsche',
        model: 'Macan',
        year: 2023,
        pricePerDay: 145,
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
        category: 'luxury',
        transmission: 'automatic',
        fuelType: 'petrol',
        seats: 5,
        features: ['Sport Chrono', 'Air Suspension', 'Bose Surround', 'Porsche Connect'],
        available: true,
        rating: 4.9,
        reviews: 45
      },
      {
        id: '10',
        brand: 'Chevrolet',
        model: 'Malibu',
        year: 2022,
        pricePerDay: 50,
        image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&h=600&fit=crop',
        category: 'midsize',
        transmission: 'automatic',
        fuelType: 'petrol',
        seats: 5,
        features: ['MyLink Infotainment', 'OnStar', 'Teen Driver', 'Wireless Charging'],
        available: true,
        rating: 4.1,
        reviews: 167
      }
    ];
    localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(dummyCars));
  }

  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const adminUser: User = {
      id: 'admin-1',
      email: 'admin@rental.com',
      password: hashPassword('admin123'),
      firstName: 'Admin',
      lastName: 'User',
      phone: '+1234567890',
      isAdmin: true,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([adminUser]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify([]));
  }
};

// Storage utilities
export const getCars = (): Car[] => {
  const cars = localStorage.getItem(STORAGE_KEYS.CARS);
  return cars ? JSON.parse(cars) : [];
};

export const setCars = (cars: Car[]): void => {
  localStorage.setItem(STORAGE_KEYS.CARS, JSON.stringify(cars));
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const setUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getBookings = (): Booking[] => {
  const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return bookings ? JSON.parse(bookings) : [];
};

export const setBookings = (bookings: Booking[]): void => {
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
};
