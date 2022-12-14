const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./src/db/dbConnect");

const userRoutes = require("./src/modules/routes/userRoutes");
const receptionRoutes = require("./src/modules/routes/receptionRoutes");
const doctorRoutes = require("./src/modules/routes/doctorRoutes");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/receptions", receptionRoutes);
app.use("/doctor", doctorRoutes);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("db connected!");
  } catch (error) {
    console.log("db connection error", error);
  }
};

connectDB();

sequelize.sync({ alter: true }).then(() => {
  console.log(`Database & tables created!`);
});

app.listen(port, () => {
  console.log("server launched on port", port);
});
