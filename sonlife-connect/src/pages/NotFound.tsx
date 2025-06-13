
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Page Not Found - Sonlife City Church HQ";
    
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto text-center glass p-8 rounded-xl shadow-lg">
            <div className="w-24 h-24 bg-sonlife-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl font-bold text-sonlife-blue">404</span>
            </div>
            <h1 className="text-3xl font-serif font-bold mb-4 text-sonlife-blue">Page Not Found</h1>
            <p className="text-gray-700 mb-8">
              We couldn't find the page you were looking for. It might have been moved, 
              deleted, or never existed in the first place.
            </p>
            <Link to="/">
              <Button className="bg-sonlife-blue hover:bg-sonlife-blue/90 text-white flex items-center gap-2">
                <Home className="h-4 w-4" /> Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
