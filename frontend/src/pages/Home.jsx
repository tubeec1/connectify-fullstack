import React, { useContext, useEffect, useState, useRef } from "react";
import PostCard from "../components/PostCard";
import { SysContext } from "../layouts/layout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  let { state, dispatch } = useContext(SysContext);
  let fileRef = useRef();
  let navigate = useNavigate();
  let [post, setPost] = useState({
    content: "",
    files: null,
  });

  async function getFetchApi() {
    let res = await fetch(
      "http://localhost/Fullstack-Layered-Social-API/backend/public/api/posts",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    let data = await res.json();

    let posts = Object.values(data.posts).reverse();
    if (data.status) {
      dispatch({ type: "SET_POSTS", payload: { posts: posts } });
    }
  }

  let hadleSubmit = (e) => {
    e.preventDefault();
    let content = post.content;
    let files = post.files;
    if (!content || !files) {
      alert("all fields are required");
      return;
    }

    let formData = new FormData();
    formData.append("content", content);
    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }
    fetchApi(formData);

    async function fetchApi(formData) {
      let token = localStorage.getItem("token");

      let res = await fetch(
        "http://localhost/Fullstack-Layered-Social-API/backend/public/api/posts/create",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );
      let data = await res.json();
      if (data.status) {
        alert(data.message);
        setPost({ ...post, content: "", files: (fileRef.target.value = 0) });
        getFetchApi();
      } else {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  useEffect(() => {
    getFetchApi();
  }, [dispatch]);
  return (
    <div className="pt-20 bg-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* LEFT SIDE - CREATE POST */}
        <div className="w-1/3">
          <div className="bg-white shadow-xl rounded-2xl p-6 sticky top-24">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Create Post
            </h1>

            <form onSubmit={hadleSubmit} className="space-y-4">
              <textarea
                value={post.content}
                placeholder="What's on your mind?"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="3"
                onChange={(e) => setPost({ ...post, content: e.target.value })}
              ></textarea>

              <input
                type="file"
                className="w-full border border-gray-300 rounded-xl p-2 cursor-pointer
                file:bg-blue-500 file:text-white file:border-none file:px-4 file:py-2
                file:rounded-lg file:mr-4 hover:file:bg-blue-600"
                onChange={(e) => setPost({ ...post, files: e.target.files })}
                multiple
                key={fileRef}
              />

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200"
              >
                Create Post
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE - POSTS */}
        <div className="w-2/3 space-y-6">
          {/* Posts will appear here */}
          {/* {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))} */}

          <div className="bg-white rounded-xl shadow p-6">
            <h1 className="text-xl font-semibold">Posts will appear here</h1>
            <div className="space-y-6">
              {state.posts &&
                state.posts.map((post) => {
                  return (
                    <div
                      key={post.id}
                      className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
                    >
                      {/* USER HEADER */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={`http://localhost/Fullstack-Layered-Social-API/backend/public/${post.userProfileImage}`}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover border"
                          />

                          <div>
                            <h2 className="font-semibold text-gray-800">
                              {post.userName}
                            </h2>
                            <p className="text-sm text-gray-500">
                              {post.created_at}
                            </p>
                          </div>
                        </div>

                        {/* DELETE BUTTON */}

                        {state.user.id == post.userId && (
                          <button
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `are you sure to deleted post ${post.id}`,
                                )
                              ) {
                                fetchApi();
                              }
                              async function fetchApi() {
                                let token = localStorage.getItem("token");
                                let res = await fetch(
                                  `http://localhost/Fullstack-Layered-Social-API/backend/public/api/posts/delete/${post.id}`,
                                  {
                                    method: "DELETE",

                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                      "Content-Type": "application/json",
                                    },
                                  },
                                );
                                let data = await res.json();
                                if (data.status) {
                                  alert(data.message);
                                  getFetchApi();
                                } else {
                                  alert(data.message);
                                }
                              }
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>

                      {/* POST CONTENT */}
                      <p className="text-gray-700 mb-4">{post.content}</p>

                      {/* POST IMAGES */}
                      <div className="grid grid-cols-2 gap-3">
                        {post.media.map((img, index) => {
                          return (
                            <img
                              key={index}
                              src={`http://localhost/Fullstack-Layered-Social-API/backend/public/${img.file_path}`}
                              alt=""
                              className="rounded-lg w-full object-cover hover:scale-105 transition"
                            />
                          );
                        })}
                      </div>
                      <form className="space-y-4 mt-5">
                        <textarea
                          placeholder="What's on your mind?"
                          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                          rows="3"
                        ></textarea>

                        <button
                          type="submit"
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-xl transition duration-200"
                        >
                          Create Comment
                        </button>
                      </form>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
