const express = require("express");

const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).send({ status, message });
};

module.exports = { errorHandler };
