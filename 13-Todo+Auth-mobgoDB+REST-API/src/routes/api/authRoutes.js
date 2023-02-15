const express = require("express");
const router = express.Router();
const { login, register } = require("../../controllers/api/authControllers");
const {
  validate,
} = require("../../middleware/validation/validationMiddleware");
const {
  loginSchema,
  registerSchema,
} = require("../../middleware/validation/validationSchemas");

// const { body } = require('express-validator')

// POST /api/v1/auth/register
router.post("/register", validate(registerSchema), register);

// POST /api/v1/auth/login
router.post(
  "/login",
  validate(loginSchema) /* body('password').isLength({ min: 3 }) */,
  login
);

module.exports = router;
