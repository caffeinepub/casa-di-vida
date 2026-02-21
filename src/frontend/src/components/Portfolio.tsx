import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { AlertCircle, ImageOff } from 'lucide-react';

type GalleryCategory = 'residential' | 'commercial' | 'before-after';

interface Project {
  image: string;
  title: string;
  description: string;
  category: GalleryCategory;
}

// Available residential images based on assets
const residentialImageNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];

const residentialProjects: Project[] = residentialImageNumbers.map((num, i) => {
  const titles = [
    'Modern Living Room', 'Cozy Bedroom', 'Contemporary Kitchen', 'Elegant Dining Room',
    'Luxurious Bathroom', 'Home Office', 'Living Space', 'Master Bedroom',
    'Gourmet Kitchen', 'Formal Dining', 'Modern Bathroom', 'Executive Office',
    'Open Concept Living', 'Guest Bedroom', 'Contemporary Kitchen', 'Elegant Dining',
    'Spa Bathroom', 'Creative Office', 'Transitional Living', 'Luxury Master Suite',
    'Elegant Living Room', 'Sophisticated Bedroom', 'Modern Kitchen', 'Stylish Dining Room',
    'Luxurious Bathroom', 'Contemporary Office', 'Cozy Living Space', 'Master Suite',
    'Gourmet Kitchen', 'Formal Dining Room'
  ];
  
  const descriptions = [
    'A contemporary living space featuring clean lines, neutral tones, and abundant natural light.',
    'A serene bedroom retreat with warm lighting, plush textiles, and elegant decor.',
    'A functional yet elegant kitchen design with sleek cabinetry and modern appliances.',
    'An inviting dining area with sophisticated furnishings and ambient lighting.',
    'A spa-like bathroom with luxury finishes and modern fixtures.',
    'A productive workspace with built-in storage and natural light.',
    'A comfortable living area with modern furniture and warm atmosphere.',
    'An elegant master bedroom with walk-in closet and sitting area.',
    'A chef-inspired kitchen with island and professional-grade appliances.',
    'A formal dining space with statement lighting and custom built-ins.',
    'A contemporary bathroom with freestanding tub and double vanity.',
    'A sophisticated home office with dark wood and leather accents.',
    'An open concept space with vaulted ceilings and modern furnishings.',
    'A coastal-inspired bedroom with soft colors and natural textures.',
    'A sleek kitchen with waterfall island and pendant lights.',
    'An elegant dining room with wine storage and display shelving.',
    'A spa-inspired bathroom with steam shower and natural stone.',
    'A creative workspace with artistic elements and bright colors.',
    'A transitional living room blending traditional and modern styles.',
    'A luxury master suite with bedroom and ensuite bathroom.',
    'A refined living space with elegant furnishings and sophisticated palette.',
    'A contemporary bedroom with luxury textiles and modern design.',
    'A modern kitchen with high-end appliances and sleek cabinetry.',
    'A stylish dining area with elegant table setting and chandelier.',
    'A luxurious bathroom with marble finishes and spa-like features.',
    'A contemporary home office with built-in shelving and natural light.',
    'A cozy residential space with fireplace and comfortable seating.',
    'A master bedroom with walk-in closet and sitting area.',
    'A gourmet kitchen with island and professional appliances.',
    'A formal dining room with statement lighting and custom built-ins.'
  ];

  return {
    image: `/assets/generated/residential-${num}.dim_1200x800.png`,
    title: titles[i] || `Residential Project ${num}`,
    description: descriptions[i] || 'A beautiful residential interior design project.',
    category: 'residential',
  };
});

// Available commercial images based on assets
const commercialImageNumbers = [1, 2, 3];

const commercialProjects: Project[] = commercialImageNumbers.map((num, i) => {
  const titles = [
    'Upscale Restaurant', 'Modern Boutique', 'Luxury Hotel Lobby'
  ];
  
  const descriptions = [
    'An elegant dining space with sophisticated decor and ambient lighting.',
    'A chic boutique with stylish displays and modern fixtures.',
    'A grand hotel entrance with statement furniture and elegant finishes.'
  ];

  return {
    image: `/assets/generated/commercial-${num}.dim_1200x800.png`,
    title: titles[i] || `Commercial Project ${num}`,
    description: descriptions[i] || 'A sophisticated commercial interior design project.',
    category: 'commercial',
  };
});

// Available before-after images based on assets
const beforeAfterImageNumbers = [1, 2, 3];

const beforeAfterProjects: Project[] = beforeAfterImageNumbers.map((num, i) => {
  const titles = [
    'Living Room Transformation', 'Kitchen Renovation', 'Bedroom Makeover'
  ];
  
  const descriptions = [
    'From dated and cluttered to modern and serene—a dramatic transformation.',
    'A complete kitchen overhaul transforming old cabinets into a sleek modern space.',
    'Transforming a tired bedroom into a serene retreat with fresh design.'
  ];

  return {
    image: `/assets/generated/before-after-${num}.dim_1200x800.png`,
    title: titles[i] || `Before & After Project ${num}`,
    description: descriptions[i] || 'A dramatic transformation showcasing our design expertise.',
    category: 'before-after',
  };
});

const projects: Project[] = [...residentialProjects, ...commercialProjects, ...beforeAfterProjects];

const categories = [
  { id: 'residential' as GalleryCategory, label: 'Residential' },
  { id: 'commercial' as GalleryCategory, label: 'Commercial' },
  { id: 'before-after' as GalleryCategory, label: 'Before & After' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('residential');
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [imageLoaded, setImageLoaded] = useState<Set<string>>(new Set());
  const { ref, isVisible } = useScrollAnimation();

  const filteredProjects = projects.filter((project) => project.category === activeCategory);

  // Development mode: Validate image existence
  useEffect(() => {
    if (import.meta.env.DEV) {
      const validateImages = async () => {
        const allImagePaths = projects.map(p => p.image);
        
        console.log('[Portfolio] Starting image validation...');
        console.log(`[Portfolio] Expected ${allImagePaths.length} total images`);
        console.log(`[Portfolio] Residential: ${residentialProjects.length} images`);
        console.log(`[Portfolio] Commercial: ${commercialProjects.length} images`);
        console.log(`[Portfolio] Before & After: ${beforeAfterProjects.length} images`);

        const results = await Promise.all(
          allImagePaths.map(async (fullPath) => {
            try {
              const response = await fetch(fullPath, { method: 'HEAD' });
              if (!response.ok) {
                console.warn(`[Portfolio] ✗ ${fullPath}: Not found (HTTP ${response.status})`);
              } else {
                console.log(`[Portfolio] ✓ ${fullPath}: Found (HTTP ${response.status})`);
              }
              return { fullPath, exists: response.ok, status: response.status };
            } catch (error) {
              console.error(`[Portfolio] ✗ ${fullPath}: Fetch error`, error);
              return { fullPath, exists: false, status: 0 };
            }
          })
        );

        const found = results.filter((r) => r.exists);
        const missing = results.filter((r) => !r.exists);

        console.log(`[Portfolio] ========================================`);
        console.log(`[Portfolio] Image validation complete: ${found.length}/${allImagePaths.length} images found`);
        
        if (missing.length > 0) {
          console.warn(`[Portfolio] Missing ${missing.length} images:`);
          missing.forEach((m) => {
            console.warn(`  - ${m.fullPath}`);
          });
        }
        console.log(`[Portfolio] ========================================`);
      };

      validateImages();
    }
  }, []);

  const handleImageError = (imagePath: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    console.error(`[Portfolio] ✗ Failed to load image:`, {
      path: imagePath,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      currentSrc: img.currentSrc,
      error: 'Image failed to load - file may not exist or path is incorrect'
    });
    setImageErrors((prev) => new Set(prev).add(imagePath));
  };

  const handleImageLoad = (imagePath: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    console.log(`[Portfolio] ✓ Successfully loaded image:`, {
      path: imagePath,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      currentSrc: img.currentSrc,
    });
    setImageLoaded((prev) => new Set(prev).add(imagePath));
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
              key={`${project.category}-${index}`}
              className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant-xl animate-on-scroll visible"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  {imageErrors.has(project.image) ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
                      <ImageOff className="w-12 h-12 mb-2 opacity-50" />
                      <p className="text-sm">Image unavailable</p>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => handleImageError(project.image, e)}
                      onLoad={(e) => handleImageLoad(project.image, e)}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Debug info in development */}
        {import.meta.env.DEV && (
          <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
            <p className="font-semibold mb-2">Debug Info:</p>
            <p>Total projects: {projects.length}</p>
            <p>Residential: {residentialProjects.length} projects</p>
            <p>Commercial: {commercialProjects.length} projects</p>
            <p>Before & After: {beforeAfterProjects.length} projects</p>
            <p>Images loaded: {imageLoaded.size}</p>
            <p>Images failed: {imageErrors.size}</p>
          </div>
        )}
      </div>
    </section>
  );
}
