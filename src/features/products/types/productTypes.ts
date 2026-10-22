export interface ProductCategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface ProductBrand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  images: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  category?: ProductCategory;
  brand?: ProductBrand;
}

export interface ProductsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface ProductsResponse {
  results: number;
  metadata?: ProductsMetadata;
  data: Product[];
}
