import Joi from "joi"
import validator from "./utils/index.js"

const productSchema = {
  addProduct: Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    description: Joi.string(),
    price: Joi.number().required(),
    categoryId: Joi.number(),
    active: Joi.boolean(),
  }),
  //
  updateProduct: Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    description: Joi.string().optional(),
    price: Joi.number().required(),
    categoryId: Joi.number(),
    active: Joi.boolean(),
  }),
}

export const addProductValidation = (req, res, next) => validator(productSchema.addProduct, req.body, next)
export const updateProductValidation = (req, res, next) => validator(productSchema.updateProduct, req.body, next)
