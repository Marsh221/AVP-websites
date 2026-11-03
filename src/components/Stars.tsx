import { Star } from "lucide-react";

export default function Stars({ rating, size = 14, className = "" }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? "fill-[#c18a55] text-[#c18a55]" : "fill-[#382b39] text-[#382b39]"}
        />
      ))}
    </span>
  );
}
