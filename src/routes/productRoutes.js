import { Router } from "express"

import { authenticateToken, checkAdmin } from "../middleware/index.js"

import { addProductValidation, updateProductValidation } from "../validation/productValidation.js"

import { getAllProducts, addProduct, updateProduct } from "../controllers/productControllers.js"

const router = Router()

router.get("/all", authenticateToken, checkAdmin, getAllProducts)

router.post("/add", authenticateToken, checkAdmin, addProductValidation, addProduct)

router.patch("/update", authenticateToken, checkAdmin, updateProductValidation, updateProduct)

export default router
