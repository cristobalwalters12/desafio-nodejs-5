const Joi = require("joi");

const pageSchema = Joi.object({
  order_by: Joi.string()
    .replace(/_(ASC|DESC)/gi, "")
    .valid("id", "nombre", "categoria", "metal", "precio", "stock"),
  page: Joi.number().integer().min(1),
  limits: Joi.number().integer().min(1),
}).options({ abortEarly: false });

const filtersSchema = Joi.object({
  categoria: Joi.string().min(1),
  metal: Joi.string().min(1),
  precio_min: Joi.number().integer().min(0),
  precio_max: Joi.when("precio_min", {
    is: Joi.exist(),
    then: Joi.number()
      .integer()
      .min(Joi.ref("precio_min"))
      .message("precio_max must be greater than or equal to precio_min"),
    otherwise: Joi.number()
      .integer()
      .min(0)
      .message("precio_max must be greater than or equal to 0"),
  }).label("precio_max"),
}).options({ abortEarly: false });

const queryParamsValidatorBuilder = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.query);

    if (error) {
      error.statusCode = 400;
      next(error);
      return;
    }

    next();
  };
};

const pageValidator = queryParamsValidatorBuilder(pageSchema);
const filtersValidator = queryParamsValidatorBuilder(filtersSchema);

module.exports = {
  pageValidator,
  filtersValidator,
};
