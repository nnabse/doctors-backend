const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");

const userRoutes = require("./src/modules/routes/userRoutes");
const receptionsRoutes = require("./src/modules/routes/receptionsRoutes");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", receptionsRoutes);

const uri = "postgres://postgres:postgres@localhost:5432/doctors";

const sequelize = new Sequelize(uri);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("db connected!");
  } catch (error) {
    console.log("db connection error", error);
  }
};

connectDB();

app.listen(port, () => {
  console.log("server launched on port", port);
});
