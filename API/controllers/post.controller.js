import { Post } from "../models/postModel.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

//******************CREATE POST*************** */

export const createPost = async (req, res) => {
  const { title, summary, content } = req.body;
  const fileBuffer = req.file?.buffer;

  const cloudinaryFileUrl = await uploadOnCloudinary(fileBuffer);

  const secureCloudinaryFileUrl = cloudinaryFileUrl.url.replace(
    "http://",
    "https://"
  );

  try {
    const newPost = await Post.create({
      title,
      summary,
      content,
      avatar: secureCloudinaryFileUrl || "",
      author: req.user._id,
    });

    if (newPost) {
      res.status(201).json({
        message: "New post created successfully",
        newPost: newPost,
      });
    } else {
      res.status(400).json({
        message: "Failed to create a new post",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while creating a new post",
      error,
    });
  }
};

//******************FETCH POSTS*************** */

export const fetchPosts = async (req, res) => {
  try {
    const allPosts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 }); // latest post appears on top

    if (allPosts) {
      res.status(200).json({ message: "Posts fetched successfully", allPosts });
    } else {
      res
        .status(401)
        .json({ message: "Failed to fetch posts from  the database" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching posts", error });
  }
};

//******************FETCH POST PAGE*************** */

export const fetchPostPage = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", ["username"]);

    if (post) {
      res.status(200).json({ messagge: "Post fetched sucessfully", post });
    } else {
      res
        .status(401)
        .json({ message: "Failed to fetch the post from the server" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while fetching the post" });
  }
};

//****************** EDIT POST *************** */

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, summary, content } = req.body;
  const fileBuffer = req.file?.buffer;

  try {
    let cloudinaryFileUrl;
    if (fileBuffer) {
      cloudinaryFileUrl = await uploadOnCloudinary(fileBuffer);
    }

    const secureCloudinaryFileUrl = cloudinaryFileUrl.url.replace(
      "http://",
      "https://"
    );

    const oldUser = await Post.findById(id);

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        avatar: secureCloudinaryFileUrl
          ? secureCloudinaryFileUrl
          : oldUser.avatar,
      },
      { new: true }
    );

    if (updatedPost) {
      res
        .status(201)
        .json({ message: "Post updated successfully", updatedPost });
    } else {
      res.status(400).json("Failed to update the post");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong while updating the post", error });
  }
};
