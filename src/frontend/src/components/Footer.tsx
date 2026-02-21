import { Heart } from 'lucide-react';
import { SiFacebook, SiInstagram, SiLinkedin } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const getAppIdentifier = () => {
    if (typeof window !== 'undefined') {
      return encodeURIComponent(window.location.hostname);
    }
    return 'casa-di-vida';
  };

  return (
    <footer className="bg-secondary/30 border-t border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/assets/generated/logo.dim_400x400.png"
                alt="Casa Di Vida"
                className="h-10 w-10 object-contain"
              />
              <span className="font-display text-xl font-semibold text-foreground">
                Casa Di Vida
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Transforming spaces into timeless sanctuaries of elegance and comfort.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'Portfolio', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Facebook"
              >
                <SiFacebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Casa Di Vida. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center">
            Built with <Heart className="h-4 w-4 mx-1 text-accent fill-accent" /> using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${getAppIdentifier()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 hover:text-foreground transition-colors underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
