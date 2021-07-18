const User = require('../models/user');
const { sendEmail } = require('./emailController');

// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
	const users = await User.find({});
	res.status(200).json({users});
}

// @route POST api/user
// @desc Add a new user
// @access Public
exports.store = async (req, res) => {
	try {
		const { email } = req.body;

		// Make sure this account doesn't already exist
		const user = await User.findOne({email});
		if (user) return res.status(401).json({message: 'The email address you have entered is already associated with another account. You can change this users role instead.'});

		// generate a random password
		const password = '_' + Math.random().toString(36).substr(2, 9); 
		const newUser = new User({...req.body, password});

		const user_ = await newUser.save();

		// Generate and set password reset token
		user_.generatePasswordReset();

		// Save the updated user object
		await user_.save();
		console.log('This is the user object -> ' + user_);

		// Get mail options
		let domain = "http://" + req.headers.host;
		let subject = "New Account Created";
		let to = user.email;
		let from = process.env.SENDER_ADDRESS;
		let link = "http://" + req.headers.host + "/auth/reset/" + user.resetPasswordToken;
		let html = `<p>Hi ${user.username}<p><br><p>A new account has been created for you on ${domain}. Please click on the following <a href="${link}">link</a> to set your password and login.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`

		await sendEmail({to, from, subject});

		res.status(200).json({message: 'An email has been sent to ' + user.email + '.'});
	} catch (error) {
		console.log('this is the user error ' + error);
		res.status(500).json({success: false, message: error.message})
	}
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
	try {
		const id = req.params.id;
		const user = await User.findById(id);

		if (!user) return res.status(401).json({message: 'User does not exist'});

		res.status(200).json({user});
	} catch (error) {
		res.status(500).json({message: error.message})
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
		if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to update this data."});

		const user = await User.findByIdAndUpdate(id, {$set: update}, {new: true});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
};

// @route DESTROY api/user/{id}
// @desc Delete User
// @access Public
exports.destroy = async function (req, res) {
	try {
		const id = req.params.id;
		const user_id = req.user.id;

		// Make sure the passed id is that of the logged in user
		if (user_id.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to delete this data."});

		await User.findByIdAndDelete(id);
		res.status(200).json({message: 'User has been deleted'});
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}