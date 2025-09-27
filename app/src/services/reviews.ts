import { http } from './http';

export interface ReviewInput {
  name: string;
  text: string;
  rating: number; // 1-5
}

export interface ReviewItemDto {
  id: string;
  name: string;
  text: string;
  rating: number;
  date?: string;
}

export interface AverageCountsDto {
  average: number;
  count: number;
}

export interface DashboardReviewsDto {
  average: number;
  count: number;
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
  return http<AverageCountsDto>('reviews/avarageCounts');
}

export function getDashboardReviews(limit: number = 3): Promise<DashboardReviewsDto> {
  return http<DashboardReviewsDto>(`reviews/getReviews?limit=${encodeURIComponent(String(limit))}`);
}





