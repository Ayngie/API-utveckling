const { BadRequestError, UnauthenticatedError } = require("../../utils/errors");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const { userRoles } = require("../../constants/users");
const jwt = require("jsonwebtoken");

// const { validationResult } = require('express-validator')

exports.register = async (req, res) => {
  // Placera inskickad data (epost, lösenord, username) i lokala variabler
  // Place desired username, email and password into local variables
  const { username, password, email } = req.body;

  //   // Validate that the needed information was sent in
  //   if (!username || !password || !email) {
  //     throw new BadRequestError(
  //       "You must provide a username, email and password in order to register"
  //     );
  //   }

  // Kryptera lösenordet med bcrypt
  // Encrypt the desired password
  const salt = await bcrypt.genSalt(10);
  const hashedpassword = await bcrypt.hash(password, salt);

  const newUser = {
    username,
    email,
    password: hashedpassword,
  };

  // ADMIN logic: If (firstUser in db) makeAdmin
  // If first user ever make them an admin (for demo purposes)
  const usersInDb = await User.countDocuments();
  if (usersInDb === 0) newUser.role = userRoles.ADMIN;

  // Add the new user to database
  await User.create(newUser);

  // Send response
  return res.status(201).json({
    message: "Registration succeeded. Please log in.",
  });
};

exports.login = async (req, res) => {
  /* const errors = validationResult(req)
	return res.json(errors) */

  // Placera inskickad data (epost, lösenord) i lokala variabler
  // Place candidate email and password into local variables
  const { email, password: canditatePassword } = req.body;

  //   // Validate that the needed information was sent in
  //   if (!email || !canditatePassword) {
  //     throw new BadRequestError(
  //       "You must provide an email and password in order to log in"
  //     );
  //   }

  // Kolla om användarens epost finns
  // Check if user with that email exits in db
  const user = await User.findOne({ email: email });
  if (!user) throw new UnauthenticatedError("Invalid Credentials");

  // Kolla om lösenordet är korrekt
  // Check if password is corrrect
  const isPasswordCorrect = await bcrypt.compare(
    canditatePassword,
    user.password
  );
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid Credentials");

  /* Skapa våran JWT token */
  // Create JWT payload (aka JWT contents)
  const jwtPayload = {
    userId: user._id,
    role: user.role,
    username: user.username,
  };

  // Create the JWT token

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
    expiresIn: /* '1d' */ "2h",
  });
  //1d = 1 day, 2h = 2 hours, 1m = 1 minut, 1s = 1 sek

  //   const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
  //     expiresIn: "1d" /* 2h */,
  //   });

  // Response
  // Return the token
  return res.json({
    token: token,
    user: jwtPayload, //ger frontenden tillgång till användarnamn etc så vi ej beh anv deras token för att ta reda på den info.
  });

  //   return res.json({ token: jwtToken, user: jwtPayload });
};
