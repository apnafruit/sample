import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Truck, RefreshCw, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products, getBestSellers, getNewArrivals } from '@/data/products';
import { openGeneralChat } from '@/lib/whatsapp';
import heroImage from '@/assets/hero-image.jpg';
import promoBanner from '@/assets/promo-banner.jpg';
import categoryClothing from '@/assets/category-clothing.jpg';
import categoryAccessories from '@/assets/category-accessories.jpg';
import categoryFootwear from '@/assets/category-footwear.jpg';
import categoryBeauty from '@/assets/category-beauty.jpg';
import categoryBags from '@/assets/category-bags.jpg';
import categoryNewArrivals from '@/assets/category-new-arrivals.jpg';

const categories = [
  { name: 'Clothing', image: categoryClothing, slug: 'clothing' },
  { name: 'Accessories', image: categoryAccessories, slug: 'accessories' },
  { name: 'Footwear', image: categoryFootwear, slug: 'footwear' },
  { name: 'Beauty', image: categoryBeauty, slug: 'beauty' },
  { name: 'Bags', image: categoryBags, slug: 'bags' },
  { name: 'New Arrivals', image: categoryNewArrivals, slug: 'new-arrivals' },
];

const features = [
  { icon: Sparkles, title: 'Premium Quality', description: 'Curated products with exceptional craftsmanship' },
  { icon: Truck, title: 'Fast Delivery', description: 'Quick and reliable shipping nationwide' },
  { icon: Shield, title: 'Secure Ordering', description: 'Safe WhatsApp ordering experience' },
  { icon: RefreshCw, title: 'Easy Returns', description: 'Hassle-free returns within 30 days' },
];

const testimonials = [
  {
    name: 'Sarah M.',
    rating: 5,
    text: 'Absolutely love the quality! The dresses fit perfectly and the customer service is amazing.',
    avatar: 'https://i.pravatar.cc/100?img=1',
  },
  {
    name: 'Emily R.',
    rating: 5,
    text: 'GlamHer has become my go-to for all fashion needs. The WhatsApp ordering is so convenient!',
    avatar: 'https://i.pravatar.cc/100?img=5',
  },
  {
    name: 'Jessica L.',
    rating: 5,
    text: 'Beautiful accessories at great prices. I always get compliments when I wear their jewelry.',
    avatar: 'https://i.pravatar.cc/100?img=9',
  },
];

const Index = () => {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Fashion hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-slide-up">
            <span className="inline-block px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
              New Collection 2025
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Style That Speaks{' '}
              <span className="text-gradient">You</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover curated collections that celebrate your unique style and confidence. 
              From elegant everyday pieces to statement accessories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/50 text-primary mb-3">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-sm md:text-base mb-1">{feature.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections designed to make you feel confident and beautiful
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.slug}
                to={`/shop?category=${category.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-card font-serif text-xl md:text-2xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center text-sm text-card/80 group-hover:text-card transition-colors">
                    View Collection
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Best Sellers</h2>
              <p className="text-muted-foreground">Our most loved pieces by customers worldwide</p>
            </div>
            <Link to="/shop" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-2xl">
            <img
              src={promoBanner}
              alt="Fashion Sale"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50 flex items-center">
              <div className="p-8 md:p-16 max-w-xl">
                <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                  Spring Collection Sale
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-6">
                  Up to 40% off on selected items. Refresh your wardrobe with our latest styles.
                </p>
                <Link to="/shop">
                  <Button size="lg" variant="secondary" className="bg-card text-primary hover:bg-card/90">
                    Shop the Look
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">New Arrivals</h2>
              <p className="text-muted-foreground">Fresh styles just dropped for you</p>
            </div>
            <Link to="/shop?category=new-arrivals" className="mt-4 md:mt-0">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.slice(0, 4 - newArrivals.length).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy customers who love shopping with us
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 md:p-8 shadow-soft hover-lift border border-border"
              >
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent-foreground text-accent-foreground" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in Style</h2>
            <p className="text-muted-foreground mb-8">
              It's time to change your wardobe
            </p>
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
