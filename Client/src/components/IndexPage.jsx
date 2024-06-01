import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/post/posts"
        );

        if (response.status === 200) {
          setPosts(response.data.allPosts);
        }
      } catch (error) {
        console.log("Something went wrong while fetching posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="index-page">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default IndexPage;
