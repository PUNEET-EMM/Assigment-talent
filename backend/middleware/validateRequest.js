import { sendError } from "../utils/apiResponse.js";

const validateRequest = schema => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,   
    stripUnknown: true   
  });

  if (error) {
    const errors = error.details.map(detail => ({
      field: detail.path.join("."),
      message: detail.message
    }));

    return sendError(res, "Validation error", 400, errors);
  }

  req.body = value;
  next();
};

export default validateRequest;
