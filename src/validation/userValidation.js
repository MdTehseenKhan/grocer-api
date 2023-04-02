import Joi from "joi"
import validator from "./utils/index.js"

const userSchema = {
  signupUser: Joi.object({
    name: Joi.string().not("admin").required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  //
  signinUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
  //
  changePassword: Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
}

export const signupUserValidation = (req, res, next) => validator(userSchema.signupUser, req.body, next)
export const signinUserValidation = (req, res, next) => validator(userSchema.signinUser, req.body, next)
export const changePasswordValidation = (req, res, next) => validator(userSchema.changePassword, req.body, next)
