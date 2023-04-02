import { Router } from "express"

import { authenticateToken, checkAdmin } from "../middleware/index.js"

import { addCategoryValidation, updateCategoryValidation } from "../validation/categoryValidation.js"

import { getAllCategories, addCategory, updateCategory } from "../controllers/categoryControllers.js"

const router = Router()

router.get("/all", authenticateToken, checkAdmin, getAllCategories)

router.post("/add", authenticateToken, checkAdmin, addCategoryValidation, addCategory)

router.patch("/update", authenticateToken, checkAdmin, updateCategoryValidation, updateCategory)

export default router
