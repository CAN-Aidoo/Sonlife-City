import { useState, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const Hero = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/Sonlife.mp4" // TODO: Replace with your actual video path
        autoPlay
        loop
        muted={isMuted}
        playsInline
      >
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-4">
        <div className="z-10 text-white space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
            Welcome to <span className="text-gradient-gold">Sonlife</span> City Church
          </h1>
          <p className="text-xl md:text-2xl font-light">
            Bringing believers to the full Knowledge of Christ.
          </p>
          {/* Add calls to action here if needed */}
        </div>
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors"
        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
      >
        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      </button>
    </section>
  );
};

export default Hero;