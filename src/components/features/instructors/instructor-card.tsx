import type { Instructor } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/features/reviews/star-rating';
import { MapPin, DollarSign, CalendarDays, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  const nextAvailability = instructor.availability.length > 0 
    ? `Next available: ${new Date(instructor.availability[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : 'Check availability';

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={instructor.profileImageUrl}
          alt={instructor.name}
          width={400}
          height={300}
          className="object-cover w-full h-48"
          data-ai-hint="golfer portrait"
        />
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl mb-2 text-primary">{instructor.name}</CardTitle>
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-accent" />
            <span>{instructor.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <StarRating rating={instructor.averageRating} />
            <span className="ml-1">({instructor.reviews.length} reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-accent" />
            <span>${instructor.hourlyRate} / 45-min lesson</span>
          </div>
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-accent" />
            <span>{nextAvailability}</span>
          </div>
          {instructor.specialties && instructor.specialties.length > 0 && (
            <div className="pt-2">
              <h4 className="font-semibold text-foreground mb-1">Specialties:</h4>
              <div className="flex flex-wrap gap-2">
                {instructor.specialties.slice(0, 3).map(spec => (
                  <Badge key={spec} variant="secondary">{spec}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-6 bg-muted/50">
        <Button asChild className="w-full">
          <Link href={`/instructors/${instructor.id}`} className="flex items-center justify-center gap-2">
            View Profile <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
