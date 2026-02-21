import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { AlertCircle } from 'lucide-react';

type GalleryCategory = 'residential' | 'commercial' | 'before-after';

interface Project {
  image: string;
  title: string;
  description: string;
  category: GalleryCategory;
}

const projects: Project[] = [
  // Residential Projects (3 images available)
  {
    image: '/assets/generated/residential-1.dim_1200x800.png',
    title: 'Modern Living Room',
    description: 'A contemporary living space featuring clean lines, neutral tones, minimalist furniture, and abundant natural light creating an inviting atmosphere.',
    category: 'residential',
  },
  {
    image: '/assets/generated/residential-2.dim_1200x800.png',
    title: 'Cozy Bedroom',
    description: 'A serene bedroom retreat with warm lighting, plush textiles, and elegant decor that promotes rest and tranquility.',
    category: 'residential',
  },
  {
    image: '/assets/generated/residential-3.dim_1200x800.png',
    title: 'Contemporary Kitchen',
    description: 'A functional yet elegant kitchen design with sleek cabinetry, marble countertops, and modern appliances that inspire culinary creativity.',
    category: 'residential',
  },

  // Commercial Projects (3 images available)
  {
    image: '/assets/generated/commercial-1.dim_1200x800.png',
    title: 'Restaurant Interior',
    description: 'A warm and welcoming dining space with elegant seating, ambient lighting, and sophisticated decor creating the perfect setting for memorable meals.',
    category: 'commercial',
  },
  {
    image: '/assets/generated/commercial-2.dim_1200x800.png',
    title: 'Boutique Retail',
    description: 'A chic boutique with stylish displays, modern fixtures, and inviting shopping environment that showcases products beautifully.',
    category: 'commercial',
  },
  {
    image: '/assets/generated/commercial-3.dim_1200x800.png',
    title: 'Luxury Hotel Lobby',
    description: 'A grand hotel entrance with statement furniture, elegant finishes, and welcoming atmosphere that sets the tone for guest experience.',
    category: 'commercial',
  },

  // Before & After Transformations (3 images available)
  {
    image: '/assets/generated/before-after-1.dim_1200x800.png',
    title: 'Living Room Transformation',
    description: 'From dated and cluttered to modern and serene—witness the dramatic transformation of this family living space.',
    category: 'before-after',
  },
  {
    image: '/assets/generated/before-after-2.dim_1200x800.png',
    title: 'Kitchen Renovation',
    description: 'A complete kitchen overhaul transforming old cabinets and appliances into a sleek modern culinary haven.',
    category: 'before-after',
  },
  {
    image: '/assets/generated/before-after-3.dim_1200x800.png',
    title: 'Bedroom Makeover',
    description: 'Transforming a tired bedroom with dated decor into a serene retreat with fresh design and modern touches.',
    category: 'before-after',
  },
];

const categories = [
  { id: 'residential' as GalleryCategory, label: 'Residential' },
  { id: 'commercial' as GalleryCategory, label: 'Commercial' },
  { id: 'before-after' as GalleryCategory, label: 'Before & After' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('residential');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const { ref, isVisible } = useScrollAnimation();

  const filteredProjects = projects.filter((project) => project.category === activeCategory);

  // Development mode: Validate image existence
  useEffect(() => {
    if (import.meta.env.DEV) {
      const validateImages = async () => {
        const expectedImages = [
          ...Array.from({ length: 3 }, (_, i) => `residential-${i + 1}.dim_1200x800.png`),
          ...Array.from({ length: 3 }, (_, i) => `commercial-${i + 1}.dim_1200x800.png`),
          ...Array.from({ length: 3 }, (_, i) => `before-after-${i + 1}.dim_1200x800.png`),
        ];

        const results = await Promise.all(
          expectedImages.map(async (filename) => {
            try {
              const response = await fetch(`/assets/generated/${filename}`, { method: 'HEAD' });
              return { filename, exists: response.ok };
            } catch {
              return { filename, exists: false };
            }
          })
        );

        const found = results.filter((r) => r.exists).length;
        const missing = results.filter((r) => !r.exists);

        console.log(`[Portfolio] Image validation: ${found}/${expectedImages.length} images found`);
        if (missing.length > 0) {
          console.warn('[Portfolio] Missing images:', missing.map((m) => m.filename));
        }
      };

      validateImages();
    }
  }, []);

  const handleImageError = (imagePath: string) => {
    console.error(`[Portfolio] Failed to load image: ${imagePath}`);
    setImageErrors((prev) => new Set(prev).add(imagePath));
  };

  return (
    <section id="portfolio" className="py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto text-center mb-16 animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Our Portfolio
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            Explore our recent projects and discover the transformative power of thoughtful design
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="lg"
                className="text-base px-8 py-6"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant-xl animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {imageErrors.has(project.image) ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground p-4">
                      <AlertCircle className="w-12 h-12 mb-2 text-destructive" />
                      <p className="text-sm text-center font-medium">Image failed to load</p>
                      <p className="text-xs text-center mt-1 opacity-70">
                        {project.image.split('/').pop()}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={() => handleImageError(project.image)}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
