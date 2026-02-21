import { Award, Heart, Users, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const values = [
  {
    icon: Heart,
    title: 'Passion',
    description: 'We pour our hearts into every project, treating each space as if it were our own.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Uncompromising quality and attention to detail in every aspect of our work.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Your vision guides us. We listen, understand, and bring your dreams to life.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Blending timeless design principles with contemporary trends and solutions.',
  },
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-32 bg-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            ref={ref}
            className={`grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-start animate-on-scroll ${isVisible ? 'visible' : ''}`}
          >
            {/* Content - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8">
                About Casa Di Vida
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p className="text-xl">
                  Casa Di Vida is more than an interior design firm—we are storytellers who craft
                  spaces that reflect the essence of those who inhabit them. With a deep appreciation
                  for beauty, functionality, and the art of living well, we transform houses into homes
                  and spaces into sanctuaries.
                </p>
                <p>
                  Our design philosophy centers on creating timeless interiors that balance elegance
                  with comfort, sophistication with warmth. We believe that great design should not
                  only look beautiful but also enhance the way you live, work, and connect with your
                  environment.
                </p>
                <p>
                  Every project begins with understanding your unique vision, lifestyle, and aspirations.
                  From there, we meticulously curate every element—from color palettes and furnishings
                  to lighting and accessories—to create cohesive, harmonious spaces that stand the test
                  of time.
                </p>
              </div>
            </div>

            {/* Values - Takes 2 columns */}
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-card p-8 rounded-2xl border border-border/30 hover:shadow-elegant-lg transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
