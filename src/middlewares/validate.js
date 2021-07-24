const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
	const errors = validationResult(req);
	// check if express-validator middleware returns an error
	if (!errors.isEmpty()) {
		// If so, recreate the error object using the param and msg keys and return error
		let error = {}; errors.array().map((err) => error[err.param] = err.msg);
		return res.status(422).json({error});
	}

	next();
};