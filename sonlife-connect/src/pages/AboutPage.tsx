import { useEffect } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import PastorSection from "@/components/PastorSection";

const AboutPage = () => {
  useEffect(() => {
    document.title = "About Us - Sonlife City Church HQ";
  }, []);

  return (
    <PageLayout>
      {/* Fixed Background Image with gradient overlay - same as Index page */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(12, 28, 68, 0.6), rgba(22, 78, 142, 0.4)), url('/lovable-uploads/a78d0457-40c8-4f1f-997d-b60af9316471.png')"
        }}
      />
      {/* Floating Elements with improved visibility - same as Index page */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute h-5 w-5 rounded-full bg-sonlife-gold/90 top-1/4 left-1/5 animate-float" />
        <div className="absolute h-8 w-8 rounded-full bg-picton-blue/80 bottom-1/3 right-1/4 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute h-4 w-4 rounded-full bg-morning-blue/90 top-1/2 right-1/5 animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute h-6 w-6 rounded-full bg-sonlife-gold/80 bottom-1/4 left-1/3 animate-float" style={{ animationDelay: '3s' }} />
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-persian-blue/15 text-persian-blue rounded-full shadow-sm">
              About Us
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl font-serif font-bold text-persian-blue">
              Welcome to <span className="text-gradient-gold">Sonlife City</span>
            </h1>
            <p className="mt-5 text-college-blue/90 text-lg font-medium">
              A place where faith meets community, and lives are transformed through the power of God's love.
            </p>
          </div>

          {/* Pastor Section with full biography */}
          <PastorSection isCompact={false} />

          {/* More about page content with improved visual design */}
          <div className="glass p-10 rounded-2xl shadow-md">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-5 text-persian-blue flex items-center">
                    <span className="inline-block w-10 h-1 bg-yellow-banana mr-3 rounded-full"></span>
                    Our Vision & Mission
                  </h2>
                  <p className="text-college-blue/90 leading-relaxed text-lg">
                    At Sonlife City Church HQ, our vision is to bring believers to the full Knowledge of Christ 
                    taking the full gospel to every nation, everybody and everytime.
                  </p>
                  <p className="text-college-blue/90 leading-relaxed text-lg mt-4">
                    Our mission is to Bringing believers to the full Knowledge of Christ 
                    taking the full gospel to every nation, everybody and everytime.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-5 text-persian-blue flex items-center">
                    <span className="inline-block w-10 h-1 bg-yellow-banana mr-3 rounded-full"></span>
                    Our History
                  </h2>
                  <p className="text-college-blue/90 leading-relaxed text-lg">
                    Sonlife City Church was founded in 2000 with a small group of believers who shared a passion for authentic 
                    worship and community impact led by Pastor Francis Adjapong. Over the years, we have grown into a vibrant congregation with multiple services 
                    and outreach programs that touch lives both locally and globally.
                  </p>
                  <p className="text-college-blue/90 leading-relaxed text-lg mt-4">
                    Through the faithful leadership of our pastors and the dedicated service of our members, we have seen 
                    countless lives transformed by the power of God's love. We continue to build on this legacy as we look 
                    to the future with faith and expectation.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold mb-5 text-persian-blue flex items-center">
                    <span className="inline-block w-10 h-1 bg-yellow-banana mr-3 rounded-full"></span>
                    Our Beliefs
                  </h2>
                  <p className="text-college-blue/90 leading-relaxed text-lg">
                    We believe in the authority of Scripture as God's Word, the Trinity of God the Father, Son, and Holy Spirit, 
                    and salvation through faith in Jesus Christ. 
                    We believe in eternal life which is the life of the Son of God, Jesus Christ and core message as a church. 
                    We embrace the gifts of the Holy Spirit and the importance of living out our faith through love and service to others.
                  </p>
                  <p className="text-college-blue/90 leading-relaxed text-lg mt-4">
                    Our worship is vibrant and expressive, reflecting our joy in Christ and our desire to honor Him. We value 
                    both spiritual depth and practical application of biblical principles in everyday life.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-accent p-10 rounded-2xl shadow-md">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-college-blue">
                Join Us This <span className="text-yellow-banana">Sunday</span>
              </h2>
              <p className="mt-4 text-college-blue/90 text-lg">
                We'd love to welcome you to our church family. Come experience the eternal life of Jesus Christ!
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-morning-blue/90 backdrop-blur-sm p-8 rounded-xl shadow-md border border-middle-blue/40 transition-transform duration-300 hover:transform hover:scale-105">
                <h3 className="text-xl font-bold mb-3 text-persian-blue">Service Times</h3>
                <p className="text-college-blue/90">Sunday: 07:00 AM - 10:00 AM</p>
                <p className="text-college-blue/90 mt-2">Monday: 17:45 PM - 19:00 PM</p>
                <p className="text-college-blue/90 mt-2">Wednesday: 17:45 PM - 19:00 PM</p>
              </div>
              
              <div className="bg-morning-blue/90 backdrop-blur-sm p-8 rounded-xl shadow-md border border-middle-blue/40 transition-transform duration-300 hover:transform hover:scale-105">
                <h3 className="text-xl font-bold mb-3 text-persian-blue">Location</h3>
                <p className="text-college-blue/90">SonLife City Church, Holy Grounds Auditorium, opposite Residency off Sunyani Road</p>
                <p className="text-college-blue/90 mt-2">Sunyani, Bono Region, Ghana</p>
              </div>
              
              <div className="bg-morning-blue/90 backdrop-blur-sm p-8 rounded-xl shadow-md border border-middle-blue/40 transition-transform duration-300 hover:transform hover:scale-105">
                <h3 className="text-xl font-bold mb-3 text-persian-blue">Contact</h3>
                <p className="text-college-blue/90">info@sonlifecity.org</p>
                <p className="text-college-blue/90 mt-2">+233 54 000 0000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default AboutPage;
