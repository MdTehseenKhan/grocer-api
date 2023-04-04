import { Router } from "express"

import { authenticateToken, checkAdmin, upload } from "../middleware/index.js"

import { addProductValidation, updateProductValidation } from "../validation/productValidation.js"

import { getAllProducts, addProduct, updateProduct, deleteProduct } from "../controllers/productControllers.js"

const router = Router()

router.get("/all", authenticateToken, getAllProducts)

router.post("/add", authenticateToken, checkAdmin, addProductValidation, upload.single("image"), addProduct)

router.patch(
  "/update/:id",
  authenticateToken,
  checkAdmin,
  updateProductValidation,
  upload.single("image"),
  updateProduct
)

router.delete("/delete/:id", authenticateToken, checkAdmin, deleteProduct)

export default router
