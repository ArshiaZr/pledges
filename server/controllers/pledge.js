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
  //Find these documents, update them to be completed, if time due is valid

  //20 minutes before, 5 minutes after is valid

  const { userLocation } = req.body;
  const currentDate = new Date();
  const fiveMinutesAgo = new Date(currentDate.getTime() - 5 * 60 * 1000);
  const thirtyMinutesLater = new Date(currentDate.getTime() + 30 * 60 * 1000);

  const userId = req._id;
  const user = await User.findById(userId);
  //any pledge that was due fiveMinutes ago and not completed
  //must be set to false success
  await Pledge.updateMany(
    { user: userId, completed: false, dateDue: { $lte: fiveMinutesAgo } },
    { completed: true, success: false }
  );

  //collect any pledge that is nearby
  const pledges = await Pledge.find({
    user: userId,
    completed: false,
    dateDue: { $lte: thirtyMinutesLater },
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: userLocation, // [longitude, latitude]
        },
        $maxDistance: 50, // distance in meters
      },
    },
  });

  let total = 0;
  for (let pledge of pledges) {
    pledge.success = true;
    pledge.completed = true;
    total += pledge.amount;
    // Save the updated user and pledge
    await pledge.save();
  }
  user.balance += total;
  await user.save();

  res.status(200).json("updated pledges");
};

module.exports = {
  createPledge,
  getPledges,
  editPledge,
  deletePledge,
  checkPledges,
};
