const Pledge = require("../models/pledge");
const User = require("../models/user");

const createPledge = async (req, res) => {
  let { title, detail, amount, dateDue, location, repeat, priority, link } =
    req.body;

  const userId = req._id;

  if (isEmpty(title) || title.length > 47) {
    return res.status(400).json({
      msg: "Title is required and should contain less than 48 characters",
    });
  }

  if (!isEmpty(detail) && detail.length > 108) {
    return res.status(400).json({
      msg: "Title is required and should contain less than 109 characters",
    });
  }

  let parsedAmount = parseFloat(amount);
  if (
    isEmpty(amount) ||
    isNaN(parsedAmount) ||
    parsedAmount > 5 ||
    parsedAmount < 0
  ) {
    return res.status(400).json({ msg: "The amount is invalid" });
  }
  amount = parsedAmount;

  if (typeof location !== "object") {
    try {
      location = JSON.parse(location);
    } catch (e) {}
  }

  if (
    isEmpty(location) ||
    isEmpty(location.name) ||
    isEmpty(location.type) ||
    location.type != "Point" ||
    isEmpty(location.coordinates) ||
    location.coordinates.length != 2
  ) {
    return res.status(400).json({ msg: "The location is not valid" });
  }

  let parsedPriority = parseInt(priority);
  if (
    isEmpty(priority) ||
    isNaN(parsedPriority) ||
    parsedPriority < 0 ||
    parsedPriority > 2
  ) {
    return res.status(400).json({
      msg: "The priority should be one of three options(high, medium, low)",
    });
  }

  if (isEmpty(dateDue)) {
    return res.status(400).json({
      msg: "The date or time is invalid",
    });
  }
  dateDue = dateDue.toString();
  // dd-mm-yyyy,hh:mm:ss
  let dateAndTime = dateDue.split(",");
  if (dateAndTime.length != 2) {
    return res.status(400).json({
      msg: "The date or time is invalid",
    });
  }
  let date = dateAndTime[0].split("-");
  if (date.length != 3) {
    return res.status(400).json({
      msg: "The date is invalid",
    });
  }
  let time = dateAndTime[1].split(":");
  if (time.length != 3) {
    return res.status(400).json({
      msg: "The time is invalid",
    });
  }
  for (let i = 0; i < 3; i++) {
    date[i] = parseInt(date[i]);
    if (isNaN(date[i])) {
      return res.status(400).json({
        msg: "The date is invalid",
      });
    }
  }

  for (let i = 0; i < 3; i++) {
    time[i] = parseInt(time[i]);
    if (isNaN(time[i])) {
      return res.status(400).json({
        msg: "The time is invalid",
      });
    }
  }

  if (
    date[0] < 1 ||
    date[0] > 31 ||
    date[1] < 1 ||
    date[1] > 12 ||
    date[2] < 1
  ) {
    return res.status(400).json({
      msg: "The date is invalid",
    });
  }

  if (
    time[0] < 0 ||
    time[0] > 23 ||
    time[1] < 0 ||
    time[1] > 59 ||
    time[2] < 0 ||
    time[2] > 59
  ) {
    return res.status(400).json({
      msg: "The time is invalid",
    });
  }

  dateDue = Date.UTC(
    date[2].toString().padStart(4, "0"),
    date[1].toString().padStart(2, "0"),
    date[0].toString().padStart(2, "0"),
    time[0].toString().padStart(2, "0"),
    time[1].toString().padStart(2, "0")
  );

  if (dateDue <= new Date().getUTCDate()) {
    return res.status(400).json({
      msg: "The date or time is invalid",
    });
  }

  const pledge = new Pledge({
    user: userId,
    title,
    detail, // ?
    amount,
    dateDue,
    location,
    repeat, // ?
    priority,
    link, // ?
    dateCreated: new Date(),
    dateUpdated: new Date(),
    completed: false,
    success: false,
  });

  pledge
    .save()
    .then((added) => {
      return res.status(200).json({ pledge: added });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
};

const getPledges = async (req, res) => {
  const userId = req._id;
  Pledge.find({ user: userId })
    .then((pledges) => {
      if (isEmpty(pledges)) {
        return res
          .status(404)
          .json({ msg: "There are no pledges", pledges: [] });
      }
      return res.status(200).json({ pledges });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
};

const editPledge = async (req, res) => {
  const { id } = req.params;
  // const updatedPledge = req.body;
  const { title, detail, link, priority } = req.body;
  // title, detail, link, priority

  // validate
  if (!isEmpty(title) && title.length > 47) {
    return res
      .status(400)
      .json({ msg: "Title should contain less than 48 characters" });
  }
  if (!isEmpty(detail) && detail.length > 108) {
    return res
      .status(400)
      .json({ msg: "Title should contain less than 109 characters" });
  }
  let parsedPriority = parseInt(priority);
  if (
    !isEmpty(priority) &&
    (isNaN(parsedPriority) || parsedPriority < 0 || parsedPriority > 2)
  ) {
    return res.status(400).json({
      msg: "The priority should be one of three options(high, medium, low)",
    });
  }

  Pledge.findOne({ _id: id })
    .then((pledgeToUpdate) => {
      if (pledgeToUpdate.user.toString() != req._id) {
        return res.status(400).json({ msg: "Access Denied" });
      }
      let newTitle = pledgeToUpdate.title;
      if (!isEmpty(title)) {
        newTitle = title;
      }
      let newDetail = pledgeToUpdate.detail;
      if (!isEmpty(detail)) {
        newDetail = detail;
      }
      let newLink = pledgeToUpdate.link;
      if (!isEmpty(link)) {
        newLink = link;
      }
      let newPriority = pledgeToUpdate.priority;
      if (!isEmpty(priority)) {
        newPriority = priority;
      }
      pledgeToUpdate._doc = {
        ...pledgeToUpdate._doc,
        title: newTitle,
        detail: newDetail,
        link: newLink,
        priority: newPriority,
        dateUpdated: new Date(),
      };

      pledgeToUpdate.markModified("title");
      pledgeToUpdate.markModified("detail");
      pledgeToUpdate.markModified("link");
      pledgeToUpdate.markModified("priority");
      pledgeToUpdate.markModified("dateUpdated");

      pledgeToUpdate
        .save()
        .then((newOne) => {
          return res.status(200).json({ pledge: newOne });
        })
        .catch((err) => {
          return res.status(400).json({
            msg: err,
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        msg: err,
      });
    });
};

const deletePledge = async (req, res) => {
  const { id } = req.params;

  Pledge.findById(id)
    .then((pledgeToDelete) => {
      if (isEmpty(pledgeToDelete)) {
        return res.status(404).json({
          msg: "No pledge found",
        });
      }
      if (pledgeToDelete.user.toString() != req._id) {
        return res.status(400).json({ msg: "Access Denied" });
      }

      pledgeToDelete
        .deleteOne()
        .then((deleted) => {
          return res.status(200).json({
            pledge: pledgeToDelete,
            msg: "deleted successfully",
          });
        })
        .catch((err) => {
          return res.status(400).json({
            msg: err,
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        msg: err,
      });
    });
};

const checkPledges = async (req, res) => {
  //MongoDB supports geospatial queries.
  //You can use $geoNear, $near, or $nearSphere operators to find documents within a certain distance
  //from a point.
  //Find these documents, update them to be completed, if time due is valid

  //30 minutes before, 5 minutes after is valid

  const { coordinates } = req.body;
  let currentDate = new Date();
  let fiveMinutesAgo = new Date(currentDate);
  fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

  let thirtyMinutesLater = new Date(currentDate);
  thirtyMinutesLater.setMinutes(thirtyMinutesLater.getMinutes() + 30);

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
    dateDue: { $gte: thirtyMinutesLater },
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates, // [longitude, latitude]
        },
        $maxDistance: 500, // distance in meters
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

  res.status(200).json({ msg: "updated pledges" });
};

module.exports = {
  createPledge,
  getPledges,
  editPledge,
  deletePledge,
  checkPledges,
};
