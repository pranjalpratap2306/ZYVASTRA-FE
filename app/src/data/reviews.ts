export interface ReviewItem {
  id: string;
  name: string;
  location?: string;
  product?: string;
  rating: number; // 1..5
  text: string;
  date?: string; // ISO date
}

export const REVIEWS: ReviewItem[] = [
  {
    id: 'r1',
    name: 'Gaurav',
    location: 'Lucknow, Uttar Pradesh',
    product: 'Mens Round Neck Tshirt',
    rating: 4,
    text: 'Bought products from this company and I am extremely impressed with the quality',
    date: '2025-09-02'
  },
  {
    id: 'r2',
    name: 'Hanumanth Reddy',
    location: 'Meerut, Uttar Pradesh',
    product: 'Ladies leggings',
    rating: 4,
    text: "Exceptional value for money. It's a wise investment",
    date: '2025-08-27'
  },
  {
    id: 'r3',
    name: 'Dinesh Singh',
    location: 'Ludhiana, Punjab',
    product: 'Mens Round Neck Tshirt',
    rating: 4,
    text: 'Easy to use, beautifully designed, and incredibly durable. Would recommend to others',
    date: '2025-08-21'
  }
];

export const getAverageRating = (list: ReviewItem[] = REVIEWS): number => {
  if (!list.length) return 0;
  const total = list.reduce((sum, r) => sum + (r.rating || 0), 0);
  return Math.round((total / list.length) * 10) / 10;
}; 