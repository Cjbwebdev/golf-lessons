
import Image from 'next/image';
import { mockInstructors } from '@/lib/mock-data';
import type { Instructor } from '@/lib/types';
import { StarRating } from '@/components/features/reviews/star-rating';
import { AvailabilityCalendar } from '@/components/features/instructors/availability-calendar';
import { ReviewCard } from '@/components/features/reviews/review-card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DollarSign, MapPin, Award, Users, MessageSquare, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Metadata, ResolvingMetadata } from 'next';
import { LeaveReviewForm } from '@/components/features/instructors/leave-review-form'; // Added import

type Props = {
  params: { id: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;
  const instructor = mockInstructors.find(inst => inst.id === id);
 
  if (!instructor) {
    return {
      title: 'Instructor Not Found | TeeTime Trainer',
    }
  }
 
  return {
    title: `${instructor.name} | Golf Instructor | TeeTime Trainer`,
    description: `View ${instructor.name}'s profile, availability, and reviews. ${instructor.bio.substring(0,100)}...`,
  }
}


export default function InstructorProfilePage({ params }: { params: { id: string } }) {
  const instructor = mockInstructors.find(inst => inst.id === params.id);

  if (!instructor) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive">Instructor Not Found</h1>
        <p className="text-muted-foreground mt-2">Sorry, we couldn't find an instructor with that ID.</p>
        <Button asChild className="mt-6">
          <a href="/instructors/search">Back to Search</a>
        </Button>
      </div>
    );
  }

  const overallRating = instructor.reviews.length > 0 
    ? instructor.reviews.reduce((acc, r) => acc + r.rating, 0) / instructor.reviews.length
    : 0;

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid md:grid-cols-3 gap-8 items-start bg-card p-8 rounded-xl shadow-xl border">
        <div className="md:col-span-1">
          <Image
            src={instructor.profileImageUrl}
            alt={instructor.name}
            width={300}
            height={300}
            className="rounded-lg object-cover w-full aspect-square shadow-md"
            data-ai-hint="golfer portrait"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-4xl font-bold text-primary">{instructor.name}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5 text-accent" />
              <span>{instructor.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-5 w-5 text-accent" />
              <span>${instructor.hourlyRate} / 45-min lesson</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={overallRating} size={24} />
            <span className="text-lg text-muted-foreground">({instructor.reviews.length} reviews)</span>
          </div>
          <p className="text-foreground/80 leading-relaxed">{instructor.bio}</p>
          {instructor.specialties && instructor.specialties.length > 0 && (
            <div className="pt-2">
              <h3 className="text-sm font-semibold uppercase text-muted-foreground tracking-wider mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {instructor.specialties.map(spec => (
                  <Badge key={spec} variant="outline" className="text-sm py-1 px-3">{spec}</Badge>
                ))}
              </div>
            </div>
          )}
          <Button size="lg" className="mt-4 w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
             <CalendarDays className="mr-2 h-5 w-5" /> Check Availability & Book
          </Button>
        </div>
      </section>

      {/* Availability Section */}
      <section id="availability">
        <AvailabilityCalendar availability={instructor.availability} instructorName={instructor.name} />
      </section>

      <Separator />

      {/* Reviews Section */}
      <section id="reviews" className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h2 className="text-3xl font-semibold text-foreground">Student Reviews</h2>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <MessageSquare className="h-6 w-6 text-primary" />
            <span className="text-xl font-medium text-foreground">
              {overallRating > 0 ? overallRating.toFixed(1) : 'No ratings yet'}
            </span>
            <span className="text-muted-foreground">({instructor.reviews.length} reviews)</span>
          </div>
        </div>

        {instructor.reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {instructor.reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">No reviews yet for {instructor.name}. Be the first to leave one after your lesson!</p>
        )}
        
        {/* Leave a Review Form (UI only) */}
        <LeaveReviewForm instructorName={instructor.name} />
      </section>
    </div>
  );
}
