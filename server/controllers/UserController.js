import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "MISSING DETAILS",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "USER ALREADY EXISTS",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.json({
      success: true,
      user: { user: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

// LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "MISSING DETAILS",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "NO USER FOUND",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "INVALID CREDENTIALS",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);

    return res.json({
      success: true,
      user: { user: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

// check auth
export const isAuth = async (req, res) => {
  try {
    const { userId } = req;

    const user = await User.findById(userId).select("-password");

    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// LOGOUT USER
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({
      success: true,
      message: "LOGGED OUT",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
