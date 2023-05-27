import jwt from "jsonwebtoken"
import { JWT_KEY } from "../config/index.js"

export default function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]

  const token = authHeader && authHeader.split(" ")[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(401)
    req.user = user
  })
  next()
}
