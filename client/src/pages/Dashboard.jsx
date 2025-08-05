import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import axios from "../utils/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));

    if (!token || !userData) {
      navigate("/login"); // not logged in
    } else {
      setUser(userData); // show user info
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const edit = () => {
    navigate("/edit");
  };

  const confirmDelete = () => {
    setConfirm(true);
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete("/user", {
        data: { password },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        localStorage.clear();
        navigate("/login");
      } else {
        alert(response.data.message || "Failed to delete account.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#f7f7fb] text-[#0A0C4C]">
      <Navbar2 />

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#0A0C4C]">
          Welcome back, {user.name} 👋
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* LEFT SIDE: Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-20 h-20 rounded-full object-cover bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white text-4xl font-bold"
                />
              ) : (
                <div className="w-20 h-20 rounded-full object-cover bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white text-4xl font-bold">
                  {user.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <p className="text-gray-900">{user.email}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Bio</h3>
              <p className="text-gray-800">{user.bio}</p>
            </div>
          </div>

          {/* RIGHT SIDE: Skills, Links, Actions */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Skills</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Links</h3>
              <ul className="mt-2 space-y-2">
                {user.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {link.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-row-reverse gap-4">
              <button
                onClick={logout}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
              >
                Logout
              </button>

              <button
                onClick={edit}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-900"
              >
                Edit Profile
              </button>

              <button
                onClick={() => confirmDelete()}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-900"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
        {confirm === true ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              deleteUser();
            }}
          >
            <p className="text-red-600 font-semibold my-4">
              Warning: If you continue, all your data—including your posts and
              related information—will be permanently deleted. This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <input
                type="text"
                name="username"
                value={user.username}
                readOnly
                hidden
                autoComplete="username"
              />
              <input
                type="password"
                placeholder="Enter your password to confirm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-0 p-2 border rounded w-1/4"
                autoComplete="current-password"
              />
              <button
                type="submit"
                className="mt-0 bg-red-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-red-900"
              >
                Delete permanently
              </button>
            </div>
          </form>
        ) : null}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
