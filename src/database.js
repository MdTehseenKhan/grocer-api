import { createConnection } from "mysql"
import createHttpError from "http-errors"
const { InternalServerError } = createHttpError

import { DB_PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "./config/index.js"

const connection = createConnection({
  port: DB_PORT,
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

connection.connect((err) => {
  if (err) {
    console.error({ success: false, message: err.message })
    return
    // throw createHttpError(501, "Unable to connect to database")
  }

  console.log("✅️ Successfully Connected to Database")
})

export default connection
