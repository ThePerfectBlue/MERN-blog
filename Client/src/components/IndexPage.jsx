import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { baseurl } from "../../baseurl";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/v1/post/posts`);

        if (isMounted && response.status === 200) {
          setPosts(response.data.allPosts);
        }
      } catch (error) {
        console.log("Something went wrong while fetching posts", error);
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="index-page">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </div>
  );
};

export default IndexPage;
