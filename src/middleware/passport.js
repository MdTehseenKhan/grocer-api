import { Strategy } from "passport-jwt"

import { JWT_KEY } from "../config/index.js"
import database from "../database.js"

const cookieExtractor = (req) => (req && req.cookies ? req.cookies?.jwt : null)

const optionsCookie = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: JWT_KEY,
}

export default (passport) => {
  passport.use(
    new Strategy(optionsCookie, (payload, done) => {
      const query = "SELECT * FROM users WHERE email = ?"
      database.query(query, [payload.email], (err, user) => {
        if (err) return done(err, false)
        return user ? done(null, user) : done(null, false)
      })
    })
  )
}
