const { Doctor } = require("../../db/modelsConnections");

const getDoctors = async (req, res) => {
  try {
    const doctorsList = await Doctor.findAll();
    res.status(200).send(doctorsList);
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  getDoctors,
};
