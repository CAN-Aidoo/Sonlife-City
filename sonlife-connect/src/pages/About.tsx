
import { useEffect } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import PastorSection from "@/components/PastorSection";

const About = () => {
  useEffect(() => {
    document.title = "About - Sonlife City Church HQ";
  }, []);

  return (
    <PageLayout>
      <div className="space-y-16">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-sonlife-blue/10 text-sonlife-blue rounded-full">
            About Us
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-sonlife-blue">
            Welcome to <span className="text-sonlife-gold">Sonlife City</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg">
            A place where faith meets community, and lives are transformed through the power of God's love.
          </p>
        </div>

        {/* Pastor Section with full biography */}
        <PastorSection isCompact={false} />

        {/* More about page content would go here */}
        <div className="bg-white/30 backdrop-blur-sm p-8 rounded-xl">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-sonlife-blue">Our Vision & Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  At Sonlife City Church HQ, our vision is to bring believers to the full Knowledge of Christ 
                  taking the full gospel to every nation, everybody and everytime.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Our mission is to Bringing believers to the full Knowledge of Christ 
                  taking the full gospel to every nation, everybody and everytime.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-sonlife-blue">Our History</h2>
                <p className="text-gray-700 leading-relaxed">
                  Sonlife City Church was founded in 2000 with a small group of believers who shared a passion for authentic 
                  worship and community impact led by Pastor Francis Adjapong. Over the years, we have grown into a vibrant congregation with multiple services 
                  and outreach programs that touch lives both locally and globally.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Through the faithful leadership of our pastors and the dedicated service of our members, we have seen 
                  countless lives transformed by the power of God's love. We continue to build on this legacy as we look 
                  to the future with faith and expectation.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 text-sonlife-blue">Our Beliefs</h2>
                <p className="text-gray-700 leading-relaxed">
                  We believe in the authority of Scripture as God's Word, the Trinity of God the Father, Son, and Holy Spirit, 
                  and salvation through faith in Jesus Christ. 
                  We believe in eternal life which is the life of the Son of God, Jesus Christ and core message as a church. 
                  We embrace the gifts of the Holy Spirit and the importance of living out our faith through love and service to others.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-sm p-8 rounded-xl">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-sonlife-blue">Join Us This Sunday</h2>
            <p className="mt-3 text-gray-700">
              We'd love to welcome you to our church family. Come experience the eternal life of Jesus Christ!
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-sonlife-blue">Service Times</h3>
              <p className="text-gray-700">Sunday: 07:00 AM - 10:00 AM</p>
              <p className="text-gray-700">Monday: 17:45 PM - 19:00 PM</p>
              <p className="text-gray-700">Wednesday: 17:45 PM - 19:00 PM</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-sonlife-blue">Location</h3>
              <p className="text-gray-700">SonLife City Church, Holy Grounds Auditorium, opposite Residency off Sunyani Road</p>
              <p className="text-gray-700">Sunyani, Bono Region, Ghana</p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-2 text-sonlife-blue">Contact</h3>
              <p className="text-gray-700">info@sonlifecity.org</p>
              <p className="text-gray-700">+233 54 000 0000</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
