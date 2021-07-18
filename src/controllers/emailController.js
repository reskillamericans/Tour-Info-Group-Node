const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	port: process.env.MAIL_PORT,
	host: process.env.MAIL_HOST,
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD
	},
	secure: true
});


exports.sendMail = (req, res) => {
	
	const mailData = {
		from: process.env.SENDER_ADDRESS,
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.text
	};

	transporter.sendMail(mailData, (error, info) => {
		if (error) {
			return console.log(error);
		}
		res.status(200).send({ message: "Mail sent", message_id: info.messageId });
	});
}