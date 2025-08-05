import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    skills: "",
  });

  const [links, setLinks] = useState([{ platform: "", url: "" }]);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const addMoreLinks = () => {
    setLinks([...links, { platform: "", url: "" }]);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("bio", form.bio);

    formData.append(
      "skills",
      JSON.stringify(form.skills.split(",").map((s) => s.trim()))
    );
    formData.append("links", JSON.stringify(links));
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = await axios.post("/auth/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Signup successful!");
      navigate("/posts");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col items-center text-center gap-2">
          <h1 className="font-bold text-4xl">Create Your Account</h1>
          <p className="text-gray-200 mt-2 text-lg">
            Join our community and start connecting with other developers! 🚀
          </p>
        </div>
      </header>

      <section className="py-2 flex flex-col items-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8 py-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
            {/* Avatar Upload */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                disabled={loading}
              />
            </div>

            {/* Basic Inputs */}
            {["name", "username", "email", "password"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={`${field} is required`}
                  autoComplete="current-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                  disabled={loading}
                />
              </div>
            ))}
            {["bio", "skills"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  disabled={loading}
                />
              </div>
            ))}

            {/* Dynamic Links */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Social Links
              </label>
              {links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Platform (e.g. GitHub)"
                    value={link.platform}
                    onChange={(e) =>
                      handleLinkChange(index, "platform", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    disabled={loading}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addMoreLinks}
                className="text-blue-600 text-sm hover:underline mt-1 cursor-grab"
                disabled={loading}
              >
                + Add More
              </button>
            </div>

            <button
              type="submit"
              className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition-all cursor-pointer flex justify-center items-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
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
              ) : null}
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </section>

      <footer className="bg-gray-100 py-8 border-t">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-700 mb-4">Ready to join the community?</p>
          <Link
            to="/"
            className="inline-block bg-[#4A154B] mt-4 mb-4 font-bold text-white px-8 py-3 rounded hover:bg-[#0A0C4C] transition ease-in"
          >
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Signup;
