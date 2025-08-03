import React, { useEffect, useState } from "react";
import API from "../api";

const Feeds = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="p-4 border rounded bg-white shadow-md space-y-2"
        >
          {post.image && (
            <img
              src={`http://localhost:5000${post.image}`}
              alt="post"
              className="w-full rounded"
            />
          )}
          {post.title && (
            <h2 className="text-lg font-semibold">{post.title}</h2>
          )}
          {post.content && <p className="text-gray-700">{post.content}</p>}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feeds;
