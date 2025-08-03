import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Navbar2 from "../components/Navbar2";
import AddPost from "../components/addPost";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const res = await API.get("/mine"); // ✅ fixed path
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch your posts", err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  // Callback for deleting post from state
  const handlePostDeleted = (deletedPostId) => {
    setPosts((prev) => prev.filter((post) => post._id !== deletedPostId));
  };

  return (
    <div className="min-h-screen p-4">
      <Navbar2 />
      <div className="w-full md:w-1/2 mx-auto space-y-3 md:space-y-6 p-6 px-0 md:px-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't posted anything yet.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onPostDeleted={handlePostDeleted}
            />
          ))
        )}
      </div>
      <AddPost />
    </div>
  );
};

export default MyPosts;
