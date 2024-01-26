const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateRegister, validateLogin } = require("../utils/validation");
const userModel = require("../models/user.model");

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { error } = validateRegister(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const isExist = await userModel.findOne({ email });
    if (isExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully ! Please Login",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please send valid data",
      });
    }

    const isExist = await userModel.findOne({ email });

    if (!isExist) {
      return res.status(400).json({
        message: "email of password invalid",
      });
    }

    const isMatch = await bcrypt.compare(password, isExist.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "email of password invalid",
      });
    }

    const token = jwt.sign({ id: isExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: isExist._id,
        name: isExist.name,
        email: isExist.email,
        token,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createUser,
  login,
};
