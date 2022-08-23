const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middleware/generateTokens");

const createUser = async (req, res) => {
  const { login, password } = req.body;

  if (!(login && password)) {
    return res.status(400).send("Error! Check params.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const [user, created] = await User.findOrCreate({
      where: {
        login: login,
      },
      defaults: {
        login: login,
        password: hashedPassword,
      },
    });

    if (!created) {
      return res.status(409).send("User with this login is exists");
    }

    const accessToken = generateAccessToken({ login: login });
    const refreshToken = generateRefreshToken({ login: login });
    res.status(201).send({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send("Error", error);
  }
};

const loginUser = async (req, res) => {
  const { login, password } = req.body;

  if (!(login && password)) {
    return res.status(400).send("Error! Check params.");
  }
  
  try {
    const user = await User.findOne({
      where: {
        login: login,
      },
    });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const accessToken = generateAccessToken({ login: login });
        const refreshToken = generateRefreshToken({ login: login });
        return res.status(200).send({ accessToken, refreshToken });
      }
    }

    return res.status(401).send("incorrect login or password");
  } catch (error) {
    res.status(500).send("Error", error);
  }
};

module.exports = {
  createUser,
  loginUser,
};
