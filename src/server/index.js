const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const activityLogger = require("../middleware/loggerMiddleware");
const errorHandler = require("../middleware/errorHandler");
const notFoundHandler = require("../middleware/notFoundHandler");
const joyasRouter = require("../routes/joyas.router");
const { PORT } = require("../config/config");

const app = express();

if (process.env.NODE_ENV === "production") {
  app.use(activityLogger);
} else {
  app.use(morgan("common"));
}

app.use(cors());
app.use(express.json());

app.use("/joyas", joyasRouter);
app.all("*", notFoundHandler);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
