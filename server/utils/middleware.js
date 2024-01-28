const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  console.log("errorHandler called");
  console.error(error.message);
  console.log(error);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.me === "User not found") {
    return response.status(404).end();
  }

  next(error);
};

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = {
  errorHandler,
  unkownEndpoint,
};
