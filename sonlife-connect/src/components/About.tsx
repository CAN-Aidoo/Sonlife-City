import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, Calendar, Heart, ArrowRight } from 'lucide-react';

const About = () => {
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
    <section ref={sectionRef} className="py-24 rounded-2xl" id="about">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '0.1s' }}>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-persian-blue/15 text-persian-blue rounded-full shadow-sm">
                About Us
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
              Welcome to <span className="text-gradient-gold">Sonlife</span> City Church
            </h2>
            
            <p className="text-college-blue/90 text-lg animate-on-scroll opacity-0" style={{ transitionDelay: '0.3s' }}>
              Sonlife City Church HQ is a church bringing believers to the full Knowledge of Christ taking the full gospel to every nation, everybody and everyday.
            </p>
            
            <p className="text-college-blue/90 text-lg animate-on-scroll opacity-0" style={{ transitionDelay: '0.4s' }}>
              Founded on the principles of sound biblical teaching and spiritual growth, we strive to impact 
              lives through worship, discipleship, and outreach programs that touch both our local community 
              and the world at large.
            </p>
            
            <Link to="/about" className="animate-on-scroll opacity-0" style={{ transitionDelay: '0.5s' }}>
              <Button className="mt-4 group">
                Learn More About Us <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.2s' }}>
              <div className="w-14 h-14 bg-persian-blue/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5">
                <Users className="h-7 w-7 text-persian-blue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-persian-blue">Our Service Units and Ministries</h3>
              <p className="text-college-blue/90">
                Join a diverse family of believers united by faith and love. Experience genuine fellowship and support.
              </p>
            </div>
            
            <div className="glass-accent p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.3s' }}>
              <div className="w-14 h-14 bg-picton-blue/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5">
                <Calendar className="h-7 w-7 text-picton-blue animate-pulse-soft" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-persian-blue">Sunday Church Service</h3>
              <p className="text-college-blue/90">
                Join us for worship, prayer and the Word every Sunday at 7:00 AM.
              </p>
            </div>
            
            <div className="glass p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.4s' }}>
              <div className="w-14 h-14 bg-yellow-banana/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5">
                <Heart className="h-7 w-7 text-sonlife-gold animate-pulse-soft" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-persian-blue">Outreach Programs</h3>
              <p className="text-college-blue/90">
                Make a difference through our various community service and global mission initiatives.
              </p>
            </div>
            
            <div className="glass-accent p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.5s' }}>
              <div className="w-14 h-14 bg-picton-blue/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5 animate-float" style={{ animationDuration: '4s' }}>
                <svg className="h-7 w-7 text-picton-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-persian-blue">Wednesday Church Service</h3>
              <p className="text-college-blue/90">
                Join us for midweek worship, prayer and the Word every Wednesday at 5:45 PM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
