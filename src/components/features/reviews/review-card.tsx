import type { Review } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { StarRating } from './star-rating';
import { formatDistanceToNow } from 'date-fns';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const studentInitials = review.studentName
    .split(' ')
    .map(n => n[0])
    .join('');

  return (
    <Card className="shadow-sm border">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            {review.studentAvatarUrl && (
              <AvatarImage src={review.studentAvatarUrl} alt={review.studentName} data-ai-hint="person avatar" />
            )}
            <AvatarFallback>{studentInitials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg text-foreground">{review.studentName}</CardTitle>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
            </p>
          </div>
        </div>
        <StarRating rating={review.rating} size={18} />
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
