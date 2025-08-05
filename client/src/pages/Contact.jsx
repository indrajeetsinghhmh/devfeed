import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { toast } from "react-toastify"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const url =
      "https://script.google.com/macros/s/AKfycby_Xg7avfPdmyy5c3SaYXI57v4G4YRnbBHX2gqcbIqBV63q-Yn73xLfkBHg-Gk9s-DJ/exec";

    const formBody = new URLSearchParams({
      Name: formData.name,
      Email: formData.email,
      Subject: formData.subject,
      Message: formData.message,
    }).toString();

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody,
    })
      .then((res) => res.text())
      .then(() => {
        setFormData({ name: "", email: "", subject: "", message: "" }); // clear form inputs
        toast.success("Message sent successfully!");
      })
      .catch((err) => {
        toast.error("Failed to send message. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar />

      {/* Hero Section */}
      <header className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col items-center text-center mt-8 mb-8 gap-2">
          <h1 className="font-bold text-4xl">Contact Us</h1>
          <p className="text-gray-200 mt-2 text-lg">
            Have questions? We're here to help! Reach out anytime 🚀
          </p>
        </div>
      </header>

      {/* Contact Form Section */}
      <section className="py-12 flex flex-col justify-center items-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your message..."
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                disabled={loading}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } flex justify-center items-center`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <ContactInfoCard
            icon="📧"
            title="Email"
            info="support@devfeed.com"
            link="mailto:support@devfeed.com"
          />
          <ContactInfoCard
            icon="📱"
            title="Phone"
            info="+91 (91) 160-71647"
            link="tel:+919116071647"
          />
          <ContactInfoCard
            icon="🏢"
            title="Address"
            info="Chandigarh, India"
            link="https://maps.google.com"
          />
        </div>
      </section>

      {/* Social Links */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-xl font-semibold mb-4">Connect With Us</h2>
          <div className="flex justify-center gap-4">
            <SocialLink
              icon="🐦"
              label="Twitter"
              url="https://twitter.com/devfeed"
            />
            <SocialLink
              icon="💻"
              label="GitHub"
              url="https://github.com/devfeed"
            />
            <SocialLink
              icon="🔗"
              label="LinkedIn"
              url="https://linkedin.com/company/devfeed"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-700 mb-4">Want to return home?</p>
          <Link
            to="/"
            className="inline-block bg-[#4A154B] mt-4 mb-4 font-bold text-white px-8 py-3 rounded hover:bg-[#0A0C4C] transition"
          >
            Back to Home
          </Link>
        </div>
      </footer>

      <Footer />
    </div>
  );
};

// Reusable components
const ContactInfoCard = ({ icon, title, info, link }) => (
  <div className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
    <div className="text-4xl mb-3">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <a
      href={link}
      className="text-blue-600 hover:underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {info}
    </a>
  </div>
);

const SocialLink = ({ icon, label, url }) => (
  <a
    href={url}
    className="text-4xl hover:scale-110 transition"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
  >
    {icon}
  </a>
);

export default Contact;
