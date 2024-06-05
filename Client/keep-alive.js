import { useEffect } from "react";
import axios from "axios";
import { baseurl } from "./baseurl";

const KeepAlive = () => {
  useEffect(() => {
    const keepAlive = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/v1/post/posts`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Ping successful");
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    // Call keepAlive every 10 minutes (600000 milliseconds)
    const intervalId = setInterval(keepAlive, 600000);

    // Optionally call keepAlive immediately on component mount
    keepAlive();

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return null; // This component does not render anything
};

export default KeepAlive;
