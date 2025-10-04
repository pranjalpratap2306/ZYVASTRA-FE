import { http } from './http';

export interface ReviewInput {
  name: string;
  text: string;
  rating: number; // 1-5
}

export interface ReviewItemDto {
  id: string;
  name: string;
  message: string;  // Changed from 'text' to 'message' to match API response
  rating: number;
  date?: string;
  createdAt?: string;  // Added to match the API response
}

export interface AverageCountsDto {
  average: number;
  count: number;
}

export interface DashboardReviewsDto {
  averageRating: number;  // Changed from average to averageRating
  totalReviews: number;   // Changed from count to totalReviews
  latest: ReviewItemDto[];
}

export function createReview(input: ReviewInput): Promise<ReviewItemDto> {
  return http<ReviewItemDto>('reviews', {
    method: 'POST',
    body: input,
  });
}

export function getAllReviews(): Promise<ReviewItemDto[]> {
  return http<ReviewItemDto[]>('reviews');
}

export function getAverageCounts(): Promise<AverageCountsDto> {
  return http<AverageCountsDto>('reviews/averageCounts');
}

export function getDashboardReviews(limit: number = 3): Promise<DashboardReviewsDto> {
  return http<DashboardReviewsDto>(`reviews/getReviews?limit=${encodeURIComponent(String(limit))}`);
}





