const jwt = require("jsonwebtoken");
const { Users } = require("../../Models/Users/Users");
require("dotenv").config();

const tokenAuth = async (request, response, next) => {
  const token = request.header("x-auth-token");

  try {
    if (!token) {
      return response.status(400).json({ msg: "Unauthorized token" });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return response.status(400).json({ msg: "Unauthorized token" });
    }

    const existingUser = await Users.findOne({ _id: verifiedToken.id });

    if (!existingUser) {
      return response.status(400).json({ msg: "Unauthorized token" });
    }
    next();
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

module.exports = { tokenAuth };
