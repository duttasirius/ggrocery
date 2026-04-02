import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.json({
      success: false,
      message: "NOT AUTHORIZED",
    });
  }

  try {
    const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

    if (tokenDecoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.json({
        success: false,
        message: "NOT AUTHORIZED",
      });
    }
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: "TOKEN INVALID",
    });
  }
};

export default authSeller;
