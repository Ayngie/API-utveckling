const { ValidationError } = require("../utils/errors");

exports.errorMiddleware = (error, req, res, next) => {
  let customError = {
    statusCode: error.statusCode || 500,
    message: error.message || "Something went wrong try again later",
  };

  if (process.env.NODE_ENV === "development") {
    console.error(error);

    customError.message = error.message || "No error message...";
    customError.error = error;
  }

  if (error instanceof ValidationError)
    customError.validatonErrors = error.validationErrors;

  if (error.name === "ValidationError") {
    customError.validatonErrors = Object.values(error.errors).map(
      (item) => item.message
    );
    customError.statusCode = 400;
  }

  // Reformats Mongoose error when a duplicate value is entered for a...
  // ...field that has the "unique: true" validation
  // prettier-ignore
  if (error.code && error.code === 11000) { //mongoose slänger en error på 11000 om man försöker skapa duplikatvärde?
    customError.message = `Duplicate value entered for ${Object.keys(
      error.keyValue
    )} field, please choose another value`
    customError.statusCode = 400 //vi ändrar statuskoden till 400, så vi ej anv mongoose errormeddelande på 11000 //ser bättre ut o vi döljer för ev. anv som vill hacka vad som gick fel.
  }

  if (error.name === "CastError") {
    customError.message = `No item found with id : ${error.value}`;
    customError.statusCode = 404;
  }

  return res.status(customError.statusCode).json(customError);
};
