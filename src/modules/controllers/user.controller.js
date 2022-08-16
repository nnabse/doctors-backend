const User = require("../models/userModel");

const createUser = async (req, res) => {
  const { login, password } = req.body;
  if (!(login && password)) return res.status(400).send("Error! Check params.");

  try {
    const [user, created] = await User.findOrCreate({
      where: {
        login: login,
      },
      defaults: {
        login: login,
        password: password,
      },
    });

    if (!created) return res.status(409).send("User with this login is exists");

    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Error", error);
  }
};

const loginUser = async (req, res) => {
  const { login, password } = req.body;

  if (!(login && password)) return res.status(400).send("Error! Check params.");

  try {
    const user = await User.findOne({
      where: {
        login: login,
        password: password,
      },
    });

    if (!user) return res.status(404).send("User not Found!");

    res.status(200).send("User found, loginning");
  } catch (error) {
    res.status(500).send("Error", error);
  }
};

module.exports = {
  createUser,
  loginUser,
};
