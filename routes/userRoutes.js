import { Router } from "express"

import { authenticateToken, checkAdmin } from "../middleware/index.js"

import { signupUserValidation, signinUserValidation, changePasswordValidation } from "../validation/userValidation.js"

import {
  getAllUsers,
  signupUser,
  signinUser,
  forgotPassword,
  changePassword,
  deleteUser,
} from "../controllers/userControllers.js"

const router = Router()

// router.get("/all", authenticateToken, checkAdmin, getAllUsers)

// router.post("/signup", signupUserValidation, signupUser)
// router.post("/signin", signinUserValidation, signinUser)

// router.post("/forgot-password", forgotPassword)
// router.patch("/change-password", authenticateToken, changePasswordValidation, changePassword)

// router.delete("/delete/:id", authenticateToken, checkAdmin, deleteUser)
// router.get("/all", authenticateToken, checkAdmin, getAllUsers)

router.post("/signup", signupUserValidation, signupUser)
router.post("/signin", signinUserValidation, signinUser)

router.post("/forgot-password", forgotPassword)
router.patch("/change-password", changePasswordValidation, changePassword)

router.delete("/delete/:id", deleteUser)

export default router
