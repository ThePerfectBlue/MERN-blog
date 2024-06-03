import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessTokens = user.generateAccessTokens();
    return accessTokens;
    //
  } catch (error) {
    return { error: new Error("Something went wrong while generating tokens") };
  }
};

//******************REGISTER CONTROLLER*************** */

export const registerUser = async (req, res) => {
  const { username, email, password } = req?.body;
  let salt = bcrypt.genSaltSync(10);
  try {
    const newUser = await User.create({
      email: email,
      username: username,
      password: bcrypt.hashSync(password, salt),
    });
    if (!newUser) {
      return res.status(500).json({
        message: "User creation failed in database",
      });
    }
    return res.status(201).json({
      success: true,
      message: "User registered Successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Something went wrong while registering user",
      error: error,
    });
  }
};

//****************LOGIN CONTROLLER************8* */

export const loginUser = async (req, res) => {
  const { username, password } = req?.body;

  try {
    const userDB = await User.findOne({ username });
    if (!userDB) {
      return res.status(500).json("User doesn't exist");
    }
    const checkPass = await bcrypt.compare(password, userDB.password);
    if (checkPass) {
      // logged in

      const accessTokens = await generateTokens(userDB._id);

      const loggedInUser = await User.findById(userDB._id).select("-password");

      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      return res
        .status(200)
        .cookie("accessTokens", accessTokens, options)
        .json({
          user: loggedInUser,
          message: "User logged in successfully",
        });
    } else {
      return res.status(400).json("Incorrect credentials");
    }
  } catch (error) {
    return res.json({
      message: "Something went wrong from the server side",
      error,
    });
  }
};

//***************GET PROFILE**************** */

export const getProfile = async (req, res) => {
  const userInfo = req.user;
  if (userInfo) {
    return res.status(200).json({
      message: "User is logged in",
      user: userInfo,
    });
  } else {
    return res.status(500).json({
      message: "Failed to getProfile",
    });
  }
};

//*******************LOGOUT USER***************** */

export const logoutUser = async (req, res) => {
  try {
    // cookie deletion code

    if (req.user) {
      const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      res.clearCookie("accessTokens", options).status(200).json({
        message: "User logged out seccessfully",
      });
    } else {
      return res.status(401).json({
        message: "User is not logged in",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while logging out user",
      error: error,
    });
  }
};
