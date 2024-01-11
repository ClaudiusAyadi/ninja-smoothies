const User = require('../models/User');
const { signupErrors } = require('./authErrors');

exports.signup_get = (req, res) => {
	res.render('signup');
};

exports.login_get = (req, res) => {
	res.render('login');
};

exports.signup_post = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.create({ email, password });

		res.status(201).json(user);
	} catch (err) {
		const errors = signupErrors(err);
		res.status(400).json({ errors });
	}
};

exports.login_post = async (req, res) => {
	res.status(200).json({
		status: 'success',
		message: 'Login successful',
	});
};
