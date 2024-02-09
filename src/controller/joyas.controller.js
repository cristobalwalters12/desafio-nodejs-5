const joyasModel = require("../models/joyas.model");

const getJoyas = async (req, res, next) => {
  try {
    const results = await joyasModel.getByPageAndLimit(req.query);
    res.status(200).json(results);
  } catch (error) {
    next(error);
  }
};

const getFilteredJoyas = async (req, res) => {
  try {
    const results = await joyasModel.getByFilters(req.query);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { getJoyas, getFilteredJoyas };
