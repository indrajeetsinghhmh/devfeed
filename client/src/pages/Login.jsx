import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login successful!");
      setForm({ email: "", password: "" });
      // redirect user
      navigate("/posts");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col items-center text-center gap-2">
          <h1 className="font-bold text-4xl">Welcome Back!</h1>
          <p className="text-gray-200 mt-2 text-lg">
            Log in to continue connecting with other developers! 🚀
          </p>
        </div>
      </header>
      <section className="py-2 flex flex-col items-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
              required
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded mt-6 cursor-pointer transition ease-in-out hover:bg-blue-800"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
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

export default Login;
