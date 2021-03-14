export const errorHandler = (lambdaName) => {
  return {
    onError: (handler, next) => {
      if (!handler.error.statusCode || !handler.error.message) {
        return next(handler.error);
      }

      console.error("[Lambda]", `(${lambdaName})`, handler.error.message);

      handler.response = {
        statusCode: handler.error.statusCode,
        body: JSON.stringify(handler.error.message),
      };

      return next();
    },
  };
};
