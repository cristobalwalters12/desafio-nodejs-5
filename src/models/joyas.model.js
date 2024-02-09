const { pool } = require("../database/connection");

const getJoyasFromDB = async ({
  limits = 10,
  page = 1,
  order_by = "id_ASC",
}) => {
  const limitsInt = parseInt(limits, 10);
  const offsetInt = (page - 1) * limitsInt;
  const orderBy = order_by.replace("_", " ");
  try {
    const { rows } = await pool.query(
      `SELECT * FROM inventario ORDER BY ${orderBy} LIMIT $1 OFFSET $2`,
      [limitsInt, offsetInt]
    );
    const totalJoyas = rows.length;
    let stockTotal = rows.reduce((total, joya) => total + joya.stock, 0);
    const results = rows.map(({ nombre: name, id }) => ({
      name,
      href: `/joyas/${id}`,
    }));
    return { "total joyas": totalJoyas, "stock total": stockTotal, results };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getJoyasFiltered = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let params = [];
  let query = `SELECT * FROM inventario WHERE 1 = 1`;

  if (precio_min) {
    query += ` AND precio >= $` + (params.length + 1);
    params.push(precio_min);
  }
  if (precio_max) {
    query += ` AND precio <= $` + (params.length + 1);
    params.push(precio_max);
  }
  if (categoria) {
    query += ` AND categoria = $` + (params.length + 1);
    params.push(categoria);
  }
  if (metal) {
    query += ` AND metal = $` + (params.length + 1);
    params.push(metal);
  }
  try {
    const response = await pool.query(query, params);
    return response.rows;
  } catch (error) {
    throw error;
  }
};
module.exports = { getJoyasFromDB, getJoyasFiltered };
