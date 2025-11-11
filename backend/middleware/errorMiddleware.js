import { sendError } from "../utils/apiResponse.js";

export const notFound = (req, res, next) => {
  return sendError(res, `Not Found - ${req.originalUrl}`, 404);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  return sendError(
    res,
    err.message || "Server error",
    statusCode,
    { stack: err.stack }
  );
};
