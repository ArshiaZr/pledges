const Pledge = require("../models/pledge");
const User = require("../models/user");

const createPledge = async (req, res) => {
  const {
    title,
    details,
    amount,
    dateDue,
    location,
    /* repeat, */ priority,
    link,
  } = req.body;
  const userId = req.body._id;

  //should handle case in which user does not have enough balance
  const user = await User.findById(userId);
  if (user.balance < amount) {
    res.status(400).json({ error: "Insufficient balance" });
    return;
  }

  const pledge = new Pledge({
    user: userId,
    title,
    details,
    amount,
    dateDue,
    location,
    repeat,
    priority,
    link,
    dateCreated: new Date(),
    dateUpdated: new Date(),
    completed: false,
    success: false,
  });

  //decrement user balance if they have enough
  user.balance -= amount;
  await user.save();
  await pledge.save();
  res.status(200).json(pledge);
};

const getPledges = async (req, res) => {
  const userId = req.body._id;
  const pledges = await Pledge.find({ user: userId });
  res.status(200).json(pledges);
};

const editPledge = async (req, res) => {
  const { id } = req.params;
  const updatedPledge = req.body;
  const pledge = await Pledge.findByIdAndUpdate(id, updatedPledge, {
    new: true,
  });
  res.status(200).json(pledge);
};

const deletePledge = async (req, res) => {
  const { id } = req.params;
  await Pledge.findByIdAndDelete(id);
  res.status(200).json({ message: "Pledge deleted successfully." });
};

const checkPledges = async (req, res) => {
  //MongoDB supports geospatial queries.
  //You can use $geoNear, $near, or $nearSphere operators to find documents within a certain distance
  //from a point.
  //should find these documents, update them to be completed,
  //should also
};

module.exports = {
  createPledge,
  getPledges,
  editPledge,
  deletePledge,
};
