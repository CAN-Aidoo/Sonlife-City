import { Suspense, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Loader2 } from "lucide-react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

// Loading component
const LoadingSection = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <Loader2 className="w-8 h-8 animate-spin text-persian-blue" />
  </div>
);

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  // Add the fade-in animations to page elements when the component mounts
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-1'); // Ensure opacity is set to 1
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 } 
    );

    // Query for elements that need scroll animation
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .reveal-on-scroll');
    
    animatedElements.forEach((el) => {
      // Add opacity-0 initially to prevent flash of unstyled content
      el.classList.add('opacity-0'); 
      observer.observe(el);
    });

    return () => {
      animatedElements.forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Content Layer */}
      <div className="relative z-10">
        <NavBar />
        <main className="min-h-screen w-full bg-white/10 backdrop-blur-sm">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            {children}
          </div>
        </main>
        <Suspense fallback={<LoadingSection />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
