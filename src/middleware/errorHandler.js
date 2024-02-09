const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.error(err.stack);
  }
  const { statusCode } = err;

  if (statusCode) {
    res.status(statusCode).json({ status: "fail", data: err.message });
    return;
  }

  res
    .status(500)
    .json({ status: "error", message: "Error interno del servidor" });
};

module.exports = errorHandler;
