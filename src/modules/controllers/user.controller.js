const User = require("../models/userModel");

module.exports.createUser = async (req, res) => {
  const { login, password } = req.body;
  if (!(login && password)) {
    return res.status(400).send("Error! Check params.");
  }

  const findUser = async () => {
    const user = await User.findOne({
      where: {
        login: login,
      },
    });

    if (user) return res.status(409).send("User with this login is exists");

    User.create({ login: login, password: password })
      .then(() => res.status(201).send("User created"))
      .catch((err) => res.status(500).send("Error", err));
  };

  findUser();
};

module.exports.loginUser = (req, res) => {
  const { login, password } = req.body;

  if (!(login && password)) return res.status(400).send("Error! Check params.");

  const findUser = async () => {
    const user = await User.findOne({
      where: {
        login: login,
        password: password,
      },
    });

    if (!user) return res.status(404).send("User not Found!");
    res.status(200).send("User found, loginning");
  };

  findUser();
};
