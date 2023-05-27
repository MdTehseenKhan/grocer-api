// NPM Packages
import express from "express"
import createHttpError from "http-errors"
import cookieParser from "cookie-parser"
import cors from "cors"

// Middlewares Files
import { errorHandler } from "./middleware/index.js"

// Routes Files
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"

// Constants and Database
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
app.use(cors({ origin: "*", credentials: true }))

// app.use("/uploads", express.static("../uploads"))

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to grocer api!",
  })
})
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
