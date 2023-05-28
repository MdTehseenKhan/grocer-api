import createHttpError from "http-errors"
import database from "../database.js"

export const getAllCategories = (req, res, next) => {
  try {
    const query = "SELECT * FROM categories ORDER BY name;"
    database.query(query, (err, categories) => {
      if (err) return next(createHttpError(500, "❌️ Internal Server Error Error in query"))
      res.status(200).json({ success: true, data: categories })
    })
    //
  } catch (err) {
    return next(createHttpError(500, "❌️ Internal Server Error"))
  }
}

export const addCategory = (req, res, next) => {
  let { name } = req.body
  name = name.toLowerCase()

  const query = "SELECT * FROM categories WHERE name = ?;"
  database.query(query, [name], (err, categories) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (categories.length > 0) next(createHttpError(406, "⚠️ Category already exist."))

    const insertQuery = "INSERT INTO categories(name) VALUES(?);"
    database.query(insertQuery, [name], (err) => {
      if (err) return next(createHttpError(500, "❌️ Internal Server Error"))
      res.status(200).json({ success: true, message: "✅️ Category Added Successfully" })
    })
  })
}

export const updateCategory = (req, res, next) => {
  let { name } = req.body
  const id = req?.params?.id

  try {
    name = name.toLowerCase()
    const query = "UPDATE categories SET name = ? WHERE id = ?;"
    database.query(query, [name, id], (err, results) => {
      if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

      if (results.affectedRows == 0) return next(createHttpError(404, "❌️ Category Not Found!"))
      if (results.changedRows == 0) return next(createHttpError(406, "❌️ New Name can not be the Old!"))

      res.status(200).json({ success: true, message: "✅️ Category Updated Successfully" })
    })
    //
  } catch (err) {
    return next(createHttpError(500, "❌️ Internal Server Error"))
  }
}

export const deleteCategory = (req, res, next) => {
  const id = req?.params?.id
  if (!id) return next(createHttpError(404, "❌️ Category Not Found!"))

  const query = "DELETE FROM categories WHERE id = ?;"
  database.query(query, [id], (err, results) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (results.affectedRows == 0) return next(createHttpError(404, "❌️ Category Not Found!"))

    res.status(200).json({ success: true, message: "✅️ Category Deleted Successfully" })
  })
}
