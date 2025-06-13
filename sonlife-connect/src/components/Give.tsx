import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Globe, Home, Gift, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Give = () => {
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
    <section ref={sectionRef} className="py-24 relative rounded-2xl backdrop-blur-md shadow-md" id="give">
      {/* Background decorative elements with improved visibility */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-persian-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-banana/15 rounded-full blur-3xl"></div>
        
        {/* Floating particles with improved visibility */}
        <div className="absolute h-6 w-6 rounded-full bg-picton-blue/40 top-1/4 right-1/4 animate-float" style={{ animationDuration: '10s' }}></div>
        <div className="absolute h-5 w-5 rounded-full bg-middle-blue/30 bottom-1/3 left-1/5 animate-float" style={{ animationDuration: '15s', animationDelay: '2s' }}></div>
        <div className="absolute h-7 w-7 rounded-full bg-yellow-banana/25 top-2/3 right-1/3 animate-float" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="glass p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.3s' }}>
                <div className="w-14 h-14 bg-persian-blue/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5">
                  <Heart className="h-7 w-7 text-persian-blue animate-pulse-soft" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-persian-blue">Tithes & Offerings</h3>
                <p className="text-college-blue/90">
                  "Honor the Lord with your wealth, with the firstfruits of all your crops." - Proverbs 3:9
                </p>
              </div>
              
              <div className="glass-accent p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.4s' }}>
                <div className="w-14 h-14 bg-picton-blue/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5">
                  <Globe className="h-7 w-7 text-picton-blue animate-pulse-soft" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-persian-blue">Missions Support</h3>
                <p className="text-college-blue/90">
                  Help spread the Gospel globally and be part of God's work in every nation.
                </p>
              </div>
              
              <div className="glass-accent p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.5s' }}>
                <div className="w-14 h-14 bg-persian-blue/15 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5">
                  <Home className="h-7 w-7 text-persian-blue animate-pulse-soft" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-persian-blue">Building Fund</h3>
                <p className="text-college-blue/90">
                  Support the expansion and improvement of our church facilities.
                </p>
              </div>
              
              <div className="glass p-8 rounded-xl animate-on-scroll opacity-0 h-full border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.6s' }}>
                <div className="w-14 h-14 bg-yellow-banana/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-5">
                  <Gift className="h-7 w-7 text-sonlife-gold animate-pulse-soft" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-persian-blue">Outreach Programs</h3>
                <p className="text-college-blue/90">
                  Support our community initiatives to help those in need.
                </p>
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0 mt-12" style={{ transitionDelay: '0.7s' }}>
              <div className="bg-morning-blue/80 backdrop-blur-sm p-8 rounded-xl border border-middle-blue/40 shadow-md">
                <h3 className="text-xl font-bold mb-4 text-persian-blue">Supporting Scripture</h3>
                <p className="text-college-blue/90 italic text-lg">
                  "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="animate-on-scroll opacity-0 text-center" style={{ transitionDelay: '0.3s' }}>
              <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-persian-blue/15 text-persian-blue rounded-full shadow-sm">
                Kingdom Giving
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight mt-5 text-center mb-8 animate-on-scroll opacity-0" style={{ transitionDelay: '0.4s' }}>
              Partner with <span className="text-gradient-gold">Us</span> in Ministry
            </h2>
            
            <div className="glass p-10 rounded-xl shadow-lg animate-on-scroll opacity-0 border border-middle-blue/40" style={{ transitionDelay: '0.5s' }}>
              <p className="text-college-blue/90 mb-8 text-center text-lg">
                Your generous donations help expand our ministry and allow us to spread the gospel to every nation. We deeply appreciate your partnership in our mission.
              </p>
              
              <div className="text-center">
                <Link to="/give">
                  <Button variant="secondary" size="lg" className="shadow-md group">
                    Give Now <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-10">
              <div className="glass-accent p-8 rounded-xl text-center animate-on-scroll opacity-0 border border-middle-blue/50 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.6s' }}>
                <h4 className="font-bold text-lg mb-3 text-persian-blue">Mobile Giving</h4>
                <p className="text-college-blue/90">Scan our QR code for quick and secure mobile donations</p>
              </div>
              
              <div className="glass p-8 rounded-xl text-center animate-on-scroll opacity-0 border border-middle-blue/40 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1" style={{ transitionDelay: '0.7s' }}>
                <h4 className="font-bold text-lg mb-3 text-persian-blue">Recurring Giving</h4>
                <p className="text-college-blue/90">Set up weekly or monthly donations to support ongoing ministry</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Give;
