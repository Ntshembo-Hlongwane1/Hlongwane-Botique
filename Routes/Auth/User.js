const router = require("express").Router();
const Formidable = require("formidable");
const { Users } = require("../../Models/Users/Users");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//====================================================USER AUTHENTICATION ROUTE===========================================
router.post("/api/user-register", async (request, response) => {
  const form = new Formidable.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { email, username, password, verifiedPassword, isAdmin } = fields;

    try {
      if (!email || !username || !password || !verifiedPassword) {
        return response
          .status(400)
          .json({ msg: "Not all fields have been entered" });
      }

      if (password.length < 5) {
        return response
          .status(400)
          .json({ msg: "Password has to be atleast 5 charaters long" });
      }

      if (password != verifiedPassword) {
        return response.status(400).json({ msg: "Passwords do not match" });
      }

      const checkExistingUser = await Users.findOne({ email: email });

      if (checkExistingUser) {
        return response
          .status(400)
          .json({ msg: "User with this email already exists" });
      }

      const salt = await Bcrypt.genSalt();
      const hashedPassword = await Bcrypt.hash(password, salt);
      const newUser = new Users({
        email: email,
        username: username,
        password: hashedPassword,
        isAdmin: isAdmin,
      });

      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      const hashedMail = await Bcrypt.hash(email, salt);
      console.log(hashedMail);
      if (isAdmin === null || isAdmin === undefined) {
        const serverResponse = {
          token: token,
          user: {
            email: hashedMail,
            username,
          },
        };
        return response.status(200).json(serverResponse);
      }
      const serverResponse = {
        token: token,
        user: {
          email: hashedMail,
          username,
          isAdmin: isAdmin,
        },
      };
      return response.status(200).json(serverResponse);
    } catch (error) {
      return response.status(500).json({ msg: "Server is currently down :(" });
    }
  });
});

router.post("/api/user-login", (request, response) => {
  const form = new Formidable.IncomingForm();
  form.parse(request, async (error, fields, files) => {
    const { email, password } = fields;

    if (!email || !password) {
      return response
        .status(400)
        .json({ msg: "Not all have fields have been entered" });
    }
    const checkExistingUser = await Users.findOne({ email: email });
    if (!checkExistingUser) {
      return response
        .status(400)
        .json({ msg: "No user with this account exists" });
    }

    const verifyPassword = await Bcrypt.compare(
      password,
      checkExistingUser.password
    );

    if (!verifyPassword) {
      return response.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: checkExistingUser._id },
      process.env.JWT_SECRET
    );
    if (checkExistingUser.isAdmin) {
      const salt = await Bcrypt.genSalt();
      const hashedMail = await Bcrypt.hash(email, salt);
      const loggedUser = {
        token: token,
        user: {
          email: hashedMail,
          username: checkExistingUser.username,
          isAdmin: checkExistingUser.isAdmin,
        },
      };
      return response.status(200).json(loggedUser);
    }
    const salt = await Bcrypt.genSalt();
    const hashedMail = await Bcrypt.hash(email, salt);
    const loggedUser = {
      token: token,
      user: {
        email: hashedMail,
        username: checkExistingUser,
      },
    };
    return response.status(200).json(loggedUser);
  });
});

module.exports = router;
