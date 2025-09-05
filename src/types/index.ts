export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cashier';
  phone?: string;
  companyName?: string;
  businessCategory?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  threshold: number;
  code?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface Sale {
  id: string;
  items: CartItem[];
  total: number;
  cashierName: string;
  timestamp: Date;
  paymentMethod: 'cash' | 'card' | 'upi';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export type BusinessCategory = 
  | 'kirana'
  | 'boutique' 
  | 'pharmacy'
  | 'hardware'
  | 'other';