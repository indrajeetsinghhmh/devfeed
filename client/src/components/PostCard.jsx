import { useState, useEffect, useRef } from "react";
import axios from "../utils/axios";
import truncate from "lodash/truncate";

const PostCard = ({ post, onPostDeleted }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [postEditContent, setPostEditContent] = useState(post.content || "");
  const [postEditTags, setPostEditTags] = useState(post.tags?.join(",") || "");
  const [showFullContent, setShowFullContent] = useState(false);
  const [showReadMoreBtn, setShowReadMoreBtn] = useState(false);
  const [isContentOverflow, setIsContentOverflow] = useState(false);
  const contentRef = useRef(null);
  const maxLinesToShow = 3;

  useEffect(() => {
    if (!showFullContent && !isEditingPost && contentRef.current) {
      // Use setTimeout to ensure DOM has rendered
      setTimeout(() => {
        setIsContentOverflow(
          contentRef.current.scrollHeight > contentRef.current.offsetHeight + 2
        );
      }, 0);
    }
    // Optional: You may want to always show "Read Less" as long as showFullContent is true (not depending on overflow).
  }, [postEditContent, showFullContent, isEditingPost]);


  // Track edit states per comment by commentId
  const [commentEditStates, setCommentEditStates] = useState({}); // { commentId: { isEditing: bool, text: string } }

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const alreadyLiked = post.likes?.includes(user._id);
    setLiked(alreadyLiked);
    setLikesCount(post.likes?.length || 0);
    setComments(post.comments || []);
  }, [post, user._id]);

  const toggleLike = async () => {
    try {
      const res = await axios.put(
        `/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data && typeof res.data.likes !== "undefined") {
        setLiked(!liked);
        setLikesCount(res.data.likes);
      }
    } catch (err) {
      console.error("Like failed", err);
      // Optionally revert UI change on error if desired
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    const newComment = {
      _id: "temp-id-" + Date.now(), // temp id for UI only until confirmed by server
      text: comment,
      commentedBy: { name: user.name, username: user.username, _id: user._id },
    };

    setComments((prev) => [...prev, newComment]);
    setComment("");
    setShowAllComments(true);

    try {
      const res = await axios.post(
        `/posts/${post._id}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Replace comments with response from server to get real IDs
      if (res.data.comments) {
        setComments(res.data.comments);
      }
    } catch (err) {
      console.error("Comment failed", err);
      setComments((prev) => prev.filter((c) => c._id !== newComment._id));
    }
  };

  function timeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (const [unit, value] of Object.entries(intervals)) {
      const diff = Math.floor(seconds / value);
      if (diff >= 1) {
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
          -diff,
          unit
        );
      }
    }
    return "just now";
  }

  function time() {
    const date = new Date(post.createdAt);
    return <div>{timeAgo(date)}</div>;
  }

  const toggleShowAllComments = () => {
    setShowAllComments((prev) => !prev);
  };

  // --- Post Editing Handlers ---

  const handlePostEditSave = async () => {
    try {
      const updatedData = {
        content: postEditContent,
        // send tags as JSON string
        tags: JSON.stringify(
          postEditTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        ),
      };
      const res = await axios.put(`/posts/${post._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.post) {
        // update post content and tags locally
        setPostEditContent(res.data.post.content);
        setPostEditTags(res.data.post.tags.join(","));
        setIsEditingPost(false);
      }
    } catch (error) {
      console.error("Failed to edit post", error);
      alert("Failed to save edits on post");
    }
  };

  const handlePostDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onPostDeleted) {
        onPostDeleted(post._id); // notify parent to remove post from list
      }
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Failed to delete post.");
    }
  };

  // --- Comment Edit/Delete Handlers ---

  const startEditingComment = (commentId, text) => {
    setCommentEditStates((prev) => ({
      ...prev,
      [commentId]: { isEditing: true, text },
    }));
  };

  const cancelEditingComment = (commentId) => {
    setCommentEditStates((prev) => ({
      ...prev,
      [commentId]: { isEditing: false, text: "" },
    }));
  };

  const handleCommentEditChange = (commentId, newText) => {
    setCommentEditStates((prev) => ({
      ...prev,
      [commentId]: { ...prev[commentId], text: newText },
    }));
  };

  const saveEditedComment = async (commentId) => {
    const editState = commentEditStates[commentId];
    if (!editState || !editState.text.trim()) return;

    try {
      const res = await axios.put(
        `/posts/${post._id}/comment/${commentId}`,
        { text: editState.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update comment text in local state
      setComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, text: editState.text } : c
        )
      );
      setCommentEditStates((prev) => ({
        ...prev,
        [commentId]: { isEditing: false, text: "" },
      }));
    } catch (error) {
      console.error("Failed to edit comment", error);
      alert("Failed to save edits on comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await axios.delete(`/posts/${post._id}/comment/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      // Remove any edit state
      setCommentEditStates((prev) => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
    } catch (error) {
      console.error("Failed to delete comment", error);
      alert("Failed to delete comment");
    }
  };

  

  // Approximate character count per 3 lines. You can tweak this based on your font and layout.
  const maxCharsToShow = 180;

  const shouldTruncate = postEditContent.length > maxCharsToShow;

  const truncatedContent = truncate(postEditContent, {
    length: maxCharsToShow,
    separator: /[\s,.!?;]|\n/, // break on word boundaries or punctuation
  });


  return (
    <div className="bg-[#ececec] text-[#142d4c] p-4 rounded shadow w-[85vw] sm:w-3/4 md:w-full lg:w-3/4 mx-auto flex flex-col gap-2">
      {/* User Info */}
      <div className="flex items-center gap-3 relative">
        {post.createdBy?.avatar ? (
          <img
            src={post.createdBy.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full object-cover bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white text-4xl font-bold"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center text-white text-4xl font-bold">
            {post.createdBy?.name?.charAt(0) || "U"}
          </div>
        )}
        <div className="flex flex-col gap-0 p-0 m-0">
          <span className="font-semibold absolute left-11 -top-1 ">
            @{post.createdBy?.username || "Unknown"}
          </span>
          <span className="text-xs w-full absolute top-4 left-12">
            {time()}
          </span>
        </div>

        {/* Post Edit/Delete Buttons - only for post owner */}
        {post.createdBy?._id === user._id && (
          <div className="absolute right-2 top-0 flex gap-2">
            {!isEditingPost && (
              <>
                <button
                  onClick={() => setIsEditingPost(true)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/exymduqj.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#3080e8,secondary:#1b1091"
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  ></lord-icon>
                </button>
                <button
                  onClick={handlePostDelete}
                  className="text-red-600 hover:underline text-sm"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/jzinekkv.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#c74b16,secondary:#911710"
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  ></lord-icon>
                </button>
              </>
            )}
            {isEditingPost && (
              <>
                <button
                  onClick={handlePostEditSave}
                  className="text-green-600 text-sm"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/hmzvkifi.json"
                    trigger="hover"
                    stroke="bold"
                    state="hover-pinch"
                    colors="primary:#e86830"
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  ></lord-icon>
                </button>
                <button
                  onClick={() => {
                    setIsEditingPost(false);
                    setPostEditContent(post.content || "");
                    setPostEditTags(post.tags?.join(",") || "");
                  }}
                  className="text-gray-600 hover:underline text-sm"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/ebyacdql.json"
                    trigger="hover"
                    state="hover-cross-2"
                    colors="primary:#848484"
                    style={{ width: "25px", height: "25px", cursor: "pointer" }}
                  ></lord-icon>
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-[97%] mx-auto rounded-md object-cover"
        />
      )}
      {/* Content — if editing show textarea, else show text */}
      {!isEditingPost ? (
        <div className="text-[#142d4c] text-md whitespace-pre-wrap break-words">
          {!showFullContent && shouldTruncate ? (
            <>
              {truncatedContent}
              <span
                onClick={() => setShowFullContent(true)}
                className="text-gray-500 cursor-pointer hover:underline ml-1"
              >
                Read More
              </span>
            </>
          ) : (
            <>
              {postEditContent}
              {shouldTruncate && (
                <span
                  onClick={() => setShowFullContent(false)}
                  className="text-gray-500 cursor-pointer hover:underline ml-1"
                >
                  Read Less
                </span>
              )}
            </>
          )}
        </div>
      ) : (
        <textarea
          rows={4}
          className="w-full p-2 border rounded"
          value={postEditContent}
          onChange={(e) => setPostEditContent(e.target.value)}
        />
      )}

      {/* Tags - editable only in edit mode */}
      {!isEditingPost ? (
        postEditTags && (
          <div className="flex flex-wrap gap-2">
            {postEditTags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
              .map((tag, i) => (
                <span
                  key={i}
                  className="text-sm bg-blue-200 px-2 py-1 rounded-2xl shadow-2xl shadow-amber-700"
                >
                  {tag}
                </span>
              ))}
          </div>
        )
      ) : (
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={postEditTags}
          onChange={(e) => setPostEditTags(e.target.value)}
          placeholder="Edit tags (comma-separated)"
        />
      )}
      {/* Like & Comment Actions */}
      <div className="flex items-center justify-start gap-6 mt-4">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLike}
            className={"cursor-pointer h-[20px] w-[20px]"}
          >
            {liked ? (
              "❤️"
            ) : (
              <lord-icon
                src="https://cdn.lordicon.com/nvsfzbop.json"
                trigger="hover"
                state="hover-heartbeat-alt"
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              ></lord-icon>
            )}
          </button>
          <span className="text-sm text-gray-500">
            {likesCount} Like{likesCount !== 1 && "s"}
          </span>
        </div>
        <button
          onClick={() => setShowCommentInput((prev) => !prev)}
          className="text-sm text-gray-500 flex gap-2 items-center cursor-pointer"
        >
          <lord-icon
            src="https://cdn.lordicon.com/motnbmtz.json"
            trigger="hover"
            style={{ width: "25px", height: "25px", cursor: "pointer" }}
          ></lord-icon>
          {comments.length} Comment{comments.length !== 1 && "s"}
        </button>
      </div>
      {/* Comment List */}
      {showCommentInput && (
        <div className="mt-3 space-y-1 text-sm w-full mx-auto">
          {showAllComments && comments.length > 0
            ? comments.map((c) => {
                const isOwner = c.commentedBy?._id === user._id;
                const editState = commentEditStates[c._id] || {
                  isEditing: false,
                  text: "",
                };
                return (
                  <div key={c._id} className="bg-gray-300 p-2 relative rounded">
                    <strong>@{c.commentedBy?.username || "User"}: </strong>
                    {!editState.isEditing ? (
                      <span className="whitespace-pre-wrap">{c.text}</span>
                    ) : (
                      <textarea
                        className="w-full p-1 border rounded mt-1"
                        rows={3}
                        value={editState.text}
                        onChange={(e) =>
                          handleCommentEditChange(c._id, e.target.value)
                        }
                      />
                    )}
                    {/* Edit/Delete buttons for comment owner */}
                    {isOwner && !editState.isEditing && (
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button
                          onClick={() => startEditingComment(c._id, c.text)}
                          className="text-blue-600 hover:underline text-xs cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-red-600 hover:underline text-xs cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {/* Save/Cancel buttons when editing */}
                    {isOwner && editState.isEditing && (
                      <div className="mt-1 flex gap-2">
                        <button
                          onClick={() => saveEditedComment(c._id)}
                          className="text-green-600 hover:underline text-xs cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => cancelEditingComment(c._id)}
                          className="text-gray-600 hover:underline text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            : comments.length > 0 &&
              comments.slice(0, 3).map((c) => {
                const isOwner = c.commentedBy?._id === user._id;
                const editState = commentEditStates[c._id] || {
                  isEditing: false,
                  text: "",
                };
                return (
                  <div key={c._id} className="bg-gray-300 p-2 relative rounded">
                    <strong>@{c.commentedBy?.username || "User"}:</strong>{" "}
                    {!editState.isEditing ? (
                      <span className="whitespace-pre-wrap">{c.text}</span>
                    ) : (
                      <textarea
                        className="w-full p-1 border rounded mt-1"
                        rows={3}
                        value={editState.text}
                        onChange={(e) =>
                          handleCommentEditChange(c._id, e.target.value)
                        }
                      />
                    )}
                    {isOwner && !editState.isEditing && (
                      <div className="absolute top-1 right-1 flex gap-1">
                        <button
                          onClick={() => startEditingComment(c._id, c.text)}
                          className="text-blue-600 hover:underline text-xs cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(c._id)}
                          className="text-red-600 hover:underline text-xs cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                    {isOwner && editState.isEditing && (
                      <div className="mt-1 flex gap-2">
                        <button
                          onClick={() => saveEditedComment(c._id)}
                          className="text-green-600 hover:underline text-xs cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => cancelEditingComment(c._id)}
                          className="text-gray-600 hover:underline text-xs cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
        </div>
      )}
      {/* Show More / Show Less Button */}
      {showCommentInput && comments.length > 3 && (
        <button
          onClick={toggleShowAllComments}
          className="mt-0 text-blue-600 cursor-pointer underline"
        >
          {showAllComments ? "Show Less" : "Show More"}
        </button>
      )}
      {/* Comment Input */}
      {showCommentInput && (
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border px-3 py-1 rounded w-[45vw] sm:w-[25vw]"
          />
          <button
            onClick={handleComment}
            className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer overflow-hidden"
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
