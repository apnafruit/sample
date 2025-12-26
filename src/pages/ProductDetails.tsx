import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Minus, Plus, Star, Truck, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/ProductCard';
import { getProductById, products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { orderProduct } from '@/lib/whatsapp';
import { cn } from '@/lib/utils';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0]
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]
  );

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/shop">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleOrder = () => {
    orderProduct(product.name, product.price, quantity, selectedSize, selectedColor);
  };

  const handleAddToWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
  };

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.originalPrice && (
              <Badge className="absolute top-4 left-4" variant="destructive">
                -{Math.round((1 - product.price / product.originalPrice) * 100)}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                New
              </Badge>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
             {/* <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                 <Star className="h-5 w-5 fill-accent-foreground text-accent-foreground" />
                  <span className="font-medium">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>*/}
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selector */}
            {product.sizes && (
              <div>
                <h3 className="font-medium mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'min-w-12 h-10 px-4 rounded-lg border transition-colors',
                        selectedSize === size
                          ? 'border-primary bg-primary text-primary-foreground'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && (
              <div>
                <h3 className="font-medium mb-3">Color: {selectedColor}</h3>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'px-4 py-2 rounded-lg border transition-colors text-sm',
                        selectedColor === color
                          ? 'border-primary bg-secondary'
                          : 'border-border hover:border-primary'
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium mb-3">Quantity</h3>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
  size="lg"
  variant="outline"
  onClick={handleAddToCart}
  className="flex-1 min-h-[52px] sm:min-h-[44px] py-4 sm:py-2"
>
  Add to Cart
</Button>

              {/*<Button
                size="lg"
                variant="outline"
                onClick={handleAddToWishlist}
                className={cn(inWishlist && 'text-primary border-primary')}
              >
                <Heart className="h-5 w-5" fill={inWishlist ? 'currentColor' : 'none'} />
              </Button>*/}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm text-muted-foreground">Free Shipping</span>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm text-muted-foreground">Easy Returns</span>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm text-muted-foreground">Secure Order</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Info Tabs */}
      <section className="container mx-auto px-4 py-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="care"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Care Instructions
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {product.description} Crafted with premium materials and attention to detail, 
              this piece is designed to elevate your everyday wardrobe. Perfect for both casual 
              and special occasions, it combines comfort with effortless style.
            </p>
          </TabsContent>
          <TabsContent value="care" className="mt-6">
            <ul className="space-y-2 text-muted-foreground max-w-3xl">
              <li>• Machine wash cold with like colors</li>
              <li>• Do not bleach</li>
              <li>• Tumble dry low</li>
              <li>• Iron on low heat if needed</li>
              <li>• Do not dry clean</li>
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6 max-w-3xl">
              {[1, 2, 3].map(i => (
                <div key={i} className="border-b border-border pb-6 last:border-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-secondary" />
                    <div>
                      <h4 className="font-medium">Customer {i}</h4>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className="h-4 w-4 fill-accent-foreground text-accent-foreground"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    Love this product! The quality is amazing and it fits perfectly. 
                    Highly recommend to anyone looking for stylish and comfortable pieces.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="container mx-auto px-4 py-12 border-t border-border">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
