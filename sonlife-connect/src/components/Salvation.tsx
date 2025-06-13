
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Salvation = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements) {
      animatedElements.forEach((el) => {
        observer.observe(el);
      });
    }

    return () => {
      if (animatedElements) {
        animatedElements.forEach((el) => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 relative bg-gradient-to-r from-sonlife-blue to-blue-700 text-white overflow-hidden"
      id="salvation"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full transform translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full transform -translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '0.1s' }}>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white rounded-full backdrop-blur-sm">
              New Life in Christ
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
            Discover the Path to <span className="text-sonlife-gold">Salvation</span>
          </h2>
          
          <p className="text-white/90 text-lg animate-on-scroll opacity-0" style={{ transitionDelay: '0.3s' }}>
            God loves you and has a wonderful plan for your life. Discover how you can experience 
            forgiveness, purpose, and eternal life through a relationship with Jesus Christ.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl animate-on-scroll opacity-0" style={{ transitionDelay: '0.4s' }}>
              <h3 className="text-xl font-bold mb-3">Recognize</h3>
              <p className="text-white/80">
                "For all have sinned and fall short of the glory of God." - Romans 3:23
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl animate-on-scroll opacity-0" style={{ transitionDelay: '0.5s' }}>
              <h3 className="text-xl font-bold mb-3">Believe</h3>
              <p className="text-white/80">
                "For God so loved the world that he gave his one and only Son..." - John 3:16
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl animate-on-scroll opacity-0" style={{ transitionDelay: '0.6s' }}>
              <h3 className="text-xl font-bold mb-3">Receive</h3>
              <p className="text-white/80">
                "If you declare with your mouth...and believe in your heart..." - Romans 10:9
              </p>
            </div>
          </div>
          
          <div className="pt-4 space-y-4 animate-on-scroll opacity-0" style={{ transitionDelay: '0.7s' }}>
            <p className="text-white/90">
              Ready to begin your journey with Christ? We'd love to pray with you and help you take your first steps.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/salvation">
                <Button size="lg" className="bg-white text-sonlife-blue hover:bg-white/90 flex items-center gap-2 btn-hover-effect">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/live-service">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Join Our Service
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Salvation;
