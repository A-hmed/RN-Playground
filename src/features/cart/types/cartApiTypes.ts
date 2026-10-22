import { Product } from '../../products/types/productTypes';

export interface ApiCartItem {
  _id: string;
  count: number;
  price: number;
  product: Product;
}

export interface ApiCartData {
  _id: string;
  cartOwner: string;
  products: ApiCartItem[];
  totalCartPrice: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiCartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  data: ApiCartData;
}
