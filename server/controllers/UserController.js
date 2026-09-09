import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import newsletterModel from "../models/newsletterModel.js";
import {
  NEWSLETTER_SUBSCRIPTION_TEMPLATE,
  WELCOME_TEMPLATE,
} from "../configs/emailTemplates.js";
import transporter from "../configs/nodemailer.js";

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

    // sending welcome mail
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "WELCOME TO MY WEBSITE",
      // text: `Welcome aboard! 🎉 Your account has been created successfully. Explore features, enjoy the experience, and thank you for joining us today with your email id:${email}.
      html: WELCOME_TEMPLATE.replace("{{name}}", name)
        .replace("{{email}}", user.email)
        .replace("{{websiteUrl}}", process.env.CLIENT_URL),
    };

    await transporter.sendMail(mailOptions);
    console.log("EMAIL SENT");

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

// subscribe newsletter

export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    // check empty
    if (!email) {
      return res.json({
        success: false,
        message: "Email required",
      });
    }

    // check already exists
    const existingUser = await newsletterModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "Already subscribed",
      });
    }

    // save email
    const newSubscriber = new newsletterModel({
      email,
    });

    await newSubscriber.save();

    res.json({
      success: true,
      message: "Subscribed successfully",
    });

    // SENDING NEWSLETTER SUBSCRIBE CONFIRM MAIL

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "WELCOME TO MY WEBSITE",
      // text: `Welcome aboard! 🎉 Your account has been created successfully. Explore features, enjoy the experience, and thank you for joining us today with your email id:${email}.
      html: NEWSLETTER_SUBSCRIPTION_TEMPLATE.replace(
        "{{email}}",
        email,
      ).replace("{{websiteUrl}}", process.env.CLIENT_URL),
    };

    await transporter.sendMail(mailOptions);
    console.log("EMAIL SENT");
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

// getting user newsletter mail from admin
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await newsletterModel.find({});

    res.json({
      success: true,
      subscribers,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: "Error fetching subscribers",
    });
  }
};
