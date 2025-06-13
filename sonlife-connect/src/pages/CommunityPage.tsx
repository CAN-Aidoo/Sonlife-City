import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const pastors = [
  {
    name: "Rev. Dr. Francis Adjapong",
    description:
      "Ambassador Rev. Dr. Francis Adjapong is a pillar of inspiration and leadership in Sunyani, Ghana. Raised in Sunyani and educated at Sunyani Senior High, he was deeply influenced by the rich cultural and spiritual heritage of his hometown, which laid the foundation for his lifelong commitment to faith and education. An accomplished pastor and visionary leader, he founded Sonlife City Church where he serves as a dedicated bond servant, tirelessly nurturing the community with compassion, wisdom, and spiritual guidance.",
    image: require("@/assets/images/x.jpg"),
  },
  {
    name: "Rev. Dr. Pastor Abena Adjapong",
    description:
      "Rev. Dr. Pastor Abena Adjapong is a passionate minister, educator, and co-leader at Sonlife City Church. She is known for her dynamic teaching, compassionate heart, and commitment to empowering women and families in the faith.",
    image: require("@/assets/images/y.jpg"),
  },
  {
    name: "Pastor Yorne",
    description:
      "Pastor Yorne is a dedicated servant of God, leading prayer and intercession ministries at Sonlife City Church. His ministry is marked by fervent prayer, spiritual insight, and a heart for revival.",
    image: require("@/assets/images/z.jpg"),
  },
  {
    name: "Pastor Newman",
    description:
      "Pastor Newman is a vibrant preacher and youth mentor, inspiring the next generation to pursue Christ wholeheartedly. He is known for his engaging sermons and mentorship.",
    image: "https://ui-avatars.com/api/?name=Pastor+Newman&background=E0E7EF&color=1E293B&size=256",
  },
  // Add more pastors as needed
];

const CommunityPage = () => {
  useEffect(() => {
    document.title = "Pastors - Sonlife City Church HQ";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-sonlife-blue to-blue-700 py-24 mt-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Pastors</h1>
              <p className="text-xl text-white/90">
                Meet the dedicated pastors serving Sonlife City Church.
              </p>
            </div>
          </div>
        </div>
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {pastors.map((pastor, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg border border-middle-blue/20 p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-[1.03]"
                >
                  <div className="w-40 h-52 mb-6 rounded-xl overflow-hidden border-4 border-sonlife-blue bg-gray-100 flex items-center justify-center">
                    <img
                      src={typeof pastor.image === 'string' ? pastor.image : pastor.image.default}
                      alt={pastor.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-sonlife-blue mb-2">{pastor.name}</h3>
                  <p className="text-gray-700 text-base mb-4">{pastor.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityPage;
