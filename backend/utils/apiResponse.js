
export const success = (res, data = {}, message = 'Success', status = 200) => {
  return res.status(status).json({
    success: true,
    status,
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};


export const sendError = (res, message = 'Something went wrong', status = 500, errors = null) => {
  return res.status(status).json({
    success: false,
    status,
    message,
    errors,
    timestamp: new Date().toISOString(),
  });
};

