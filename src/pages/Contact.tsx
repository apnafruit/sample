import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { openWhatsApp } from '@/lib/whatsapp';
import { useToast } from '@/hooks/use-toast';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Machilipatnam'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['79979 57999 or 79979 67999', 'Mon - Sat: 9AM - 6PM'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['srimatrika.official@gmail.com'],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `Hi, I'm ${formData.name}.\n\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    openWhatsApp(message);
    
    toast({
      title: 'Message Sent!',
      description: 'Your message has been sent via WhatsApp.',
    });
    
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? We'd love to hear from you. 
            Reach out through any of the channels below.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Phone number</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send via WhatsApp
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/50 flex items-center justify-center text-primary">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{info.title}</h3>
                    {info.lines.map((line, i) => (
                      <p key={i} className="text-muted-foreground text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 aspect-video rounded-xl bg-muted flex items-center justify-center border border-border">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Map placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="bg-card py-16 md:py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'How do I place an order?',
                a: 'Simply browse our collection, select your items, and click "Order on WhatsApp". You\'ll be connected directly with our team to complete your order.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept various payment methods including bank transfers, digital wallets, and cash on delivery. Our team will provide payment details via WhatsApp.',
              },
              {
                q: 'How long does shipping take?',
                a: 'Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout.',
              },
              {
                q: 'What is your return policy?',
                a: 'We offer a 30-day return policy for unworn items in original condition. Contact us via WhatsApp to initiate a return.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-background rounded-lg p-6 border border-border">
                <h3 className="font-medium mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
