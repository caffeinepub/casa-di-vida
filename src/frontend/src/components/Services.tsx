import { Palette, Ruler, Sofa, Sparkles, Home, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const services = [
  {
    icon: Ruler,
    title: 'Space Planning',
    description:
      'Optimize your space with intelligent layouts that balance functionality and aesthetics, creating harmonious flow throughout your home.',
  },
  {
    icon: Palette,
    title: 'Color Consultation',
    description:
      'Expert guidance in selecting the perfect color palette that reflects your personality and enhances the mood of each room.',
  },
  {
    icon: Sofa,
    title: 'Furniture Selection',
    description:
      'Curated furniture pieces that combine comfort, style, and quality, perfectly suited to your space and lifestyle.',
  },
  {
    icon: Home,
    title: 'Full Room Design',
    description:
      'Complete room transformations from concept to completion, bringing your vision to life with meticulous attention to detail.',
  },
  {
    icon: Lightbulb,
    title: 'Lighting Design',
    description:
      'Strategic lighting solutions that create ambiance, highlight architectural features, and enhance the overall atmosphere.',
  },
  {
    icon: Sparkles,
    title: 'Styling & Accessories',
    description:
      'The finishing touches that make a house a home—carefully selected décor, textiles, and accessories that complete your space.',
  },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="services" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center mb-20 animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Comprehensive interior design solutions tailored to your unique style and needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-none shadow-none hover:shadow-elegant-lg transition-all duration-500 hover:-translate-y-2 bg-card/50 backdrop-blur-sm p-2"
              >
                <CardHeader className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-display font-semibold">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
