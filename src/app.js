import express from "express"
// import passport from "passport"
import createHttpError from "http-errors"
import cookieParser from "cookie-parser"
import cors from "cors"

// Middlewares
// import usePassport from "./middleware/passport.js"
import { errorHandler } from "./middleware/index.js"

// Routes
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

import { PORT } from "./config/index.js"
import "./database.js"

// ===========================================================================================
// ===========================================================================================

const app = express()

// JSON and Cookie Parser
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// CORS
app.use(cors({ origin: "*" }))

// Passport
// app.use(passport.initialize())
// usePassport(passport)

// App Routes
app.use("/user", userRoutes)
app.use("/category", categoryRoutes)
app.use("/product", productRoutes)

// Error Handling
app.use(() => {
  throw createHttpError(404, "Route not found")
})
app.use(errorHandler)

app.listen(PORT || 8080, () => console.log(`🚀️ Running Server at http://localhost:${PORT}/`))
