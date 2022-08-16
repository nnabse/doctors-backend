const getReceptions = (req, res) => {
  res.status(200).send("getReceptions");
};

const createReception = (req, res) => {
  res.status(200).send("createReception");
};

const changeReception = (req, res) => {
  res.status(200).send("changeReception");
};

const deleteReception = (req, res) => {
  res.status(200).send("deleteReception");
};

module.exports = {
  getReceptions,
  createReception,
  changeReception,
  deleteReception,
};
