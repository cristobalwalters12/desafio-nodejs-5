const joyasModel = require("../models/joyas.model");

const getJoyas = async (req, res, next) => {
  try {
    const results = await joyasModel.getJoyasFromDB(req.query);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

const getJoyasFilteredController = async (req, res) => {
  try {
    const results = await joyasModel.getJoyasFiltered(req.query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getJoyas,
  getJoyasFilteredController,
};
