import Joi from "joi"
import validator from "./utils/index.js"

const productSchema = {
  addProduct: Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.number(),
    description: Joi.string(),
    price: Joi.number().required(),
    active: Joi.boolean().default("true"),
  }),
  updateProduct: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  }),
}

export const addProductValidation = (req, res, next) => validator(productSchema.addProduct, req.body, next)
export const updateProductValidation = (req, res, next) => validator(productSchema.updateProduct, req.body, next)
