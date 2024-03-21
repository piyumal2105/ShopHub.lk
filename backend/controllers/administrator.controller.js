import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const AdminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  checking password and email fields are not empty
    if (!email || !password) {
      throw new Error("all fields are required");
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      throw new Error("Invalid password or email");
    }

    // if email user is exist then checking the password with bcrypt
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("Invalid password or email");
    }

    // if password and email are correct then generate a jsonwebtoken for the user
    const token = jwt.sign(
      {
        name: user.name,
        id: user._id,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      }
    );

    // register a cookie and put the token into the cookie
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24,
      secure: false,
    });

    res.status(200).json({
      message: "login success",
      success: true,
      admin: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ status: false, message: "Invalid password or email" });
  }
};
