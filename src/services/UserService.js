const { User } = require("../models/mongoose");

const create = async (document) => {
  return await new User(document).save();
};

const read = async (id) => {
  return await User.findById(id);
};

const update = async (id, document) => {
  const user = await User.findById(id);
  user.set({ ...user.toObject(), ...document, updatedAt: Date.now() });
  await user.save();
  return user;
};

const findOne = async (email) => {
    return await User.findOne(email);
  };

const remove = async (id) => {
  const result = await User.findByIdAndDelete(id);
  return result !== null;
};

module.exports = {
  create,
  read,
  findOne,
  update,
  remove,
};
