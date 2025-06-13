
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import AboutPage from "./pages/AboutPage";
import LiveServicePage from "./pages/LiveServicePage";
import CommunityPage from "./pages/CommunityPage";
import GivePage from "./pages/GivePage";
import SalvationPage from "./pages/SalvationPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import DonationSuccess from "@/pages/DonationSuccess";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = window.location;
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/live-service" element={<LiveServicePage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/give" element={<GivePage />} />
          <Route path="/salvation" element={<SalvationPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/donation/success" element={<DonationSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
