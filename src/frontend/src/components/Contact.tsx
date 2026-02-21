import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSubmitContact } from '../hooks/useQueries';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@casadivida.com',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (555) 123-4567',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Design District, Your City',
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const submitContactMutation = useSubmitContact();
  const { ref, isVisible } = useScrollAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.projectType || !formData.message) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await submitContactMutation.mutateAsync(formData);
      toast.success('Thank you for reaching out! We\'ll be in touch soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Contact form error:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <section id="contact" className="py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div
              ref={ref}
              className={`text-center mb-20 animate-on-scroll ${isVisible ? 'visible' : ''}`}
            >
              <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Let's Create Together
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ready to transform your space? Get in touch with us to discuss your project and
                discover how we can bring your vision to life.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-10">
                <div>
                  <h3 className="font-display text-3xl font-semibold text-foreground mb-8">
                    Get In Touch
                  </h3>
                  <div className="space-y-8">
                    {contactInfo.map((info, index) => {
                      const Icon = info.icon;
                      return (
                        <div key={index} className="flex items-start space-x-5">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground mb-2">
                              {info.label}
                            </div>
                            <div className="text-lg text-foreground font-medium">{info.value}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-8 border-t border-border">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    We typically respond within 24 hours during business days. For urgent inquiries,
                    please call us directly.
                  </p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="name" className="text-base font-medium">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="h-14 text-base px-5 border-2 focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="email" className="text-base font-medium">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        className="h-14 text-base px-5 border-2 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label htmlFor="phone" className="text-base font-medium">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                        className="h-14 text-base px-5 border-2 focus:border-primary transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="projectType" className="text-base font-medium">
                        Project Type <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) => handleChange('projectType', value)}
                        required
                      >
                        <SelectTrigger id="projectType" className="h-14 text-base px-5 border-2">
                          <SelectValue placeholder="Select a project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential Design</SelectItem>
                          <SelectItem value="commercial">Commercial Design</SelectItem>
                          <SelectItem value="consultation">Design Consultation</SelectItem>
                          <SelectItem value="renovation">Renovation Project</SelectItem>
                          <SelectItem value="styling">Styling & Accessories</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="message" className="text-base font-medium">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, vision, and any specific requirements..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      className="text-base px-5 py-4 border-2 focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full sm:w-auto px-12 py-7 text-lg shadow-elegant-lg hover:shadow-elegant-xl transition-all duration-300 hover:scale-105"
                    disabled={submitContactMutation.isPending}
                  >
                    {submitContactMutation.isPending ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
