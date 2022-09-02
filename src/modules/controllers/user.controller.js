const { User } = require("../../db/modelsConnections");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");

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
      return res
        .status(409)
        .send({ message: "User with this login is exists" });
    }

    const userInfo = { id: user.id, login: user.login };

    const accessToken = generateAccessToken(userInfo);
    const refreshToken = generateRefreshToken(userInfo);

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
        const accessToken = generateAccessToken({ login: login, id: user.id });
        const refreshToken = generateRefreshToken({
          login: login,
          id: user.id,
        });
        return res
          .status(200)
          .send({ accessToken, refreshToken, username: login });
      }
    }
    return res.status(400).send({ message: "incorrect login or password" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateTokens = (req, res) => {
  if (!req.headers.refreshtoken) {
    return res.status(400).send("Error! Check params!");
  }

  try {
    const refreshToken = req.headers.refreshtoken;
    const userInfo = jwt.verify(refreshToken, process.env.SECRET);

    if (userInfo) {
      const { login, id } = userInfo;
      const accessToken = generateAccessToken({ login, id });
      const refreshToken = generateRefreshToken({ login, id });
      return res.status(200).send({ accessToken, refreshToken });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateTokens,
};
