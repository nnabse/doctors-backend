const jwt = require("jsonwebtoken");

const isAuthenticate = (req, res, next) => {
  if (!req.headers.accesstoken) {
    return res.status(400).send({ message: "Error! Check params!" });
  }
  const { accesstoken } = req.headers;
  if (accesstoken) {
    try {
      const userInfo = jwt.verify(accesstoken, process.env.SECRET); 
      req.user = userInfo;
      next();
    } catch (error) {
      res.status(401).send(error);
    }
  }
};

module.exports = { isAuthenticate };
