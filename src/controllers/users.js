const router = require("express").Router();
const UserService = require("../services/UserService");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = await UserService.read(id);
  res.json(user);
});

router.get("/", async (req, res, next) => {
  const user = await UserService.find();
  res.json(user);
});

router.post("/", async (req, res, next) => {
  const document = req.body;
  const user = await UserService.create(document);
  res.status(201).json(user);
});

router.put("/:id", async (req, res, next) => {
  const document = req.body;
  const { id } = req.params;
  const user = await UserService.update(id, document);
  res.json(user);
});

router.patch("/:id", async (req, res, next) => {
  const document = req.body;
  const { id } = req.params;
  const user = await UserService.update(id, document);
  res.json(user);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const deleted = await UserService.remove(id);
  res.json(deleted);
});

module.exports = router;
