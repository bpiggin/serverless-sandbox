export const buildResponse = () => {
  return {
    after: (handler, next) => {
      if (handler.error.message) {
        return next();
      }
      handler.response = {
        statusCode: 200,
        body: JSON.stringify(handler.response),
        headers: {
          "content-type": "application/json",
        },
      };
      return next();
    },
  };
};
