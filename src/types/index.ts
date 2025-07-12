
export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  image: string;
  category: 'economy' | 'compact' | 'midsize' | 'fullsize' | 'luxury' | 'suv';
  transmission: 'manual' | 'automatic';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  features: string[];
  available: boolean;
  rating: number;
  reviews: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  transactionId: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'createdAt' | 'isAdmin'>) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
