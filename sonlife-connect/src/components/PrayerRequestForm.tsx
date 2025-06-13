
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { CheckCircle } from 'lucide-react';

interface PrayerRequestFormProps {
  className?: string;
}

const PrayerRequestForm = ({ className }: PrayerRequestFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      toast({
        title: "Prayer Request Submitted",
        description: "Our prayer team will be praying for your request.",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setName('');
        setEmail('');
        setRequest('');
        setIsSubmitted(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className={`glass p-6 rounded-xl shadow-lg ${className}`}>
      <h3 className="text-xl font-bold mb-4">Submit a Prayer Request</h3>
      
      {isSubmitted ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h4 className="text-lg font-medium mb-2">Request Received</h4>
          <p className="text-gray-600">Thank you for sharing your prayer request with us.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          
          <div>
            <Textarea
              placeholder="Your Prayer Request"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              required
              className="w-full min-h-[120px]"
            />
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="w-full bg-sonlife-blue hover:bg-sonlife-blue/90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Prayer Request"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default PrayerRequestForm;
