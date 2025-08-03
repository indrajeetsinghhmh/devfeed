import React, { useState } from "react";
import axios from "axios";
import API from "../api";
import { useNavigate } from "react-router-dom";

const PostForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
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
    const postData = new FormData();
    postData.append("title", formData.title);
    postData.append("content", formData.content);
    postData.append("tags", JSON.stringify(formData.tags.split(",")));
    if (image) postData.append("image", image);

    try {
      await API.post("/posts/create", postData);
      alert("Post created!");
      setFormData({ title: "", content: "", tags: "" });
      setImage(null);
      setPreview(null);
      navigate("/posts")
    } catch (error) {
      alert("Error creating post");
      console.error(error);
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
      />
      <input
        type="text"
        name="tags"
        placeholder="Tags (comma-separated)"
        value={formData.tags}
        onChange={handleChange}
        className="w-full p-2 border rounded"
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
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Post
      </button>
    </form>
  );
};

export default PostForm;
