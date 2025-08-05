import React from "react";
import PostForm from "../components/PostForm";
import Navbar2 from "../components/Navbar2";

const Create = () => {
  return (
    <div className=" min-h-screen p-4">
      <Navbar2 />
      <div className="w-full sm:w-1/2 mx-auto space-y-6 p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 mx-auto">Create a Post</h2>
        <PostForm />
      </div>
    </div>
  );
};

export default Create;
