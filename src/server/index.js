const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PORT } = require("../config/config");
const activityLogger = require("../middleware/loggerMiddleware");
const errorHandler = require("../middleware/errorHandler");
const joyasRouter = require("../routes/joyas.router");
const app = express();

app.use(activityLogger);
app.use(cors());
app.use(express.json());

app.use("/joyas", joyasRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
