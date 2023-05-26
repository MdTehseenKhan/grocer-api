import { Router } from "express"

import { authenticateToken, checkAdmin } from "../middleware/index.js"

import { addCategoryValidation, updateCategoryValidation } from "../validation/categoryValidation.js"

import { getAllCategories, addCategory, updateCategory } from "../controllers/categoryControllers.js"

const router = Router()

// router.get("/all", authenticateToken, checkAdmin, getAllCategories)
// router.post("/add", authenticateToken, checkAdmin, addCategoryValidation, addCategory)
// router.patch("/update/:id", authenticateToken, checkAdmin, updateCategoryValidation, updateCategory)

router.get("/all", getAllCategories)
router.post("/add", addCategoryValidation, addCategory)
router.patch("/update/:id", updateCategoryValidation, updateCategory)

export default router
