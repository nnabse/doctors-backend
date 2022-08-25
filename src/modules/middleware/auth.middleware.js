const jwt = require("jsonwebtoken");

const isAuthenticate = (req, res, next) => {
  if (!req.query.accessToken) {
    return res.status(400).send("Error! Check params!");
  }
  const { accessToken } = req.query;
  if (accessToken) {
    try {
      const userInfo = jwt.verify(accessToken, process.env.SECRET);
      req.user = userInfo;
      next();
    } catch (error) {
      res.status(401).send(error);
    }
  }
};

module.exports = { isAuthenticate };
