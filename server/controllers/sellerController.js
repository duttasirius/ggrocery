import jwt from "jsonwebtoken";

// login seller
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET);
      res.cookie("sellerToken", token);

      return res.json({
        success: true,
        message: "SELLER LOGGED IN ",
      });
    } else {
      return res.json({
        success: false,
        message: "VALID EMAIL & PASSWORD REQUIRED",
      });
    }
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// seller is auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// seller logout
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken");
    return res.json({
      success: true,
      message: "LOGGED OUT ",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
