import React from "react";
import { FaThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-3">
          <img
            src={post.user.profileImage}
            alt="profile"
            className="w-11 h-11 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {post.user.name}
            </h3>
            <p className="text-xs text-gray-500">{post.createdAt}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 pt-3 pb-2">
        <p className="text-gray-800 text-sm leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mt-2">
          <img
            src={post.image}
            alt="post"
            className="w-full object-cover max-h-[520px]"
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex justify-between items-center px-5 py-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="bg-blue-600 text-white p-1 rounded-full">
            <FaThumbsUp className="text-[10px]" />
          </div>
          <span>{post.likes}</span>
        </div>

        <div className="flex gap-3">
          <span>{post.comments.length} Comments</span>
          <span>{post.shares || 0} Shares</span>
        </div>
      </div>

      <div className="border-t border-gray-200"></div>

      {/* Action Buttons */}
      <div className="flex text-gray-600 text-sm font-medium">
        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 transition rounded-lg">
          <FaThumbsUp />
          Like
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 transition rounded-lg">
          <FaRegCommentDots />
          Comment
        </button>

        <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-gray-100 transition rounded-lg">
          <FaShare />
          Share
        </button>
      </div>

      <div className="border-t border-gray-200 mt-1"></div>

      {/* Comments */}
      <div className="px-5 py-4 space-y-4">
        {post.comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <img
              src={comment.user.profileImage}
              alt="comment user"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="bg-gray-100 px-4 py-2 rounded-2xl">
                <p className="text-xs font-semibold text-gray-900">
                  {comment.user.name}
                </p>
                <p className="text-sm text-gray-800">{comment.text}</p>
              </div>

              <div className="flex gap-4 text-xs text-gray-500 mt-1 pl-2">
                <span className="cursor-pointer hover:underline">Like</span>
                <span className="cursor-pointer hover:underline">Reply</span>
                <span>1h</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input (Design Only) */}
      <div className="border-t border-gray-200 px-5 py-3 flex items-center gap-3">
        <img
          src={post.user.profileImage}
          alt="current user"
          className="w-9 h-9 rounded-full object-cover"
        />
        <input
          type="text"
          placeholder="Write a comment..."
          className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-sm focus:outline-none"
        />
      </div>
    </div>
  );
};

export default PostCard;
