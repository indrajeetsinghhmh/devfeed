import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between pt-[9vh">
      <Navbar />
      {/* Hero Section */}
      <header className=" text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center text-center mt-8 mb-8 gap-2">
          <div className="flex gap-2">
            <h1 className="font-semibold text-3xl md:text-5xl">Where</h1>
            <h1 className="font-bold text-3xl md:text-5xl text-[#F5F3B3]">
              dev
            </h1>
            <h1 className="font-semibold text-3xl md:text-5xl">connects</h1>
          </div>
          <p className="text-gray-200 mt-2 text-lg">
            Meet, Share, and Grow Together 🚀
          </p>
          <div className="mt-4 space-x-4">
            <Link
              to="/signup"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Join Now
            </Link>
            <Link
              to="/login"
              className="bg-white border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </header>

      {/* Why Use Section */}
      <section className="py-12 flex flex-col md:flex-row gap-4 justify-around items-center shadow-2xl">
        <div className="max-w-6xl mx-auto px-4 text-center mb-4">
          <h2 className="text-2xl font-semibold mb-6">Why Use DevFeed?</h2>
          <p className="text-gray-200 max-w-2xl mx-auto">
            DevFeed is a community-driven platform for developers to post
            updates, showcase projects, share ideas, and connect with
            like-minded coders. Whether you're just starting or are a seasoned
            pro — this is your space.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            className="mx-auto md:mx-5 shadow-xl border-2 rounded transform rotate-5 w-3/4"
            src="/side2.png"
            alt=""
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100 mt-5">
        <div className="max-w-6xl mx-auto px-4 mt-7">
          <h2 className="text-2xl font-semibold text-center mb-20 text-blue-800">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <FeatureCard
              title="Post & Share"
              desc="Share your thoughts, projects, or tips with the dev community."
              icon="💬"
            />
            <FeatureCard
              title="Drag & Drop Upload"
              desc="Upload images, screenshots, or designs instantly."
              icon="🖼️"
            />
            <FeatureCard
              title="Connect with Others"
              desc="Follow, explore, and grow your network of developers."
              icon="🤝"
            />
          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <footer className="bg-gray-100 py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-700 mb-4">
            Ready to build your dev presence?
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

export default Home;
