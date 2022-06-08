require("dotenv").config();
const jwtMiddleware = require("express-jwt");
const express = require("express");
const jwtSecret = process.env.JWT_SECRET;
const UserService = require("../services/UserService");
var bcrypt = require('bcryptjs');

const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  await UserService.findOne({ email })
    .then(async (user) => {
      if (!user)
        return res
          .status(400)
          .json({ error: { email: "This email is not registered" } });

      //valida password
      const correctPassword = await user.comparePassword(password);
      if (!correctPassword)
        return res.status(400).json({ error: { password: "Wrong password" } });

      // Login realizado, generamos token y lo mandamos
      res.status(200).json({
        token: user.generateJWT(),
        user: {
          id: user._id,
          name: user.name,
          surname: user.surname,
          email: user.email,
        },
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

authRouter.post("/register", async (req, res) => {
  // Comprobamos si el usuario existe
  await UserService.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res
          .status(400)
          .json({ error: { email: "This email is already registered." } });

      // Creamos y mandamos el resultado
      const salt = bcrypt.genSaltSync(10);
      UserService.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, salt)
      })
        .then((user) => {
          res.status(200).json({
            token: user.generateJWT(),
            user: {
              id: user._id,
              name: user.name,
              surname: user.surname,
              email: user.email,
            },
          });
        })
        .catch((err) => res.status(500).json({ message: err.message }));
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: err.message })
    );
});

const configSecurity = (app) => {
  app.use(
    "/",
    jwtMiddleware({ secret: jwtSecret, algorithms: ["HS256"] }).unless({
      path: ["/login", "/register"],
    })
  );
};

module.exports = {
  authRouter,
  configSecurity,
};
