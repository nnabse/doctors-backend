const express = require("express");
const cors = require("cors");
const sequelize = require("./src/db/dbConnect");

const userRoutes = require("./src/modules/routes/userRoutes");
const receptionsRoutes = require("./src/modules/routes/receptionsRoutes");

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", receptionsRoutes);

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
