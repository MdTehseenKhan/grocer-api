import Joi from "joi"
import validator from "./utils/index.js"

const categorySchema = {
  addCategory: Joi.object({
    name: Joi.string().required(),
  }),
  updateCategory: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  }),
}

export const addCategoryValidation = (req, res, next) => validator(categorySchema.addCategory, req.body, next)
export const updateCategoryValidation = (req, res, next) => validator(categorySchema.updateCategory, req.body, next)
