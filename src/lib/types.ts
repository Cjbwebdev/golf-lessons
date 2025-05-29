export interface Instructor {
  id: string;
  name: string;
  bio: string;
  location: string; // e.g., "Augusta, GA" or "Near 90210"
  postcode?: string;
  hourlyRate: number;
  availability: AvailabilitySlot[];
  profileImageUrl: string;
  averageRating: number;
  specialties: string[];
  reviews: Review[];
}

export interface AvailabilitySlot {
  date: string; // YYYY-MM-DD
  timeSlots: string[]; // e.g., ["09:00", "09:45", "10:30"]
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: string; // ISO string date
}
