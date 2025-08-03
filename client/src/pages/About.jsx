import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />
      {/* Hero Section */}
      <header className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center text-center mt-8 mb-8 gap-2">
          <h1 className="font-bold text-4xl">About DevFeed</h1>
          <p className="text-gray-200 mt-2 text-lg">
            A platform where developers connect, share, and grow together! 🚀
          </p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="py-12 flex flex-col md:flex-row gap-4 justify-around items-center">
        <div className="max-w-6xl mx-auto px-4 text-center mb-4">
          <h2 className="text-2xl font-semibold mb-6">Our Mission</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            At DevFeed, our mission is to create a vibrant community where
            developers can share their knowledge, showcase their projects, and
            connect with others. We believe in the power of collaboration and
            learning from one another.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            className="mx-auto md:mx-5 shadow-xl border-2 rounded w-3/4"
            src="/mission.png"
            alt="Our Mission"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 mt-5">
        <div className="max-w-6xl mx-auto px-4 mt-7">
          <h2 className="text-2xl font-semibold text-center mb-20 text-blue-800">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Community Driven"
              desc="Join a community of developers who are eager to share and learn."
              icon="🌍"
            />
            <FeatureCard
              title="Showcase Projects"
              desc="Display your projects and get feedback from peers."
              icon="📂"
            />
            <FeatureCard
              title="Networking Opportunities"
              desc="Connect with other developers and expand your professional network."
              icon="🤝"
            />
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="bg-gray-100 py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-700 mb-4">
            Ready to join the DevFeed community?
          </p>
          <Link
            to="/signup"
            className="inline-block bg-[#4A154B] mt-4 mb-4 font-bold text-white px-8 py-3 rounded hover:bg-[#0A0C4C] transition"
          >
            Get Started
          </Link>
        </div>
      </footer>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ title, desc, icon }) => (
  <div className="p-6 bg-[#0A0C4C] rounded-lg shadow text-center">
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-200 text-sm">{desc}</p>
  </div>
);

export default About;
