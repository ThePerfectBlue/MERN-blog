import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { baseurl } from "../../baseurl";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${baseurl}/api/v1/post/posts`);

        if (isMounted && response.status === 200) {
          setPosts(response.data.allPosts);
          setIsLoading(false);
        }
      } catch (error) {
        console.log("Something went wrong while fetching posts", error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="index-page">
      {isLoading ? (
        <p className="fetching-posts">
          Fetching posts, this may take time due to the separate backend
          deployment
        </p>
      ) : (
        posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)
      )}
    </div>
  );
};

export default IndexPage;
