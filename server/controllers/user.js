const User = require("../models/user");

const path = require("path");

// Utils
const isEmpty = require(path.join(__dirname, "../utils/isEmpty.js"));
const { genPassword, validatePassword, issueJWT } = require(path.join(
  __dirname,
  "../utils/password.js"
));

const registerUser = async (req, res) => {
  let { username, password } = req.body;

  if (isEmpty(username)) {
    return res.status(400).json({ msg: "Username is required" });
  }
  if (isEmpty(password)) {
    return res.status(400).json({ msg: "Password is required" });
  }

  username = username.toLowerCase();
  User.findOne({ username: username }).then((user) => {
    if (!isEmpty(user)) {
      return res.status(404).json({ msg: "Account already exists" });
    }
    const saltHash = genPassword(password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
      username: username,
      hash: hash,
      salt: salt,
    });

    try {
      newUser.save().then((user) => {
        return res.status(200).json({ msg: "User created successfully", user });
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (isEmpty(username)) {
    return res.status(400).json({ msg: "Username is required" });
  }
  if (isEmpty(password)) {
    return res.status(400).json({ msg: "Password is required" });
  }

  User.findOne({ username: username.toString().toLowerCase() })
    .then((user) => {
      if (isEmpty(user)) {
        return res.status(401).json({ msg: "Authentication failed" });
      }

      const isValid = validatePassword(password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = issueJWT(user);

        return res.status(200).json({
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
          user: {
            username: user.username,
            _id: user._id,
          },
        });
      } else {
        return res.status(400).json({ msg: "Wrong username/password" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ error: err });
    });
};

module.exports = {
  registerUser,
  loginUser,
};
