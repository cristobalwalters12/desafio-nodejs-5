const { pool } = require("../database/connection");

const getJoyasFromDB = async ({
  limits = 10,
  page = 1,
  order_by = "id_ASC",
}) => {
  const offset = (page - 1) * limits;
  const orderBy = order_by.replace("_", " ");

  const { rows } = await pool.query(
    `SELECT * FROM inventario ORDER BY ${orderBy} LIMIT $1 OFFSET $2`,
    [limits, offset]
  );

  const totalJoyas = rows.length;
  let stockTotal = rows.reduce((total, joya) => total + joya.stock, 0);
  const results = rows.map(({ nombre: name, id }) => ({
    name,
    href: `/joyas/${id}`,
  }));

  return { totalJoyas, stockTotal, results };
};

const getJoyasFiltered = async (filters) => {
  let params = [];
  let query = `SELECT * FROM inventario WHERE 1 = 1`;

  for (let filter in filters) {
    params.push(filters[filter]);
    const [column, symbol] = processFilter(filter);
    query += ` AND ${column} ${symbol} $${params.length}`;
  }

  const { rows } = await pool.query(query, params);
  return rows;
};

const processFilter = (filter) => {
  let symbol = "=";
  const [column, comparator] = filter.split("_");
  if (comparator) {
    symbol = comparator === "min" ? ">=" : "<=";
  }
  return [column, symbol];
};

module.exports = { getJoyasFromDB, getJoyasFiltered };
