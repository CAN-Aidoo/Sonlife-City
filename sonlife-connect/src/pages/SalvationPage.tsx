import { useEffect } from "react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const SalvationPage = () => {
  useEffect(() => {
    document.title = "Salvation - Sonlife City Church HQ";
  }, []);

  return (
    <PageLayout>
      <div className="bg-gradient-to-r from-sonlife-blue to-blue-700 py-24 mt-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Salvation</h1>
            <p className="text-xl text-white/90">Discover God's plan for your life and how to begin your journey with Christ.</p>
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif font-bold mb-6 text-sonlife-blue">The Message of Salvation</h2>
              <p>
                God loves you and has a wonderful plan for your life. No matter who you are or what you've done, 
                God desires a relationship with you. The Bible tells us that "God so loved the world that he gave his 
                one and only Son, that whoever believes in him shall not perish but have eternal life" (John 3:16).
              </p>
              <p>
                But there's a problem. The Bible also tells us that "all have sinned and fall short of the glory of God" 
                (Romans 3:23). Our sin separates us from God and prevents us from experiencing the relationship with Him 
                that we were created for.
              </p>
              <p>
                The good news is that God provided a solution. Jesus Christ, God's Son, died on the cross to pay the 
                penalty for our sins. His death and resurrection made it possible for us to be forgiven and reconciled to God.
              </p>
              <p>
                To receive this gift of salvation, we need to:
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-sonlife-blue">Recognize</h3>
                <p className="text-gray-700 mb-4">
                  Acknowledge that you are a sinner in need of God's forgiveness.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="italic text-gray-700">
                    "For all have sinned and fall short of the glory of God." - Romans 3:23
                  </p>
                </div>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-sonlife-blue">Believe</h3>
                <p className="text-gray-700 mb-4">
                  Trust that Jesus died for your sins and rose again to give you new life.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="italic text-gray-700">
                    "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." - John 3:16
                  </p>
                </div>
              </div>
              <div className="glass p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3 text-sonlife-blue">Receive</h3>
                <p className="text-gray-700 mb-4">
                  Accept Jesus as your Savior and Lord, committing your life to follow Him.
                </p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="italic text-gray-700">
                    "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved." - Romans 10:9
                  </p>
                </div>
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-serif font-bold mb-6 text-sonlife-blue">A Prayer for Salvation</h2>
              <p>
                If you're ready to begin your journey with Christ, you can pray a simple prayer like this:
              </p>
              <div className="bg-gray-100 p-6 rounded-lg my-6">
                <p className="italic">
                  "Dear God, I acknowledge that I am a sinner in need of your forgiveness. I believe that Jesus died on 
                  the cross for my sins and rose again. Today, I receive Jesus as my Savior and Lord. Thank you for 
                  forgiving my sins and giving me eternal life. Help me to live for you from this day forward. Amen."
                </p>
              </div>
              <p>
                If you prayed this prayer sincerely, the Bible assures you that you are now a child of God, forgiven 
                and made new. "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new 
                is here!" (2 Corinthians 5:17).
              </p>
            </div>
            <div className="mt-12 glass p-8 rounded-xl text-center">
              <h2 className="text-2xl font-bold mb-4">What's Next?</h2>
              <p className="text-gray-700 mb-6">
                If you've made a decision to follow Christ, or if you have questions about salvation, 
                we'd love to connect with you and help you take your next steps.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button className="bg-sonlife-blue hover:bg-sonlife-blue/90 text-white flex items-center gap-2">
                  Talk to a Pastor <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-sonlife-blue text-sonlife-blue hover:bg-sonlife-blue/10">
                  Join a Newcomers' Group
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default SalvationPage;
