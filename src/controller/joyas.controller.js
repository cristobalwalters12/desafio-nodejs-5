const joyasModel = require("../models/joyas.model");

const getJoyas = async (req, res) => {
  const data = await joyasModel.getByPageAndLimit(req.query);
  res.status(200).json({ status: "success", data });
};

const getFilteredJoyas = async (req, res) => {
  const data = await joyasModel.getByFilters(req.query);
  res.status(200).json({ status: "success", data });
};

module.exports = { getJoyas, getFilteredJoyas };
