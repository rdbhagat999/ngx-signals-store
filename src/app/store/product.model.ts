export interface Product {
  id: number;
  title: string;
  description: string;
  brand: string;
  category: string;
  thumbnail: string;
  sku: string;
  price: number;
  stock: number;
  weight: number;
  tags: string[];
  images: string[];
}
