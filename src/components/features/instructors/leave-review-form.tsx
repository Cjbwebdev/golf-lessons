
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/features/reviews/star-rating';
import { Edit } from 'lucide-react';

interface LeaveReviewFormProps {
  instructorName: string;
}

export function LeaveReviewForm({ instructorName }: LeaveReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleRate = (newRating: number) => {
    setRating(newRating);
    // You can also console.log or handle immediate feedback here if needed
    // console.log('Rated:', newRating);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission,
    // e.g., send the rating and comment to a server action or API endpoint.
    console.log({
      instructorName,
      rating,
      comment,
    });
    // Potentially show a success message and clear the form
    // For now, it just logs to console.
  };

  return (
    <Card className="shadow-lg border">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Leave a Review for {instructorName}</CardTitle>
        <CardDescription>Share your experience to help others.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmitReview}>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-foreground mb-1">Your Rating</label>
            <StarRating rating={rating} interactive onRate={handleRate} size={28} />
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-foreground mb-1">Your Comment</label>
            <Textarea 
              id="comment" 
              placeholder={`How was your lesson with ${instructorName}?`} 
              rows={4} 
              className="shadow-inner"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
            <Edit className="mr-2 h-4 w-4" /> Submit Review
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
