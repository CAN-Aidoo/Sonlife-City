import { useEffect, lazy, Suspense } from "react";
import { Link } from 'react-router-dom';
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import { Loader2, ArrowRight, Video, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layouts/PageLayout";

// Lazy load components for better performance
const About = lazy(() => import("@/components/About"));
const LiveService = lazy(() => import("../components/LiveService"));
const Community = lazy(() => import("@/components/Community"));
const Give = lazy(() => import("@/components/Give"));
const Salvation = lazy(() => import("@/components/Salvation"));
const EventCalendar = lazy(() => import("@/components/EventCalendar"));
const SermonSeries = lazy(() => import("@/components/SermonSeries"));
const PrayerRequestForm = lazy(() => import("../components/PrayerRequestForm"));
const PastorSection = lazy(() => import("@/components/PastorSection"));

// Loading component with improved visual feedback
const LoadingSection = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="w-8 h-8 animate-spin text-persian-blue" />
  </div>
);

// Section wrapper component with improved styling
const Section = ({ children, className = "", hasBg = false }: { children: React.ReactNode; className?: string; hasBg?: boolean }) => (
  <div className={`${hasBg ? 'bg-morning-blue/90 backdrop-blur-md rounded-2xl shadow-md border border-middle-blue/40' : ''} mb-16 transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const Index = () => {
  useEffect(() => {
    document.title = "Sonlife City Church HQ";
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Floating Elements with improved visibility */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute h-5 w-5 rounded-full bg-sonlife-gold/90 top-1/4 left-1/5 animate-float" />
        <div className="absolute h-8 w-8 rounded-full bg-picton-blue/80 bottom-1/3 right-1/4 animate-float" style={{ animationDelay: '7s' }} />
        <div className="absolute h-4 w-4 rounded-full bg-morning-blue/90 top-1/2 right-1/5 animate-float" style={{ animationDelay: '6s' }} />
        <div className="absolute h-6 w-6 rounded-full bg-sonlife-gold/80 bottom-3/4 left-2/3 animate-float" style={{ animationDelay: '8s' }} />
      </div>

      <NavBar />

      <PageLayout>
        <Hero />
        <Suspense fallback={<LoadingSection />}>
          <About />
          <LiveService />
          <Community />
          <Give />
          <Salvation />
          <EventCalendar />
          <SermonSeries />
          <PastorSection isCompact={true} />
          <PrayerRequestForm />
        </Suspense>
      </PageLayout>

      {/* Footer */}
      <Suspense fallback={<LoadingSection />}>
        {/* Footer component needs to be imported or created */}
      </Suspense>
    </div>
  );
};

export default Index;
