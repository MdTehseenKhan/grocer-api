import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import createHttpError from "http-errors"

import database from "../database.js"
import { JWT_KEY, NODEMAILER_EMAIL, transporter } from "../config/index.js"

export const getAllUsers = (req, res, next) => {
  const query = "SELECT id, name, email FROM users WHERE role = 'customer';"
  database.query(query, (err, users) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    try {
      res.status(200).json({ success: true, data: users })
    } catch (err) {
      next(createHttpError(500, "❌️ Internal Server Error"))
    }
  })
}

export const signupUser = (req, res, next) => {
  const { name, email, password } = req.body

  const query = `SELECT * FROM users WHERE users.email = ?;`

  database.query(query, [email], async (err, users) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (users.length > 0) return next(createHttpError(422, "⚠️ Email Already Exists!"))

    try {
      const encryptedPassword = await bcrypt.hash(password, 8)
      const insertQuery = `INSERT INTO users(name, email, password) VALUES  (?,?,?);`
      database.query(insertQuery, [name, email, encryptedPassword], (err) => {
        if (err) return next(createHttpError(500, "❌️ Internal Server Error"))
        res.status(200).json({ success: true, message: "✅️ User Created Successfully!" })
      })
    } catch (err) {
      next(createHttpError(500, "❌️ Internal Server Error"))
    }
  })
}

export const signinUser = (req, res, next) => {
  const { email, password } = req.body

  const query = `SELECT * FROM users WHERE users.email = ?;`

  database.query(query, [email], async (err, users) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (!users.length) return next(createHttpError(404, "User Not Found!"))

    try {
      const user = users[0]

      const isValidPassword = await bcrypt.compare(password, user.password)
      if (!isValidPassword) return next(createHttpError(401, "❌️ Invalid Password!"))

      const token = jwt.sign({ name: user.name, email: user.email, role: user.role }, JWT_KEY, { expiresIn: "7d" })
      res.cookie("jwt", token)

      res.status(200).json({ success: true, name: user.name, token })
    } catch (err) {
      next(createHttpError(500, "❌️ Internal Server Error"))
    }
  })
}

export const forgotPassword = (req, res, next) => {
  const { email } = req.body

  const query = "SELECT * FROM users WHERE email = ?"
  database.query(query, [email], async (err, users) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (!users.length) return next(createHttpError(404, "❌️ User Not Found"))

    try {
      let info = await transporter.sendMail({
        from: `Tehseen Khan <${NODEMAILER_EMAIL}>`, // sender address
        to: email, // list of receivers
        subject: `Grocer | Forgot Password`, // Subject line
        html: `Your Verification Link for Forgot Password is`,
        // <a href="${url}/verify/${jwtToken}">here</a>.<br />Note: This link is valid within 60 minutes.`, // html body
      })

      res.status(200).json({
        encryptedToken,
        message: `Preview URL: %s ${nodemailer.getTestMessageUrl(info)}`,
      })
    } catch (err) {
      next(createHttpError(500, "❌️ Internal Server Error"))
    }
  })
}

export const changePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body
  const { email } = req.user

  const query = "SELECT * FROM users WHERE email = ?;"
  database.query(query, [email], async (err, users) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (!users.length) return next(createHttpError(404, "❌️ User Not Found"))

    try {
      const user = users[0]
      const isValidOldPassword = await bcrypt.compare(oldPassword, user.password)

      if (!isValidOldPassword) return next(createHttpError(401, "❌️ Invalid Old Password"))
      if (oldPassword === newPassword)
        return next(createHttpError(406, "❌️ New Password can not be the Old Password!"))

      const encryptedNewPassword = await bcrypt.hash(newPassword, 8)
      const updateQuery = "UPDATE users SET password = ? WHERE email = ?;"
      database.query(updateQuery, [encryptedNewPassword, email], (err) => {
        if (err) return next(createHttpError(500, "❌️ Internal Server Error"))
        res.status(200).json({ success: true, message: "✅️ Password Updated Successfully" })
      })
    } catch (err) {
      next(createHttpError(500, "❌️ Internal Server Error"))
    }
  })
}


export const deleteUser = (req, res, next) => {
  const id = req?.params?.id
  if (!id) return next(createHttpError(404, "❌️ User Not Found!"))

  const query = "DELETE FROM users WHERE id = ?;"
  database.query(query, [id], (err, results) => {
    if (err) return next(createHttpError(500, "❌️ Internal Server Error"))

    if (results.affectedRows == 0) return next(createHttpError(404, "❌️ User Not Found!"))

    res.status(200).json({ success: true, message: "✅️ User Deleted Successfully" })
  })
}

