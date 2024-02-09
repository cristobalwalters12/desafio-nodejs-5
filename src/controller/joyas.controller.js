const joyasModel = require("../models/joyas.model");

const getJoyas = async (req, res) => {
  const results = await joyasModel.getByPageAndLimit(req.query);
  res.status(200).json(results);
};

const getFilteredJoyas = async (req, res) => {
  const results = await joyasModel.getByFilters(req.query);
  res.status(200).json(results);
};

module.exports = { getJoyas, getFilteredJoyas };
