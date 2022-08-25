const { Doctor } = require("../../db/modelsConnections");

const createDoctor = (req, res) => {
  Doctor.create({
    fullName: "Ivan Ivanovich Ivanov",
  }).then((resp) => res.status(200).send(resp));
};

const getDoctors = (req, res) => {
  Doctor.findAll().then((result) => {
    res.status(200).send(result);
  });
};

module.exports = {
  createDoctor,
  getDoctors,
};
