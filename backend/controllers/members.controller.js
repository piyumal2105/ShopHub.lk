import User from "../models/member.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendRandomPassword } from "../Mails/randomPassword.js";
import { generateRandomPW } from "../utils/generateRandomPassword.js";

//generate member Id
const generateMemberId = async () => {
  //get last station object, if there is a station, then return that station object, otherwise return empty array
  const lastMemberDetails = await User.find().sort({ _id: -1 }).limit(1);

  //check if the result array is empty or not, if its empty then return first memberid
  if (lastMemberDetails.length == 0) {
    return "SHOP-1";
  }

  //if array is not null, last get last memberid
  const memberId = lastMemberDetails.map((data) => {
    return data.cusMemberID;
  });

  //then we get the Integer value from the last part of the ID
  const oldMemberId = parseInt(memberId[0].split("-")[1]);

  const newMemberId = oldMemberId + 1; //then we add 1 to the past value

  return `SHOP-${newMemberId}`; //return new memberid
};

//add member by admin
export const addMember = async (req, res) => {
  try {
    //generate member ID
    const memId = await generateMemberId();

    // generate random password and hashing that password
    const randomPassword = generateRandomPW();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const newMember = new User({
      cusMemberID: memId,
      name: req.body.name,
      email: req.body.email,
      shop: req.body.shop,
      category: req.body.category,
      otherCategory: req.body.otherCategory,
      mobile: req.body.mobile,
      userRole: "MEMBER",
      status: "ACCEPTED",
      password: hashedPassword,
      initialPasswordReset: false,
    });

    const savedMember = await newMember.save(); //save the new member document to the database

    console.log(newMember);

    // after adding the user then send the random password as a email
    await sendRandomPassword({
      username: savedMember.name,
      userEmail: savedMember.email,
      randomPassword,
    });

    res.status(201).json(savedMember); //send the saved member as the response
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "failed to add member", err });
  }
};

export const getRequestedMember = async (req, res) => {
  try {
    const members = await User.find({ status: "REQUESTED" });

    res.status(201).json(members);
  } catch (err) {
    res.status(500).json({ message: "failed get members", err });
  }
};

export const getAcceptedMember = async (req, res) => {
  try {
    const members = await User.find({ status: "ACCEPTED" });

    res.status(201).json(members);
  } catch (err) {
    res.status(500).json({ message: "failed get members", err });
  }
};

export const acceptMember = async (req, res) => {
  try {
    const _id = req.params.id;

    // generate random password for the user
    const randomPassword = generateRandomPW();
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    const acceptedMember = await User.findByIdAndUpdate(_id, {
      status: "ACCEPTED",
      password: hashedPassword,
      initialPasswordReset: false,
      new: true,
    });

    // after updating the user status then send the random password as a email
    await sendRandomPassword({
      username: acceptedMember.name,
      userEmail: acceptedMember.email,
      randomPassword,
    });

    res.status(201).json(acceptedMember);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "failed accept member request", err });
  }
};

export const deleteMember = async (req, res) => {
  const _id = req.params.id;

  try {
    const deletedMember = await User.findByIdAndDelete(_id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete member", error });
  }
};

export const updateMember = async (req, res) => {
  const _id = req.params.id;

  const updateFields = {
    name: req.body.name,
    email: req.body.email,
    shop: req.body.shop,
    category: req.body.category,
    otherCategory: req.body.otherCategory,
    mobile: req.body.mobile,
  };

  try {
    const updatedMember = await User.findByIdAndUpdate(_id, updateFields, {
      new: true,
    });

    if (!updatedMember) {
      // If the worker is not found, send a 404 status code with a message
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ message: "Member updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update worker", error });
  }
};

//register member by shop owner
export const regMember = async (req, res) => {
  try {
    //generate member ID
    const memId = await generateMemberId();

    const newMember = new User({
      cusMemberID: memId,
      name: req.body.name,
      email: req.body.email,
      category: req.body.category,
      otherCategory: req.body.otherCategory,
      mobile: req.body.mobile,
      shop: req.body.shop,
      userRole: "MEMBER",
      status: "REQUESTED",
    });

    console.log(newMember);

    const savedMember = await newMember.save(); //save the new member document to the database

    res.status(201).json(savedMember); //send the saved member as the response
  } catch (err) {
    res.status(500).json({ message: "failed to register member", err });
  }
};

export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    //  checking password and email fields are not empty
    if (!email || !password) {
      throw new Error("all fields are required");
    }

    const user = await User.findOne({ email });

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
      user: {
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

//get member by id
export const getMemberById = async (req, res) => {
  try {
    const _id = req.params.id;

    const member = await User.findById(_id);

    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: "failed get member", err });
  }
};

//update initial password reset
export const updateInitialPasswordReset = async (req, res) => {
  try {
    const _id = req.params.id;
    const newPassword = req.body.password;

    // Hash the new password using bcrypt
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the document in the database
    const updatedMember = await User.findByIdAndUpdate(
      _id,
      {
        initialPasswordReset: true,
        password: hashedPassword,
      },
      { new: true } // to return the updated document
    );

    res.status(201).json(updatedMember);
  } catch (err) {
    res.status(500).json({ message: "failed update member", err });
  }
};

//add profile picture for id
export const addProfilePicture = async (req, res) => {
  try {
    const _id = req.params.id;
    const profilePicture = req.body.profilePicture;

    const updatedMember = await User.findByIdAndUpdate(
      _id,
      {
        profilePicture: profilePicture,
      },
      { new: true } // to return the updated document
    );

    res.status(201).json(updatedMember);
  } catch (err) {
    res.status(500).json({ message: "failed update member", err });
  }
};
