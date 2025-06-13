import { useEffect } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import SermonSeries from "@/components/SermonSeries";

const SermonSeriesPage = () => {
  useEffect(() => {
    document.title = "Sermon Series - Sonlife City Church HQ";
  }, []);

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sonlife-blue/10 text-sonlife-blue rounded-full">
            Sermon Series
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-sonlife-blue">
            Watch Our <span className="text-sonlife-gold">Latest Sermons</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            Be inspired and transformed through powerful messages from God's Word.
          </p>
        </div>

        <SermonSeries />
      </div>
    </PageLayout>
  );
};

export default SermonSeriesPage; 