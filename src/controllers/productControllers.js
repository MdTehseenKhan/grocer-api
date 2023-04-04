import createHttpError from "http-errors"
import database from "../database.js"

export const getAllProducts = (req, res, next) => {
  try {
    const query = `SELECT p.id,p.name,p.image,p.description,p.price,p.active, c.id as categoryId,c.name as categoryName FROM products as p
    INNER JOIN categories as c WHERE p.categoryId = c.id;`

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
  let { name, description, price, categoryId, active } = req.body
  name = name.toLowerCase()
  const image = req?.file?.filename

  const categoryCheckQuery = "SELECT * FROM categories WHERE id = ?;"
  database.query(categoryCheckQuery, [categoryId], (err, results) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (!results.length) {
      categoryId = 1
    }
  })

  const query = "SELECT * FROM products WHERE name = ?;"
  database.query(query, [name], (err, products) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (products.length > 0) return next(createHttpError(406, "⚠️ Product already exist."))

    const insertQuery = "INSERT INTO products(name, image, description, price, categoryId, active) VALUES(?,?,?,?,?,?);"
    database.query(insertQuery, [name, image, description, price, categoryId, active], (err) => {
      console.log({ err })
      if (err) return next(createHttpError(500, "❌️ Internal Server Error"))
      res.status(200).json({ success: true, message: "✅️ Product Added Successfully" })
    })
  })
}

export const updateProduct = (req, res, next) => {
  let { name, description, price, categoryId, active } = req.body
  const id = req?.params?.id
  if (!id) return next(createHttpError(404, "❌️ Product Not Found!"))

  const image = req?.file?.filename
  name = name.toLowerCase()

  const categoryCheckQuery = "SELECT * FROM categories WHERE id = ?;"
  database.query(categoryCheckQuery, [categoryId], (err, results) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (!results.length) {
      categoryId = 1
    }
  })

  const query =
    "UPDATE products SET name = ?, image = ?, description = ?, price = ?, categoryId = ?, active = ? WHERE id = ?;"

  database.query(query, [name, image, description, price, categoryId, active, id], (err, results) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (results.affectedRows == 0) return next(createHttpError(404, "❌️ Product Not Found!"))

    if (results.changedRows == 0) return next(createHttpError(406, "❌️ New Values can not be the Old Values!"))

    res.status(200).json({ success: true, message: "✅️ Product Updated Successfully" })
  })
}

export const deleteProduct = (req, res, next) => {
  const id = req?.params?.id
  if (!id) return next(createHttpError(404, "❌️ Product Not Found!"))

  const query = "DELETE FROM products WHERE id = ?;"
  database.query(query, [id], (err, results) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (results.affectedRows == 0) return next(createHttpError(404, "❌️ Product Not Found!"))

    res.status(200).json({ success: true, message: "✅️ Product Deleted Successfully" })
  })
}
