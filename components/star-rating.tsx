import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  votes?: number;
  size?: 'sm' | 'md' | 'lg';
  showVotes?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  votes,
  size = 'sm',
  showVotes = false,
  className,
}: StarRatingProps) {
  const sizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercent = Math.max(0, Math.min(100, (rating - (star - 1)) * 100));
          return (
            <div key={star} className="relative">
              <Star className={cn(sizes[size], 'text-muted-foreground/30')} />
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fillPercent}%` }}
              >
                <Star className={cn(sizes[size], 'fill-amber-400 text-amber-400')} />
              </div>
            </div>
          );
        })}
      </div>
      <span className={cn('font-semibold', textSize)}>
        {rating.toFixed(1)}
      </span>
      {showVotes && votes !== undefined && (
        <span className={cn('text-muted-foreground', textSize)}>
          ({votes.toLocaleString()})
        </span>
      )}
    </div>
  );
}
