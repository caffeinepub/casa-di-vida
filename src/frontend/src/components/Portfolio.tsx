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

// Available residential images based on assets (missing 16-20)
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

  // Development mode: Comprehensive image validation
  useEffect(() => {
    console.log('[Portfolio] Component mounted');
    console.log('[Portfolio] Environment:', {
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
      prod: import.meta.env.PROD,
      baseUrl: import.meta.env.BASE_URL,
    });
    console.log('[Portfolio] Window location:', {
      origin: window.location.origin,
      pathname: window.location.pathname,
      href: window.location.href,
    });

    const validateImages = async () => {
      const allImagePaths = projects.map(p => p.image);
      
      console.log('[Portfolio] ========================================');
      console.log('[Portfolio] Starting comprehensive image validation...');
      console.log(`[Portfolio] Total images to validate: ${allImagePaths.length}`);
      console.log(`[Portfolio] Residential: ${residentialProjects.length} images`);
      console.log(`[Portfolio] Commercial: ${commercialProjects.length} images`);
      console.log(`[Portfolio] Before & After: ${beforeAfterProjects.length} images`);
      console.log('[Portfolio] ========================================');

      // Log all expected paths
      console.log('[Portfolio] Expected image paths:');
      allImagePaths.forEach((path, idx) => {
        console.log(`  ${idx + 1}. ${path}`);
      });
      console.log('[Portfolio] ========================================');

      const results = await Promise.all(
        allImagePaths.map(async (fullPath) => {
          try {
            const absoluteUrl = new URL(fullPath, window.location.origin).href;
            console.log(`[Portfolio] Checking: ${fullPath} → ${absoluteUrl}`);
            
            const response = await fetch(fullPath, { method: 'HEAD' });
            
            if (!response.ok) {
              console.error(`[Portfolio] ✗ FAILED: ${fullPath}`, {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                type: response.type,
                headers: Object.fromEntries(response.headers.entries()),
              });
            } else {
              console.log(`[Portfolio] ✓ SUCCESS: ${fullPath}`, {
                status: response.status,
                contentType: response.headers.get('content-type'),
                contentLength: response.headers.get('content-length'),
              });
            }
            return { fullPath, exists: response.ok, status: response.status };
          } catch (error) {
            console.error(`[Portfolio] ✗ FETCH ERROR: ${fullPath}`, {
              error: error instanceof Error ? error.message : String(error),
              errorType: error instanceof Error ? error.constructor.name : typeof error,
            });
            return { fullPath, exists: false, status: 0 };
          }
        })
      );

      const found = results.filter((r) => r.exists);
      const missing = results.filter((r) => !r.exists);

      console.log('[Portfolio] ========================================');
      console.log(`[Portfolio] VALIDATION COMPLETE`);
      console.log(`[Portfolio] ✓ Found: ${found.length}/${allImagePaths.length} images`);
      console.log(`[Portfolio] ✗ Missing: ${missing.length}/${allImagePaths.length} images`);
      
      if (missing.length > 0) {
        console.error(`[Portfolio] Missing images (${missing.length}):`);
        missing.forEach((m, idx) => {
          console.error(`  ${idx + 1}. ${m.fullPath} (HTTP ${m.status || 'N/A'})`);
        });
      }
      
      if (found.length > 0) {
        console.log(`[Portfolio] Successfully found images (${found.length}):`);
        found.forEach((f, idx) => {
          console.log(`  ${idx + 1}. ${f.fullPath}`);
        });
      }
      console.log('[Portfolio] ========================================');
    };

    validateImages();
  }, []);

  const handleImageError = (imagePath: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    console.error(`[Portfolio] ✗ IMG ELEMENT ERROR: ${imagePath}`, {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      complete: img.complete,
      currentSrc: img.currentSrc,
      src: img.src,
      alt: img.alt,
      error: 'Image element failed to load - file may not exist, path is incorrect, or CORS issue',
    });
    setImageErrors((prev) => new Set(prev).add(imagePath));
  };

  const handleImageLoad = (imagePath: string, event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    console.log(`[Portfolio] ✓ IMG ELEMENT LOADED: ${imagePath}`, {
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
      currentSrc: img.currentSrc,
      complete: img.complete,
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
                      <p className="text-sm font-medium">Image unavailable</p>
                      <p className="text-xs mt-1 opacity-70 px-4 text-center break-all">
                        {project.image}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => handleImageError(project.image, e)}
                      onLoad={(e) => handleImageLoad(project.image, e)}
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

        {/* Debug info - always visible for troubleshooting */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg text-sm border border-border">
          <div className="flex items-start gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-2">Portfolio Debug Information</p>
              <div className="space-y-1 text-muted-foreground">
                <p>Environment: <span className="font-mono text-foreground">{import.meta.env.MODE}</span></p>
                <p>Total projects: <span className="font-mono text-foreground">{projects.length}</span></p>
                <p>Residential: <span className="font-mono text-foreground">{residentialProjects.length}</span> projects</p>
                <p>Commercial: <span className="font-mono text-foreground">{commercialProjects.length}</span> projects</p>
                <p>Before & After: <span className="font-mono text-foreground">{beforeAfterProjects.length}</span> projects</p>
                <p>Images loaded: <span className="font-mono text-foreground">{imageLoaded.size}</span></p>
                <p>Images failed: <span className="font-mono text-foreground">{imageErrors.size}</span></p>
                <p className="mt-3 text-xs">
                  Check browser console (F12) for detailed image validation logs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
