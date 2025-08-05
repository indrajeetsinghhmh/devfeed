import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";
import Navbar2 from "../components/Navbar2";
import AddPost from "../components/AddPost";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // <-- Add loading state
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchMyPosts = async () => {
    setIsLoading(true); // start loading before request
    try {
      const res = await API.get("/mine");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch your posts", err);
    } finally {
      setIsLoading(false); // stop loading after request finishes
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handlePostDeleted = (deletedPostId) => {
    setPosts((prev) => prev.filter((post) => post._id !== deletedPostId));
  };

  return (
    <div className="min-h-screen p-4">
      <Navbar2 />
      <div className="w-full md:w-1/2 mx-auto space-y-3 md:space-y-6 p-6 px-0 md:px-6">
        {isLoading ? (
          // Show loader while fetching posts
          <p className="text-center text-gray-500">Loading posts...</p>
        ) : posts.length === 0 ? (
          // Show message only if not loading and no posts
          <p className="text-center text-gray-500">
            You haven't posted anything yet.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onPostDeleted={handlePostDeleted}
              currentTime={currentTime}
            />
          ))
        )}
      </div>
      <AddPost />
    </div>
  );
};

export default MyPosts;
