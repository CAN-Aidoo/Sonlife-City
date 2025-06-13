import { useEffect } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import LiveService from "@/components/LiveService";

const LiveServicePage = () => {
  useEffect(() => {
    document.title = "Live Service - Sonlife City Church HQ";
  }, []);

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sonlife-blue/10 text-sonlife-blue rounded-full">
            Live Service
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-sonlife-blue">
            Join Our <span className="text-sonlife-gold">Live Worship</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Experience the presence of God through live worship and powerful teaching.
          </p>
        </div>

        <LiveService />
      </div>
    </PageLayout>
  );
};

export default LiveServicePage; 