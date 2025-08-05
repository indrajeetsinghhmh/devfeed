import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PostForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // loader state

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append(
      "tags",
      JSON.stringify(formData.tags.split(",").map((t) => t.trim()))
    );
    if (image) postData.append("image", image);

    try {
      await API.post("/posts/create", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type" is automatically set to multipart/form-data with FormData
        },
      });
      toast.success("Post created!");
      setFormData({ title: "", content: "", tags: "" });
      setImage(null);
      setPreview(null);
      navigate("/posts");
    } catch (error) {
      toast.error("Error creating post");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#ececec] text-[#142d4c] p-4 rounded shadow w-full sm:w-3/4 mx-auto space-y-4"
    >
      <textarea
        name="content"
        placeholder="What's on your mind?"
        value={formData.content}
        onChange={handleChange}
        rows={4}
        className="w-full p-2 border rounded"
        required
        disabled={loading}
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        disabled={loading}
      />
      <label
        htmlFor="imageInput"
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-full h-32 border-2 border-dashed rounded flex items-center justify-center text-gray-500 cursor-pointer"
      >
        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span>Drag & drop image here or click to select</span>
        )}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
        id="imageInput"
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex justify-center items-center ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
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
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default PostForm;
