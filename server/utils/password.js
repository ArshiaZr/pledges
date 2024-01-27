const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Keys
const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
const pathToPubKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
function validatePassword(password, hash, salt) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
function genPassword(password) {
  var salt = crypto.randomBytes(32).toString("hex");
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "1d";

  let payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}

/**
 * @param {*} token - The jwt issued token
 * @param {*} rules - The given rules(first element of each elements of rules array in the given should be eqaul to the second element)
 */
function validateToken(token, rules) {
  const tokenParts = token.toString().trim().split(" ");

  if (
    !(
      tokenParts.length == 2 &&
      tokenParts[0] === "Bearer" &&
      tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
    )
  ) {
    return false;
  }
  try {
    const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
      algorithms: ["RS256"],
    });
    for (let i = 0; i < rules.length; i++) {
      if (
        !verification[rules[i][0]] &&
        verification[rules[i][0]] !== rules[i][1]
      ) {
        return false;
      }
    }
  } catch (err) {
    return false;
  }

  return true;
}

module.exports = {
  createPledge,
  getPledges,
  editPledge,
  deletePledge,
};
