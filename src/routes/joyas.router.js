const { Router } = require("express");
const joyasController = require("../controller/joyas.controller");
const { pageValidator, filtersValidator } = require("../DTO/joyas.dto");

const router = Router();

router.get("/", pageValidator, joyasController.getJoyas);
router.get(
  "/filtros",
  filtersValidator,
  joyasController.getJoyasFilteredController
);
module.exports = router;
