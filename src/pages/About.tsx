import { Heart, Sparkles, Target, Users } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const values = [
  {
    icon: Heart,
    title: 'Passion for Fashion',
    description: 'We believe in the transformative power of clothing and accessories to express individuality.',
  },
  {
    icon: Sparkles,
    title: 'Quality First',
    description: 'Every piece in our collection is carefully curated for exceptional quality and craftsmanship.',
  },
  {
    icon: Target,
    title: 'Empowerment',
    description: 'We aim to empower women to feel confident and beautiful in their own unique way.',
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Building a community of fashion-forward women who support and inspire each other.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="About GlamHer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              GlamHer was born from a passion for fashion and a desire to make 
              every woman feel confident and beautiful in what she wears.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Celebrating Your Unique Style
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Founded in 2024, GlamHer began as a small online boutique with a big vision: 
                  to create a shopping experience that celebrates individuality and empowers 
                  women through fashion.
                </p>
                <p>
                  We believe that style is personal, and every woman deserves access to beautiful, 
                  quality pieces that make her feel confident. That's why we carefully curate our 
                  collections, selecting only the finest clothing, accessories, and beauty products.
                </p>
                <p>
                  Our commitment to exceptional customer service means we're always here to help 
                  you find the perfect pieces. Through our convenient WhatsApp ordering system, 
                  we provide a personalized shopping experience that's as unique as you are.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Our story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-2xl -z-10" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-secondary rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            To empower every woman to express her unique style with confidence, 
            providing access to beautiful, quality fashion that celebrates individuality 
            and inspires self-expression.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-card border border-border hover-lift"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/50 text-primary mb-4">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10K+</div>
              <div className="text-primary-foreground/80">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80">Products</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <div className="text-primary-foreground/80">Cities Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-primary-foreground/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
