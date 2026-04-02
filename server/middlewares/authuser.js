import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      message: "NOT AUTHORIZED",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "TOKEN INVALID",
    });
  }
};

export default authUser;
