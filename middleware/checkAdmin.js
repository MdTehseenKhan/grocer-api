export default function checkAdmin(req, res, next) {
  if (req.user.role === "admin") return next()
  res.sendStatus(401)
}
