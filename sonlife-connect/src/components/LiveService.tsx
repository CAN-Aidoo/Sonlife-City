import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ArrowRight, Video, PlayCircle } from 'lucide-react';

const LiveService = () => {
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
      className="min-h-screen py-16 md:py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden" 
      id="live-service"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-sonlife-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-sonlife-gold/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-16">
          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '0.1s' }}>
            <span className="inline-block px-4 py-2 text-sm font-medium bg-sonlife-blue/10 text-sonlife-blue rounded-full">
              Join Us Live
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
            Experience Our <span className="text-gradient-blue">Services</span> Live
          </h2>
          
          <p className="text-gray-700 text-lg md:text-xl animate-on-scroll opacity-0" style={{ transitionDelay: '0.3s' }}>
            Can't make it in person? Join our vibrant worship experience online from anywhere in the world. 
            We broadcast all our services live with high-quality video and audio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2 glass rounded-2xl overflow-hidden shadow-2xl animate-on-scroll opacity-0 transform hover:scale-[1.02] transition-all duration-300" style={{ transitionDelay: '0.4s' }}>
            <div className="bg-gray-900 aspect-video relative group">
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed?listType=playlist&list=PLcmKO5HCFKQOFmQu0S3z_vg5TuosErY1F&index=0"
                title="Latest Sermons"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-white/90" />
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                <p className="text-white text-sm font-medium">Live Now</p>
              </div>
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Sunday Worship Service</h3>
              <p className="text-gray-700 text-lg mb-6">
                Join us for an inspiring time of worship, prayer, and powerful teaching from God's Word.
                Experience the presence of God in our live service.
              </p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
                  <Calendar className="h-5 w-5 text-sonlife-blue" />
                  <span className="text-gray-700 font-medium">Every Sunday</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
                  <Clock className="h-5 w-5 text-sonlife-blue" />
                  <span className="text-gray-700 font-medium">07:00 AM - 10:00 PM</span>
                </div>
              </div>
              
              <Link to="/live-service">
                <Button className="w-full h-12 text-lg bg-sonlife-blue hover:bg-sonlife-blue/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Video className="w-5 h-5 mr-2" />
                  Watch Live Now
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="glass p-8 rounded-2xl shadow-xl animate-on-scroll opacity-0 transform hover:scale-[1.02] transition-all duration-300" style={{ transitionDelay: '0.5s' }}>
              <h3 className="text-2xl font-bold mb-6">Upcoming Services</h3>
              
              <div className="space-y-6">
                <div className="border-l-3 border-sonlife-blue pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors">
                  <p className="font-semibold text-lg">Monday Prayer Meeting</p>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>Monday, 5:45 PM</span>
                  </div>
                </div>
                
                <div className="border-l-3 border-sonlife-blue pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors">
                  <p className="font-semibold text-lg">Wednesday Church Service</p>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>Wednesday, 5:45 PM</span>
                  </div>
                </div>
                
                <div className="border-l-3 border-sonlife-blue pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors">
                  <p className="font-semibold text-lg">Sunday Church Service</p>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>Sunday, 07:00 AM</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass p-8 rounded-2xl shadow-xl animate-on-scroll opacity-0 transform hover:scale-[1.02] transition-all duration-300" style={{ transitionDelay: '0.6s' }}>
              <h3 className="text-2xl font-bold mb-4">Past Sermons</h3>
              <p className="text-gray-700 text-lg mb-6">
                Missed a service? Access our complete library of past sermons and get inspired anytime.
              </p>
              <Link to="/live-service">
                <Button 
                  variant="outline" 
                  className="w-full h-12 text-lg border-2 border-sonlife-blue text-sonlife-blue hover:bg-sonlife-blue/10 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View Sermon Archive <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveService;
