import Joi from "joi"
import validator from "./utils/index.js"

const productSchema = {
  addProduct: Joi.object({
    name: Joi.string().required(),
    categoryId: Joi.number().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    status: Joi.string().default("active"),
  }),
  updateProduct: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
  }),
}

export const addProductValidation = (req, res, next) => validator(productSchema.addProduct, req.body, next)
export const updateProductValidation = (req, res, next) => validator(productSchema.updateProduct, req.body, next)
