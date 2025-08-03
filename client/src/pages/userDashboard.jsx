import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

const userDashboard = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    username: "johndev",
    email: "john@example.com",
    bio: "Passionate full-stack developer. I love building web apps and mentoring new devs.",
    skills: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    links: {
      github: "https://github.com/johndev",
      portfolio: "https://johndoe.dev",
      linkedin: "https://linkedin.com/in/johndev",
    },
  });

  // Optional: Load from backend or localStorage
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await API.get("/user/me"); // Replace with your API
  //     setUser(res.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f7f7fb] text-[#0A0C4C]">
      <Navbar2 />

      <main className="flex-grow px-6 py-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#0A0C4C]">
          Welcome back, {user.name} 👋
        </h2>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Name</h3>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Username</h3>
              <p className="text-gray-900">@{user.username}</p>
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
                <li>
                  <a
                    href={user.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href={user.links.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Portfolio
                  </a>
                </li>
                <li>
                  <a
                    href={user.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default userDashboard;
