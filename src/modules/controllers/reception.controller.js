const { Reception, Doctor } = require("../../db/modelsConnections");

const getReceptions = (req, res) => {
  const { id } = req.user;
  Reception.findAll({
    where: {
      UserId: id,
    },
    include: {
      model: Doctor,
      attributes: ["fullName"],
    },
  }).then((result) => {
    result.map((elem) => {
      const { fullName } = elem.Doctor;
      elem.dataValues.Doctor.fullName = fullName;
    });
    return res.status(200).send(result);
  });
};

const createReception = (req, res) => {
  const { date, patientName, complaints, DoctorId } = req.query;
  const { id } = req.user;

  Reception.create({
    date: date,
    patientName: patientName,
    complaints: complaints,
    DoctorId: DoctorId,
    UserId: id,
  })
    .then((result) => {
      return res.status(200).send(result);
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};

const changeReception = (req, res) => {
  res.status(200).send("changeReception");
};

const deleteReception = (req, res) => {
  const { id } = req.query;
  try {
    Reception.destroy({
      where: {
        id: id,
      },
    }).then((result) => {
      if (result) {
        return res.status(200).send({ message: "Deleted successfully!" });
      }
      return res.status(404).send({ message: "Wrong ID!" });
    });
  } catch (error) {
    return res.status(500).send({ error: error, message: "Internal error!" });
  }
};

module.exports = {
  getReceptions,
  createReception,
  changeReception,
  deleteReception,
};
