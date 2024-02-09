const notFoundHandler = (req, res, next) => {
  const error = new Error(`The resource ${req.originalUrl} wasn't found`);
  error.statusCode = 404;
  next(error);
};

export { notFoundHandler };
