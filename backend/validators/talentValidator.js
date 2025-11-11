import Joi from "joi";

export const createTalentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required"
  }),

  email: Joi.string().trim().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required"
  }),

  skills: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim().min(1)),
    Joi.string().trim()
  ).optional(),

  experience: Joi.number().min(0).optional().messages({
    "number.base": "Experience must be a number",
    "number.min": "Experience cannot be negative"
  })
});
