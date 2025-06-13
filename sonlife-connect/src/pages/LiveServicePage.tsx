import { useEffect, useState } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import SermonSeries from "@/components/SermonSeries";
import ChurchMap from "@/components/ChurchMap";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, ArrowRight, Youtube, Loader2, PlayCircle, Share2 } from "lucide-react";
import { fetchRecentSermons, checkLiveStream, YouTubeVideo } from "@/lib/youtube";
import { toast } from "@/hooks/use-toast";

const YOUTUBE_CHANNEL_ID = import.meta.env.VITE_YOUTUBE_CHANNEL_ID;

const LiveServicePage = () => {
  const [isStreamError, setIsStreamError] = useState(false);
  const [isStreamLoading, setIsStreamLoading] = useState(true);
  const [recentSermons, setRecentSermons] = useState<YouTubeVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<string>('live');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    document.title = "Live Service - Sonlife City Church HQ";
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      // Check for live stream
      const liveStream = await checkLiveStream();
      setIsLive(!!liveStream);
      
      // Fetch recent sermons
      const sermons = await fetchRecentSermons();
      setRecentSermons(sermons);
    } catch (error) {
      console.error('Error initializing data:', error);
    }
  };

  const handleStreamLoad = () => {
    setIsStreamLoading(false);
    setIsStreamError(false);
  };

  const handleStreamError = () => {
    setIsStreamLoading(false);
    setIsStreamError(true);
  };

  const getVideoUrl = () => {
    if (activeVideo === 'live') {
      return `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=1&rel=0`;
    }
    return `https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`;
  };

  const handleShare = async () => {
    try {
      const shareData = {
        title: 'Sonlife City Church Live Service',
        text: 'Join us for live worship at Sonlife City Church!',
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "Share this link with others to invite them to our service.",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <PageLayout>
      <div>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 text-white overflow-hidden bg-sonlife-blue"> {/* Added bg-sonlife-blue */}
          {/* Image Slideshow Background */}
          {/* Removed image slideshow background div */}

          {/* Existing decorative elements - ensure they are above the slideshow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full transform translate-x-1/3 -translate-y-1/2 blur-3xl z-0"></div> {/* Added z-index */}
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-white/5 rounded-full transform -translate-x-1/3 translate-y-1/2 blur-3xl z-0"></div> {/* Added z-index */}

          {/* Existing content - ensure it is above the slideshow */}
          <div className="container px-4 md:px-6 relative z-10"> {/* Added z-index */}
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-full mb-6">
                Live Worship Experience
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-8">
                Join Our <span className="text-sonlife-gold">Live</span> Service
              </h1>
              <p className="text-white/90 text-lg md:text-xl mb-12 max-w-3xl mx-auto">
                Experience the presence of God through worship, prayer, and powerful teaching. 
                Connect with our community from anywhere in the world.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-white text-sonlife-blue hover:bg-white/90 text-lg px-8 h-12"
                  onClick={() => setActiveVideo('live')}
                >
                  <Video className="w-5 h-5 mr-2" />
                  Watch Live Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 h-12"
                  onClick={handleShare}
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Service
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Live Streaming Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              <div className="lg:col-span-2 glass rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gray-900 aspect-video relative">
                  {isStreamLoading && !isStreamError && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-center space-y-4">
                        <div className="w-24 h-24 bg-sonlife-blue/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
                          <Loader2 className="h-12 w-12 text-white animate-spin" />
                        </div>
                        <p className="text-white text-lg font-medium">Loading video...</p>
                      </div>
                    </div>
                  )}
                  
                  {isStreamError && activeVideo === 'live' ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-center space-y-6 p-8">
                        <div className="w-24 h-24 bg-sonlife-blue/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto">
                          <Video className="h-12 w-12 text-white" />
                        </div>
                        <div>
                          <p className="text-white text-xl font-medium mb-2">Our next live service begins soon</p>
                          <p className="text-white/80 mb-6">Join us every Sunday at 7:00 AM for live worship</p>
                        </div>
                        <a 
                          href={`https://www.youtube.com/@${YOUTUBE_CHANNEL_ID}/streams`}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-sonlife-blue/20 backdrop-blur-md rounded-full text-white hover:bg-sonlife-blue/30 transition-colors text-lg"
                        >
                          <Youtube className="h-6 w-6" />
                          <span>Watch on YouTube</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <iframe
                      src={getVideoUrl()}
                      className="w-full h-full absolute inset-0"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      onLoad={handleStreamLoad}
                      onError={handleStreamError}
                    ></iframe>
                  )}
                  {!isStreamError && !isStreamLoading && activeVideo === 'live' && isLive && (
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <p className="text-white text-sm font-medium">Live</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {activeVideo === 'live' ? 'Sunday Worship Service' : 'Recent Sermon'}
                      </h2>
                      <p className="text-gray-700 text-lg">
                        {activeVideo === 'live' 
                          ? 'Join us for an inspiring time of worship, prayer, and powerful teaching from God\'s Word.'
                          : 'Watch our recent sermons and get inspired by the Word of God.'}
                      </p>
                    </div>
                    {activeVideo !== 'live' && (
                      <Button
                        size="lg"
                        className="bg-sonlife-blue hover:bg-sonlife-blue/90 text-white"
                        onClick={() => setActiveVideo('live')}
                    >
                        <Video className="h-5 w-5 mr-2" />
                        Switch to Live
                      </Button>
                    )}
                  </div>
                  
                  {activeVideo === 'live' && (
                    <div className="flex flex-wrap gap-6 justify-center">
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
                      <Calendar className="h-5 w-5 text-sonlife-blue" />
                        <span className="text-gray-700 font-medium">Every Sunday</span>
                    </div>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full">
                      <Clock className="h-5 w-5 text-sonlife-blue" />
                        <span className="text-gray-700 font-medium">07:00 AM - 10:00 AM</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-8 lg:col-span-2">
                <div className="glass p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Recent Sermons</h3>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {recentSermons.map((sermon) => (
                      <button
                        key={sermon.id.videoId}
                        onClick={() => setActiveVideo(sermon.id.videoId)}
                        className="w-full text-left hover:bg-gray-50 p-3 rounded-xl transition-colors group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={sermon.snippet.thumbnails.medium.url}
                              alt={sermon.snippet.title}
                              className="w-32 h-20 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <PlayCircle className="h-8 w-8 text-white" />
                      </div>
                    </div>
                          <div>
                            <h4 className="font-medium text-base line-clamp-2 group-hover:text-sonlife-blue transition-colors">
                              {sermon.snippet.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(sermon.snippet.publishedAt).toLocaleDateString(undefined, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                      </div>
                    </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="glass p-8 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold mb-6 text-center">Join Us In Person</h3>
                  <div className="rounded-xl overflow-hidden mx-auto">
                  <ChurchMap />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Sermon Series Section */}
        <SermonSeries />
      </div>
    </PageLayout>
  );
};

export default LiveServicePage;
