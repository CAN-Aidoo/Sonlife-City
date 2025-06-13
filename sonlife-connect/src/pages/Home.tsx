import Hero from '@/components/Hero';
import About from '@/components/About';
import Salvation from '@/components/Salvation';
import Give from '@/components/Give';
import EventCalendar from '@/components/EventCalendar';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Fixed NavBar */}
      <NavBar />

      {/* Hero Section (full height below NavBar) */}
      {/* Hero Section (full height below NavBar) */}
      <div className="relative pt-[theme('spacing.0')]"> {/* Add padding top equal to NavBar height (pt-28) */}
         <Hero />
      </div>

      {/* Scrollable Content Container */}
      <div className="relative z-10 bg-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl space-y-24 py-16">
          {/* Existing Sections */}
          <About />
          <Salvation />
          <Give />
          <EventCalendar />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Home;