
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, MapPin } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Sunday Church Service',
    date: 'Every Sunday',
    time: '07:00 AM - 10:00 AM',
    location: 'SonLife City Church, Holy Grounds Auditorium, opposite Residency off Sunyani Road',
    description: 'Join us for worship, prayer and the Word.'
  },
  {
    id: '2',
    title: 'Wednesday Church Service',
    date: 'Every Wednesday',
    time: '17:45 PM - 19:00 PM',
    location: 'SonLife City Church, Holy Grounds Auditorium, opposite Residency off Sunyani Road',
    description: 'Join us for worship, prayer and the Word.'
  },
  {
    id: '3',
    title: 'Monday Prayer Meeting',
    date: 'Every Monday',
    time: '17:45 PM - 19:00 PM',
    location: 'SonLife City Church, Holy Grounds Auditorium, opposite Residency off Sunyani Road',
    description: 'Worship, fellowship and Bible study for teens and young adults.'
  },
  {
    id: '4',
    title: 'Friday Outreach Day',
    date: 'Every Friday',
    time: '17:45 PM - 19:00 PM',
    location: 'SonLife City Church, Holy Grounds Auditorium, opposite Residency off Sunyani Road',
    description: 'Serving our local community through various outreach activities.'
  }
];

const EventCalendar = () => {
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
      className="py-20 bg-white relative overflow-hidden"
      id="events"
    >
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-sonlife-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-sonlife-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto space-y-6 mb-12">
          <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '0.1s' }}>
            <span className="inline-block px-3 py-1 text-xs font-medium bg-sonlife-blue/10 text-sonlife-blue rounded-full">
              Upcoming Events
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
            Join Our <span className="text-gradient-blue">Church Events</span>
          </h2>
          
          <p className="text-gray-700 animate-on-scroll opacity-0" style={{ transitionDelay: '0.3s' }}>
            Stay connected with our church community through these upcoming events and activities. 
            We'd love to see you there!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="glass p-6 rounded-xl shadow-lg animate-on-scroll opacity-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ transitionDelay: `${0.3 + index * 0.1}s` }}
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-16 h-16 bg-sonlife-blue/10 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar className="h-8 w-8 text-sonlife-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-sonlife-blue" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-sonlife-blue" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-sonlife-blue" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center animate-on-scroll opacity-0" style={{ transitionDelay: '0.7s' }}>
          <Link to="/community">
            <Button className="bg-sonlife-blue hover:bg-sonlife-blue/90 text-white flex items-center gap-2">
              View All Events <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EventCalendar;
