import { useLocale } from '../contexts/LocaleContext';

interface PriceDisplayProps {
  priceInINR: number;
  className?: string;
  showOriginal?: boolean;
}

/**
 * PriceDisplay Component
 * 
 * Displays prices with automatic currency conversion based on user's region/preference
 * 
 * Usage:
 * <PriceDisplay priceInINR={50000} />
 * <PriceDisplay priceInINR={100000} showOriginal={true} />
 */
export function PriceDisplay({ priceInINR, className = '', showOriginal = false }: PriceDisplayProps) {
  const { formatPrice, currency } = useLocale();

  return (
    <div className={className}>
      <span className="font-semibold">{formatPrice(priceInINR)}</span>
      {showOriginal && currency !== 'INR' && (
        <span className="text-sm text-muted-foreground ml-2">
          (₹{priceInINR.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')})
        </span>
      )}
    </div>
  );
}
