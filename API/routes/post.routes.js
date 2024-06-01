import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createPost,
  editPost,
  fetchPostPage,
  fetchPosts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.route("/posts").get(fetchPosts);
router.route("/:id").get(fetchPostPage);

//secure routes

router.route("/create").post(verifyJWT, upload.single("avatar"), createPost);
router.route("/edit/:id").put(verifyJWT, upload.single("avatar"), editPost);

export default router;
