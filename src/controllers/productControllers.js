import createHttpError from "http-errors"
import database from "../database.js"

export const getAllProducts = (req, res, next) => {
  try {
    const query = "SELECT * FROM products ORDER BY name;"
    database.query(query, (err, products) => {
      if (err) return next(createHttpError(500, "❌️ Internal Server Error"))
      res.status(200).json({ success: true, data: products })
    })
    //
  } catch (err) {
    return next(createHttpError(500, "❌️ Internal Server Error"))
  }
}

export const addProduct = (req, res, next) => {
  let { name, categoryId, description, price, status } = req.body

  name = name.toLowerCase()
  categoryId = categoryId.toLowerCase()
  status = status.toLowerCase()

  const query = "SELECT * FROM products WHERE name = ?;"
  database.query(query, [name], (err, products) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (products.length > 0) next(createHttpError(406, "⚠️ Product already exist."))

    const insertQuery = "INSERT INTO products(name, categoryId, description, price) VALUES(?,?,?,?,?);"
    database.query(insertQuery, [name, categoryId, description, price, status], (err) => {
      if (err) return next(createHttpError(500, "❌️ Internal Server Error"))
      res.status(200).json({ success: true, message: "✅️ Product Added Successfully" })
    })
  })
}

export const updateProduct = (req, res, next) => {
  let { id, name } = req.body

  try {
    name = name.toLowerCase()
    const query = "UPDATE products SET name = ? WHERE id = ?;"
    database.query(query, [name, id], (err, results) => {
      if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

      if (results.affectedRows == 0) return next(createHttpError(404, "❌️ Product Not Found!"))
      if (results.changedRows == 0) return next(createHttpError(406, "❌️ New Name can not be the Old!"))

      res.status(200).json({ success: true, message: "✅️ Product Updated Successfully" })
    })
    //
  } catch (err) {
    return next(createHttpError(500, "❌️ Internal Server Error"))
  }
}
