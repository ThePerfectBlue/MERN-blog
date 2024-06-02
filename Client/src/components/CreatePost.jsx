import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";
import { baseurl } from "../../baseurl";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const createNewPost = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("avatar", file[0]);

      console.log("data", data);

      const response = await axios.post(`${baseurl}/api/v1/post/create`, data, {
        withCredentials: true,
      });
      if (response.status === 201) {
        console.log("response at frontend", response);
        setRedirect(true);
      }
    } catch (error) {
      console.log("Error at createPost", error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <h2 className="page-title">Create Post</h2>
      <div className="container align-form">
        <form
          id="post"
          onSubmit={createNewPost}
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
          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
