
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Mail, CheckCircle } from 'lucide-react';

interface NewsletterSignupProps {
  className?: string;
  variant?: 'default' | 'glass' | 'dark';
}

const NewsletterSignup = ({ className, variant = 'default' }: NewsletterSignupProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      
      toast({
        title: "Successfully Subscribed",
        description: "Thank you for subscribing to our newsletter!",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setEmail('');
        setIsSubscribed(false);
      }, 2000);
    }, 1500);
  };

  const getContainerClasses = () => {
    switch (variant) {
      case 'glass':
        return 'glass p-6 rounded-xl shadow-lg';
      case 'dark':
        return 'bg-sonlife-blue text-white p-6 rounded-xl shadow-lg';
      default:
        return 'bg-gray-50 p-6 rounded-xl';
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 ${variant === 'dark' ? 'bg-white/10' : 'bg-sonlife-blue/10'} rounded-lg flex items-center justify-center shrink-0`}>
          <Mail className={`h-6 w-6 ${variant === 'dark' ? 'text-white' : 'text-sonlife-blue'}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
          <p className={`${variant === 'dark' ? 'text-white/80' : 'text-gray-700'} mb-4`}>
            Subscribe to our newsletter to receive the latest news, updates, and events from our church.
          </p>
          
          {isSubscribed ? (
            <div className={`flex items-center gap-2 ${variant === 'dark' ? 'text-white' : 'text-gray-700'}`}>
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`flex-1 ${variant === 'dark' ? 'bg-white/10 border-white/20 text-white placeholder:text-white/60' : ''}`}
              />
              <Button 
                type="submit" 
                className={`${variant === 'dark' ? 'bg-white text-sonlife-blue hover:bg-white/90' : 'bg-sonlife-blue hover:bg-sonlife-blue/90 text-white'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterSignup;
