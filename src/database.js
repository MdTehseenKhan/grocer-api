import { createConnection } from "mysql2"
// import createHttpError from "http-errors"

import { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } from "./config/index.js"

const connection = createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
})

connection.connect((err) => {
  if (err) {
    // console.error({ success: false, message: "❌️ Unable to connect to database" })
    // return
    throw createHttpError(501, "Unable to connect to database")
  }

  console.log("✅️ Successfully Connected to Database")
})

export default connection
