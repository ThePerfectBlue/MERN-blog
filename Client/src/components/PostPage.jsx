import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../contexts/userContext";
import { baseurl } from "../../baseurl";

const PostPage = () => {
  const [postInfo, setPostInfo] = useState(null);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchPostPage = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/v1/post/${id}`);
        if (response) {
          setPostInfo(response.data.post);
        }
      } catch (error) {
        alert("Failed to fetch the post", error);
      }
    };
    fetchPostPage();
  }, [id]);

  if (!postInfo) {
    return <div className="loading-img">Loading...</div>;
  }

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      <div className="author">by @{postInfo.author.username}</div>
      {user && user._id === postInfo.author._id && (
        <div className="edit-row">
          <Link to={`/edit/${postInfo._id}`} title="Edit" className="edit-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
              style={{ color: "black" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </Link>
        </div>
      )}
      <time>{format(new Date(postInfo.createdAt), "dd MMM yyyy p")}</time>

      <div className="image">
        <img src={postInfo.avatar} alt="Cover" />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
