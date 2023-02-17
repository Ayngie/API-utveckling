const { body } = require("express-validator");

exports.registerSchema = [
  body("email").isEmail().withMessage("You must provide a valid email address"),
  body("password")
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    /* .custom((password) => {
			return true
		}) */
    .withMessage("Your desired password must be at least 6 characters long"),

  // .withMessage(
  //   "You must provide a password that is at least 6 characters long"
  // ),
  body("username")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 50 })
    .withMessage(
      "Your desired username must be between 3 and 50 characters long"
    ),
  // .withMessage(
  //   "You must provide a username that is at least 3 characters long"
  // ),
];

exports.loginSchema = [
  body("email").isEmail().withMessage("You must provide a valid email address"),
  body("password").not().isEmpty().withMessage("You must provide a password"),
];

/* ----------------------------------------------------- */

//validering för att anv ska få veta om ngt gick fel o för att siten ska funka.
//anv får info först - så de vet om de gjort fel (innan de kontaktar databasen).

//anv express för validering - lagt detta i auth routes också.

//Detta är 80% kopierat från express validation dokumentation...
//
