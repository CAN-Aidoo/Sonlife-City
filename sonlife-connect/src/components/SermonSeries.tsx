import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  imageUrl: string;
  duration: string;
  videoId: string;
}

const sermons: Sermon[] = [
  {
    id: '1',
    title: 'SUNDAY MORNING SERVICE | SONLIFE CITY CHURCH',
    speaker: 'Pastor Francis Adjapong',
    date: 'March 31, 2024',
    imageUrl: 'https://i.ytimg.com/vi/cDAnzzTM0aI/maxresdefault.jpg',
    duration: '2:15:30',
    videoId: 'cDAnzzTM0aI'
  },
  {
    id: '2',
    title: 'WEDNESDAY EVENING SERVICE | SONLIFE CITY CHURCH',
    speaker: 'Pastor Abena Adjapong',
    date: 'March 27, 2024',
    imageUrl: 'https://i.ytimg.com/vi/Hs7aMUWNzKo/maxresdefault.jpg',
    duration: '1:45:00',
    videoId: 'Hs7aMUWNzKo'
  },
  {
    id: '3',
    title: 'MONDAY PRAYER SERVICE | SONLIFE CITY CHURCH',
    speaker: 'Pastor Yorne',
    date: 'March 25, 2024',
    imageUrl: 'https://i.ytimg.com/vi/8FWR8rvBGnQ/maxresdefault.jpg',
    duration: '2:00:00',
    videoId: '8FWR8rvBGnQ'
  },
  {
    id: '4',
    title: 'SUNDAY MORNING SERVICE | SONLIFE CITY CHURCH',
    speaker: 'Pastor Newman',
    date: 'March 24, 2024',
    imageUrl: 'https://i.ytimg.com/vi/qWFJp_yKkqY/maxresdefault.jpg',
    duration: '1:55:00',
    videoId: 'qWFJp_yKkqY'
  }
];

const SermonCard = ({ sermon, isLoading }: { sermon: Sermon; isLoading: boolean }) => {
  const handleWatchSermon = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (isLoading) {
    return (
      <div className="glass rounded-xl overflow-hidden shadow-lg">
        <Skeleton className="w-full h-48" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white/50 backdrop-blur-sm">
      <div className="relative">
        <img 
          src={sermon.imageUrl} 
          alt={sermon.title} 
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{sermon.date}</span>
            <span className="text-sm">{sermon.duration}</span>
          </div>
        </div>
        <button 
          onClick={() => handleWatchSermon(sermon.videoId)}
          className="absolute inset-0 flex items-center justify-center group"
        >
          <div className="w-14 h-14 bg-sonlife-blue/90 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-sonlife-blue transition-all duration-300 group-hover:scale-110 group-hover:bg-sonlife-gold">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </button>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-bold mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300">
          {sermon.title}
        </h3>
        <p className="text-gray-700 text-sm mb-4">{sermon.speaker}</p>
        <button 
          onClick={() => handleWatchSermon(sermon.videoId)}
          className="text-sonlife-blue text-sm font-medium hover:text-sonlife-gold transition-colors duration-300 inline-flex items-center"
        >
          Watch Now <ArrowRight className="ml-1 h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

const SermonSeries = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

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
      clearTimeout(timer);
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      id="sermons"
    >
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6 sticky top-24 self-start">
            <div className="animate-on-scroll opacity-0" style={{ transitionDelay: '0.1s' }}>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-sonlife-blue/10 text-sonlife-blue rounded-full">
                Latest Services
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight animate-on-scroll opacity-0" style={{ transitionDelay: '0.2s' }}>
              Watch Our <span className="text-gradient-blue">Recent Services</span>
            </h2>
            
            <p className="text-gray-700 animate-on-scroll opacity-0" style={{ transitionDelay: '0.3s' }}>
              Join us in worship and receive powerful teachings from our recent church services. 
              Experience the presence of God through our online ministry.
            </p>
            
            <div className="pt-4 animate-on-scroll opacity-0" style={{ transitionDelay: '0.4s' }}>
              <a 
                href="https://www.youtube.com/@SOULWINNERSFOUNDATION/streams" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-sonlife-blue hover:bg-sonlife-gold transition-colors duration-300 text-white flex items-center gap-2">
                  View All Services <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {sermons.map((sermon, index) => (
                <div 
                  key={sermon.id}
                  className="animate-on-scroll opacity-0"
                  style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                >
                  <SermonCard sermon={sermon} isLoading={isLoading} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SermonSeries;
