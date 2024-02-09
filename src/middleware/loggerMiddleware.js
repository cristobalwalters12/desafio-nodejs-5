const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const logDirectory = path.join(__dirname, "../logs");
const logFile = path.join(logDirectory, "activity.log");

const ensureLogDirectoryExists = async () => {
  try {
    await fs.access(logDirectory);
  } catch {
    await fs.mkdir(logDirectory);
  }
};

const activityLogger = (req, _, next) => {
  ensureLogDirectoryExists().then(() => {
    const logEntry = `${new Date().toISOString()} - Traza: ${v4()}, Se accedió a la ruta: ${
      req.path
    }\n`;

    fs.appendFile(logFile, logEntry, "utf8")
      .then(() => console.log(logEntry))
      .catch((err) =>
        console.error("Error al escribir en el archivo de registro:", err)
      );

    next();
  });
};

module.exports = activityLogger;
