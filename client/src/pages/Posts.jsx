import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Navbar2 from "../components/Navbar2";
import AddPost from "../components/addPost";

const Posts = () => {
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

  // Callback for deleting post from state
  const handlePostDeleted = (deletedPostId) => {
    setPosts((prev) => prev.filter((post) => post._id !== deletedPostId));
  };

  return (
    <div className=" min-h-screen p-4">
      <Navbar2 />
      <div
        className="w-full md:w-1/2 mx-auto space-y-3 md:space-y-6 p-6 px-0 md:px-6"
        style={{ minWidth: "300px" }}
      >
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            onPostDeleted={handlePostDeleted}
          />
        ))}
      </div>
      <AddPost />
    </div>
  );
};

export default Posts;
