import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-elegant.dim_1920x1080.png"
          alt="Modern elegant interior space"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for improved text visibility */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-10 animate-fade-in">
            <img
              src="/assets/generated/logo.dim_400x400.png"
              alt="Casa Di Vida Logo"
              className="h-28 w-28 mx-auto mb-8 object-contain drop-shadow-2xl"
            />
          </div>
          
          <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 animate-fade-in leading-tight drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
            Casa Di Vida
          </h1>
          
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white mb-6 animate-fade-in drop-shadow-lg" style={{ animationDelay: '0.1s', textShadow: '0 3px 10px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
            Interior Decoration & Designs
          </p>
          
          <p className="text-xl sm:text-2xl text-white/95 mb-16 max-w-3xl mx-auto animate-fade-in leading-relaxed drop-shadow-md" style={{ animationDelay: '0.2s', textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}>
            Transforming spaces into timeless sanctuaries of elegance and comfort.
            Where your vision meets our expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              onClick={scrollToPortfolio}
              className="text-lg px-10 py-7 shadow-elegant-lg hover:shadow-elegant-xl transition-all duration-300 hover:scale-105 drop-shadow-xl"
            >
              View Our Work
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToContact}
              className="text-lg px-10 py-7 bg-white/95 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:scale-105 border-2 border-white/80 text-foreground drop-shadow-xl"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-7 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2 drop-shadow-lg">
          <div className="w-2 h-4 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
