import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { orderProduct } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    orderProduct(product.name, product.price);
  };

  return (
    <div className={cn('group relative', className)}>
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-secondary text-secondary-foreground">New</Badge>
            )}
            {product.originalPrice && (
              <Badge variant="destructive">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={cn(
              'absolute top-3 right-3 w-9 h-9 rounded-full bg-card/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110',
              inWishlist ? 'text-primary' : 'text-muted-foreground'
            )}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className="h-5 w-5" fill={inWishlist ? 'currentColor' : 'none'} />
          </button>

          {/* Quick Actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="flex gap-2">
              <Button
                onClick={handleOrder}
                className="flex-1 bg-primary hover:bg-primary/90"
                size="sm"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Order Now
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent-foreground text-accent-foreground" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">({product.reviews})</span>
          </div>
          
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2">
            <span className="font-semibold text-foreground">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
