const path = require("path");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");

// Utils
const isEmpty = require(path.join(__dirname, "./isEmpty.js"));

// Keys
const pathToPubKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

/**
 * This is an authentication middleware function
 */
function authMiddleware(req, res, next) {
  if (isEmpty(req.headers.authorization)) {
    return res.status(401).json({ msg: "Access denied" });
  }
  const tokenParts = req.headers.authorization.split(" ");
  if (
    tokenParts.length == 2 &&
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: ["RS256"],
      });
      req.jwt = verification;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Access denied" });
    }
  } else {
    return res.status(401).json({ msg: "Access denied" });
  }
}

module.exports = authMiddleware;
