const { Doctor } = require("../../db/modelsConnections");

const getDoctors = (req, res) => {
  Doctor.findAll().then((result) => {
    res.status(200).send(result);
  });
};

module.exports = {
  getDoctors,
};
