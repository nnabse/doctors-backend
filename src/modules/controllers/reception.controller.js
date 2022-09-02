const { Reception, Doctor } = require("../../db/modelsConnections");
const { Op } = require("sequelize");

const getReceptions = async (req, res) => {
  const { id } = req.user;
  let { startDate, endDate } = req.query;
  let { sortOption, sortMethod } = req.query;

  if (!sortOption && !sortMethod) {
    sortOption = "date";
    sortMethod = "asc";
  }
  if (!startDate && !endDate) {
    startDate = "1111-01-01";
    endDate = "9999-01-01";
  }

  if (sortOption === "doctor") {
    try {
      const receptionsList = await Reception.findAll({
        where: {
          userId: id,
          date: { [Op.between]: [startDate, endDate] },
        },
        include: {
          model: Doctor,
        },
        order: [[Doctor, "fullName", sortMethod]],
      });
      receptionsList.map((elem) => {
        const { fullName } = elem.doctor;
        elem.dataValues.doctor.fullName = fullName;
      });
      return res.status(200).send(receptionsList);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }

  try {
    const receptionsList = await Reception.findAll({
      where: {
        date: { [Op.between]: [startDate, endDate] },
        userId: id,
      },
      include: {
        model: Doctor,
      },
      order: [[sortOption, sortMethod]],
    });
    receptionsList.map((elem) => {
      const { fullName } = elem.doctor;
      elem.dataValues.doctor.fullName = fullName;
    });
    return res.status(200).send(receptionsList);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const createReception = async (req, res) => {
  const body = req.body;
  if (!body.doctor || !body.doctor.id) {
    return res.status(400).send({ message: "Error! Check params!" });
  }
  const { date, patientName, complaints } = body;
  const doctorId = body.doctor.id;
  const { id } = req.user;

  try {
    const reception = await Reception.create({
      date: date,
      patientName: patientName,
      complaints: complaints,
      doctorId: doctorId,
      userId: id,
    });
    return res.status(200).send(reception);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const changeReception = async (req, res) => {
  const { date, patientName, complaints, doctor } = req.body;
  const { id } = req.query;

  try {
    await Reception.update(
      {
        date,
        patientName,
        complaints,
        doctorId: doctor.id,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.status(200).send({ message: "Reception successfully updated!" });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const deleteReception = async (req, res) => {
  const { id } = req.query;
  try {
    await Reception.destroy({
      where: {
        id,
      },
    });
    return res.status(200).send({ message: "Deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ error, message: "Internal error!" });
  }
};

module.exports = {
  getReceptions,
  createReception,
  changeReception,
  deleteReception,
};
