import { useState } from "react";
import Editor from "./Editor";
import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "../../baseurl";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/v1/post/${id}`);
        const postInfo = response.data.post;
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
      } catch (error) {
        console.log("Failed to fetch post", error);
      }
    };
    fetchPost();
  }, []);

  const updatePost = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("_id", id);
      if (file?.[0]) {
        data.set("avatar", file?.[0]);
      }

      const response = await axios.put(
        `${baseurl}/api/v1/post/edit/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setRedirect(true);
        alert("Post updated successfully");
      }
    } catch (error) {
      console.log("Failed to update post", error);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }

  return (
    <div>
      <h2 className="page-title">Edit Post</h2>
      <div className="container align-form">
        <form
          id="post"
          onSubmit={updatePost}
          action="#"
          encType="multipart/form-data"
        >
          <label htmlFor="post-title">Title</label>
          <input
            id="post-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="post-title"
            type="text"
          />

          <label htmlFor="post-summary">Summary</label>
          <input
            id="post-summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            name="post-summary"
            type="text"
          />

          <label htmlFor="avatar">Image</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files)}
            id="avatar"
            placeholder="Upload"
          />

          <Editor onChange={setContent} value={content} />

          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
