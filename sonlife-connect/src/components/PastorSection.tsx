
import { useState, useEffect } from 'react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
// Import pastor images
import pastor11 from '@/assets/images/x.jpg';
import pastor12 from '@/assets/images/y.jpg';
import pastor13 from '@/assets/images/z.jpg';



const pastorImages = [
  pastor11,
  pastor12,
  pastor13,
];

interface PastorSectionProps {
  isCompact?: boolean;
}

const PastorSection = ({ isCompact = false }: PastorSectionProps) => {
  const [pastorBio] = useState(`
    Ambassador Rev. Dr. Francis Adjapong is a pillar of inspiration and leadership in Sunyani, Ghana. Raised in Sunyani and educated at Sunyani Senior High, he was deeply influenced by the rich cultural and spiritual heritage of his hometown, which laid the foundation for his lifelong commitment to faith and education.
    
    An accomplished pastor and visionary leader, he founded Sonlife City Church where he serves as a dedicated bond servant, tirelessly nurturing the community with compassion, wisdom, and spiritual guidance. His ministry extends well beyond the pulpit, touching lives and encouraging a spirit of unity, purpose, and service among his congregation.
    
    At the heart of his personal life is the loving partnership he shares with Rev. Dr. Pastor Abena Adjapong. Together, they have been blessed with four wonderful children, and their family stands as a testament to their shared values of faith, love, and commitment. Today, at Sonlife City Church HQ in Sunyani, Rev. Dr. Francis Adjapong continues to lead with grace and conviction, impacting countless lives with his humble and heartfelt ministry.
  `);

  const paragraphs = pastorBio.trim().split('\n\n').map(p => p.trim());

  return (
    <div className="py-12 bg-white rounded-xl">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sonlife-blue/20 text-sonlife-blue rounded-full backdrop-blur-sm">
            Meet Our Pastor
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-sonlife-blue">
            Rev. Dr. Francis <span className="text-sonlife-gold">Adjapong</span>
          </h2>
          <p className="mt-4 text-gray-700">
            Founder & Senior Pastor of Sonlife City Church
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Pastor Slideshow */}
          <div className="relative">
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {pastorImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="overflow-hidden rounded-xl shadow-xl">
                        <img 
                          src={image} 
                          alt={`Pastor Francis Adjapong ${index + 1}`} 
                          className="w-full aspect-[3/4] object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>

          {/* Pastor Biography */}
          <div className="space-y-4 px-4">
            {isCompact ? (
              <>
                <p className="text-gray-700 leading-relaxed text-justify tracking-tight">{paragraphs[0]}</p>
                <div className="flex justify-center md:justify-start mt-6">
                  <Link to="/about">
                    <Button className="bg-sonlife-blue hover:bg-sonlife-blue/90 text-white flex items-center gap-2">
                      Read Full Biography <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed text-justify tracking-tight">{paragraph}</p>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastorSection;
