import dotenv from "dotenv"
import nodemailer from "nodemailer"
dotenv.config()

// Constants
export const PORT = process.env.PORT
export const JWT_KEY = process.env.JWT_KEY

export const DB_HOST = process.env.DB_HOST
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_NAME = process.env.DB_NAME

// Nodemailer
export const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL
// let testAccount = await nodemailer.createTestAccount()

export let transporter = nodemailer.createTransport({
  // host: "gmail",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD, // Me nahi bataonga
  },
})
