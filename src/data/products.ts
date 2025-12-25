import product1 from '@/assets/product-1.jpg';
import product2 from '@/assets/product-2.jpg';
import product3 from '@/assets/product-3.jpg';
import product4 from '@/assets/product-4.jpg';
import product5 from '@/assets/product-5.jpg';
import product6 from '@/assets/product-6.jpg';
import product7 from '@/assets/product-7.jpg';
import product8 from '@/assets/product-8.jpg';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  sizes?: string[];
  colors?: string[];
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Floral Midi Dress',
    price: 89.99,
    originalPrice: 129.99,
    image: product1,
    category: 'clothing',
    rating: 4.8,
    reviews: 124,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White', 'Lavender'],
    description: 'Elegant floral midi dress perfect for any occasion. Features a flattering V-neckline and flowing silhouette.',
    isBestSeller: true,
  },
  {
    id: '2',
    name: 'Rose Gold Bracelet Set',
    price: 49.99,
    image: product2,
    category: 'accessories',
    rating: 4.9,
    reviews: 89,
    description: 'Stunning rose gold bracelet set with delicate crystal accents. Perfect for layering or wearing alone.',
    isNew: true,
  },
  {
    id: '3',
    name: 'Blush Leather Tote',
    price: 129.99,
    originalPrice: 159.99,
    image: product3,
    category: 'bags',
    rating: 4.7,
    reviews: 156,
    colors: ['Blush', 'Cream', 'Black'],
    description: 'Spacious and elegant leather tote bag. Features multiple compartments and premium hardware.',
    isBestSeller: true,
  },
  {
    id: '4',
    name: 'Nude Stiletto Heels',
    price: 99.99,
    image: product4,
    category: 'footwear',
    rating: 4.6,
    reviews: 78,
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['Nude', 'Black', 'Red'],
    description: 'Classic pointed-toe stilettos in elegant nude leather. 4-inch heel with comfortable padding.',
    isBestSeller: true,
  },
  {
    id: '5',
    name: 'Rose Lipstick Collection',
    price: 45.99,
    image: product5,
    category: 'beauty',
    rating: 4.9,
    reviews: 234,
    colors: ['Rose Pink', 'Berry', 'Coral'],
    description: 'Luxurious matte lipstick set featuring three stunning rose shades. Long-lasting and hydrating formula.',
    isNew: true,
  },
  {
    id: '6',
    name: 'Lavender Ruffle Blouse',
    price: 59.99,
    image: product6,
    category: 'clothing',
    rating: 4.5,
    reviews: 67,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Lavender', 'White', 'Blush'],
    description: 'Romantic ruffle blouse in soft lavender. Features statement sleeves and feminine details.',
    isNew: true,
  },
  {
    id: '7',
    name: 'Pearl Necklace Set',
    price: 79.99,
    originalPrice: 99.99,
    image: product7,
    category: 'accessories',
    rating: 4.8,
    reviews: 112,
    description: 'Elegant layered pearl necklace set with gold accents. Timeless pieces for any wardrobe.',
    isBestSeller: true,
  },
  {
    id: '8',
    name: 'Pink Pleated Skirt',
    price: 69.99,
    image: product8,
    category: 'clothing',
    rating: 4.7,
    reviews: 93,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Black', 'Cream'],
    description: 'Beautiful pleated midi skirt in soft pink satin. Elastic waistband for comfortable fit.',
  },
];

export const categories = [
  { id: 'clothing', name: 'Clothing', slug: 'clothing' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
  { id: 'footwear', name: 'Footwear', slug: 'footwear' },
  { id: 'beauty', name: 'Beauty', slug: 'beauty' },
  { id: 'bags', name: 'Bags', slug: 'bags' },
  { id: 'new-arrivals', name: 'New Arrivals', slug: 'new-arrivals' },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'new-arrivals') {
    return products.filter(p => p.isNew);
  }
  return products.filter(p => p.category === category);
};

export const getBestSellers = (): Product[] => {
  return products.filter(p => p.isBestSeller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(p => p.isNew);
};
