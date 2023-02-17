const { UnauthenticatedError, UnauthorizedError } = require("../utils/errors");
const jwt = require("jsonwebtoken");

exports.isAuthenticated = async (req, res, next) => {
  let token;

  // Grab the Authorization header
  const authHeader = req.headers.authorization;

  // Check it contains JWT token and extract the token
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // If no token, then throw UnauthenticatedError
  if (!token) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  try {
    // Get the token payload (contents); user info
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Place the token info on the request object (create a new "user" field)
    req.user = {
      // @ts-ignore
      userId: payload.userId,
      // @ts-ignore
      role: payload.role,
      // @ts-ignore
      username: payload.username,
    };

    // Go to next step (controller || middleware)
    next();
  } catch (error) {
    // If token not valid (or something else goes wrong) authentication = invalid
    throw new UnauthenticatedError("Authentication invalid");
  }
};

// NOTE: Must be placed AFTER isAuthenticated middleware
// NOTE: Should always be placed AFTER isAuthenticated middleware
exports.authorizeRoles = (...roles) => {
  // Return proper middleware function
  return (req, res, next) => {
    // Check that user has needed role. // Check that user has a role && it includes the desired role(s)
    if (!req.user?.role || !roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized Access");
    }
    next();
  };
};

/* ----------------------------------------------------- */

//req.user får vi från vår authentication middleware,
//viktigt därför att authentication sker före authorization.
