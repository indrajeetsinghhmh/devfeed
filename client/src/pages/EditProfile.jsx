import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: userData?.name || "",
    username: userData?.username || "",
    bio: userData?.bio || "",
    skills: userData?.skills?.join(", ") || "",
    links: userData?.links || [{ platform: "", url: "" }],
    avatar: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...form.links];
    updatedLinks[index][field] = value;
    setForm({ ...form, links: updatedLinks });
  };

  const addLinkField = () => {
    setForm({ ...form, links: [...form.links, { platform: "", url: "" }] });
  };

  const handleAvatarChange = (e) => {
    setForm({ ...form, avatar: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("username", form.username);
    formData.append("bio", form.bio);
    formData.append(
      "skills",
      JSON.stringify(form.skills.split(",").map((s) => s.trim()))
    );
    formData.append("links", JSON.stringify(form.links));
    if (form.avatar) formData.append("avatar", form.avatar);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Profile updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Profile update failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <header className="text-white">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-col items-center text-center gap-2">
          <h1 className="font-bold text-4xl">Edit Your Profile</h1>
          <p className="text-gray-200 mt-2 text-lg">
            Update your information and keep your profile fresh! ✨
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
              />
            </div>

            {/* Basic Inputs */}
            {["name", "username", "bio", "skills"].map((field) => (
              <div key={field} className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>

                {field === "bio" ? (
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Write your bio"
                    rows={3}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline overflow-y-auto"
                  />
                ) : (
                  <input
                    type="text"
                    name={field}
                    value={form[field]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field}`}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required={field !== "bio"}
                  />
                )}
              </div>
            ))}

            {/* Dynamic Links */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Social Links
              </label>
              {form.links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Platform (e.g. GitHub)"
                    value={link.platform}
                    onChange={(e) =>
                      handleLinkChange(index, "platform", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                  <input
                    type="text"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={addLinkField}
                className="text-blue-600 text-sm hover:underline mt-1 cursor-grab"
              >
                + Add More
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition-all cursor-pointer"
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
