import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Community = () => {
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
  
  const serviceUnits = [
    { title: "Prayer Service Unit", leader: "Pastor Bismark" },
    { title: "Technical Service Unit", leader: "Deacon Felix" },
    { title: "Sanctuary Service Unit", leader: "Deacon Abrakwa" },
    { title: "Music Service Unit", leader: "Brother Elvin" },
    { title: "Theatre Service Unit", leader: "Deaconess Fanny" },
    { title: "Protocol Service Unit", leader: "Deacon Prince" },
  ];
  
  const ministries = [
    { title: "The Gentleman's Network", leader: "Ing Kwame Egyari" },
    { title: "The Esteemed Ladies Network", leader: "Pastor Abena Adjapong" },
    { title: "4th Generation Ministry", leader: "Bro Shadrach" },
    { title: "The Publishers Ministry", leader: "Sis Priscilla" },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative" id="community">
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-sonlife-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-sonlife-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-12">
          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '0.1s' }}>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-sonlife-blue/10 text-sonlife-blue rounded-full">
              Get Involved
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
            Service Units &amp; Ministries
          </h2>
        </div>
        
        {/* Service Units Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-sonlife-blue text-center mb-8 animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
            Service Units
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceUnits.map((unit, index) => (
              <div 
                key={unit.title}
                className="glass p-6 rounded-xl shadow-lg animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                <h4 className="text-xl font-bold mb-2">{unit.title}</h4>
                <p className="text-gray-700 mb-4">Leader: {unit.leader}</p>
                <Link to="/community" className="text-sonlife-blue font-medium hover:underline flex items-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ministries Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-sonlife-blue text-center mb-8 animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
            Ministries
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry, index) => (
              <div 
                key={ministry.title}
                className="glass p-6 rounded-xl shadow-lg animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
              >
                <h4 className="text-xl font-bold mb-2">{ministry.title}</h4>
                <p className="text-gray-700 mb-4">Leader: {ministry.leader}</p>
                <Link to="/community" className="text-sonlife-blue font-medium hover:underline flex items-center gap-2">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
        
        {/* Optional: Button to Explore All */}
        <div className="mt-12 text-center animate-on-scroll opacity-0" style={{ transitionDelay: '0.9s' }}>
          <Link to="/community">
            <Button size="lg" className="bg-sonlife-blue hover:bg-sonlife-blue/90 text-white">
              Explore All
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Community;
