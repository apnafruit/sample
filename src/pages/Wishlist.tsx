import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';

const Wishlist = () => {
  const { items, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <Heart className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6 text-center">
          Start adding items you love to your wishlist.
        </p>
        <Link to="/shop">
          <Button>
            Explore Products
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-secondary/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground mt-2">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
