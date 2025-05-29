import type { Instructor, Review } from './types';

const sampleReviews: Review[] = [
  { 
    id: 'r1', 
    studentName: 'Alice Smith', 
    studentAvatarUrl: 'https://source.unsplash.com/random/40x40/?woman,face,portrait',
    rating: 5, 
    comment: 'Amazing instructor! Improved my swing in just one lesson.', 
    date: '2024-07-15T10:00:00Z' 
  },
  { 
    id: 'r2', 
    studentName: 'Bob Johnson', 
    studentAvatarUrl: 'https://source.unsplash.com/random/40x40/?man,face,portrait',
    rating: 4, 
    comment: 'Very knowledgeable and patient. Highly recommend.', 
    date: '2024-07-10T14:30:00Z' 
  },
  { 
    id: 'r3', 
    studentName: 'Charlie Brown', 
    studentAvatarUrl: 'https://source.unsplash.com/random/40x40/?person,face,portrait',
    rating: 5, 
    comment: 'Best coach I\'ve ever had!', 
    date: '2024-06-20T09:00:00Z' 
  },
  {
    id: 'r4',
    studentName: 'Diana Prince',
    studentAvatarUrl: 'https://source.unsplash.com/random/40x40/?woman,professional,portrait',
    rating: 4,
    comment: 'Great at explaining complex techniques simply. My short game has improved a lot!',
    date: '2024-07-05T11:00:00Z'
  },
  {
    id: 'r5',
    studentName: 'Edward Nigma',
    studentAvatarUrl: 'https://source.unsplash.com/random/40x40/?man,thinking,portrait',
    rating: 5,
    comment: 'Helped me understand course strategy like never before. Brilliant instructor!',
    date: '2024-07-18T16:00:00Z'
  }
];

export const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: 'John Doe',
    bio: 'PGA certified instructor with 10 years of experience. Specializes in short game and putting. Passionate about helping golfers of all levels reach their potential.',
    location: 'Pinehurst, NC',
    postcode: '28374',
    hourlyRate: 75,
    availability: [
      { date: '2024-08-01', timeSlots: ['09:00', '09:45', '14:00'] },
      { date: '2024-08-02', timeSlots: ['10:30', '11:15'] },
      { date: '2024-08-05', timeSlots: ['09:00', '09:45'] },
    ],
    profileImageUrl: 'https://source.unsplash.com/random/400x400/?male,golfer,portrait',
    averageRating: 4.8,
    specialties: ['Short Game', 'Putting', 'Course Management'],
    reviews: sampleReviews.slice(0,2),
  },
  {
    id: '2',
    name: 'Jane Smith',
    bio: 'Former LPGA tour player, now dedicated to coaching. Focuses on swing mechanics and mental game. Works well with beginners and intermediate players.',
    location: 'Scottsdale, AZ',
    postcode: '85255',
    hourlyRate: 90,
    availability: [
      { date: '2024-08-01', timeSlots: ['13:00', '13:45'] },
      { date: '2024-08-03', timeSlots: ['08:15', '09:00', '09:45'] },
      { date: '2024-08-06', timeSlots: ['14:00', '14:45'] },
    ],
    profileImageUrl: 'https://source.unsplash.com/random/400x400/?female,golfer,portrait',
    averageRating: 4.5,
    specialties: ['Swing Mechanics', 'Mental Game', 'Beginner Friendly'],
    reviews: [sampleReviews[2]],
  },
  {
    id: '3',
    name: 'Mike Wilson',
    bio: 'Experienced coach with a modern approach using technology like TrackMan. Helps advanced players fine-tune their game for competitive play.',
    location: 'Jupiter, FL',
    postcode: '33458',
    hourlyRate: 120,
    availability: [
      { date: '2024-08-05', timeSlots: ['11:15', '12:00', '15:30'] },
      { date: '2024-08-07', timeSlots: ['10:00', '10:45'] },
    ],
    profileImageUrl: 'https://source.unsplash.com/random/400x400/?man,golf,coach',
    averageRating: 4.9,
    specialties: ['Advanced Analytics', 'TrackMan', 'Competitive Play'],
    reviews: [sampleReviews[4]],
  },
  {
    id: '4',
    name: 'Sarah Davis',
    bio: 'Friendly and approachable instructor, great for juniors and new golfers. Focuses on making golf fun and accessible.',
    location: 'Austin, TX',
    postcode: '78701',
    hourlyRate: 60,
    availability: [
      { date: '2024-08-02', timeSlots: ['16:00', '16:45'] },
      { date: '2024-08-04', timeSlots: ['10:30', '11:15', '13:00'] },
      { date: '2024-08-08', timeSlots: ['09:30', '10:15'] },
    ],
    profileImageUrl: 'https://source.unsplash.com/random/400x400/?woman,golf,instructor',
    averageRating: 4.2,
    specialties: ['Junior Golf', 'New Golfers', 'Group Lessons'],
    reviews: [sampleReviews[0], sampleReviews[3]],
  },
  {
    id: '5',
    name: 'David Lee',
    bio: 'Specializes in golf fitness and injury prevention. Certified TPI instructor with a holistic approach to improving your game and physical conditioning.',
    location: 'San Diego, CA',
    postcode: '92101',
    hourlyRate: 85,
    availability: [
      { date: '2024-08-03', timeSlots: ['14:00', '14:45', '15:30'] },
      { date: '2024-08-06', timeSlots: ['09:00', '09:45', '10:30'] },
    ],
    profileImageUrl: 'https://source.unsplash.com/random/400x400/?male,fitness,coach',
    averageRating: 4.7,
    specialties: ['Golf Fitness', 'TPI Certified', 'Injury Prevention'],
    reviews: [sampleReviews[1], sampleReviews[2]],
  },
  {
    id: '6',
    name: 'Emily Chen',
    bio: 'Passionate about introducing women to golf. Offers a supportive and encouraging environment for learning. Focus on fundamentals and building confidence.',
    location: 'Chicago, IL',
    postcode: '60611',
    hourlyRate: 70,
    availability: [
      { date: '2024-08-04', timeSlots: ['11:00', '11:45', '13:00', '13:45'] },
      { date: '2024-08-07', timeSlots: ['16:00', '16:45'] },
    ],
    profileImageUrl: 'https://source.unsplash.com/random/400x400/?asian,woman,golfer',
    averageRating: 4.6,
    specialties: ['Women\'s Golf', 'Fundamentals', 'Confidence Building'],
    reviews: [sampleReviews[3], sampleReviews[0]],
  },
];
