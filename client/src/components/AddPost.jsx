import React from "react";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/create")}
      className="outline-1 rounded-full bg-purple-950 cursor-pointer fixed right-5 sm:right-10 bottom-5 px-1 pt-1"
      aria-label="Add post"
    >
      <lord-icon
        src="https://cdn.lordicon.com/qwghbson.json"
        trigger="hover"
        colors="primary:#c71f16,secondary:#ffffff"
        style={{ width: "30px", height: "30px" }}
      />
    </button>
  );
};

export default AddPost;
