const { Router } = require("express");
const joyasController = require("../controller/joyas.controller");
const { pageValidator, filtersValidator } = require("../DTO/joyas.dto");
const errorCatcher = require("../helpers/errorCatcher");

const router = Router();

router.get("/", pageValidator, errorCatcher(joyasController.getJoyas));

router.get(
  "/filtros",
  filtersValidator,
  errorCatcher(joyasController.getFilteredJoyas)
);

module.exports = router;
