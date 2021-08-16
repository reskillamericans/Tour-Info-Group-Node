const User = require("../models/user");

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
  const users = await User.find({});
  res.status(200).json({ users });
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    if (!user) return res.status(401).json({ message: "User does not exist" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route PUT api/user/{id}
// @desc Update user details
// @access Public
exports.update = async function (req, res) {
  try {
    const update = req.body;
    const id = req.params.id;
    const userId = req.user._id;

    // Make sure the passed id is that of the logged in user
    if (userId.toString() !== id.toString())
      return res.status(401).json({ message: "Sorry, you don't have the permission to update this data." });

    const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    console.log("profile");
    console.log(req.user);
    const profile = await User.findOne({ _id: req.user.id }).populate({
      path: "bookedTours",
      populate: { path: "tour" },
    });
    res.status(200).render("profile", profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
