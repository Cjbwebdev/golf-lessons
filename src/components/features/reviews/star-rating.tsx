import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  className,
  interactive = false,
  onRate,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5; // Not implementing half star UI for simplicity, treat as full or empty
  const emptyStars = totalStars - Math.ceil(rating);

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        let fillClass = "text-muted-foreground/50"; // Empty star color
        if (starValue <= rating) {
          fillClass = "text-accent"; // Filled star color (golden yellow)
        }

        return (
          <Star
            key={i}
            size={size}
            className={cn(
              fillClass,
              interactive ? "cursor-pointer hover:opacity-80" : ""
            )}
            fill={starValue <= rating ? "currentColor" : "none"}
            onClick={interactive && onRate ? () => onRate(starValue) : undefined}
            aria-label={interactive ? `Rate ${starValue} star${starValue !== 1 ? 's' : ''}` : `${rating} out of ${totalStars} stars`}
          />
        );
      })}
    </div>
  );
}
