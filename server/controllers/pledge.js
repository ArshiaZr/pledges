const Pledge = require("../models/pledge");

const createPledge = async (req, res) => {
  const { title, details, amount, dateDue, location, repeat, priority, link } =
    req.body;
  const userId = req.body._id;

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

module.exports = {
  createPledge,
  getPledges,
  editPledge,
  deletePledge,
};
