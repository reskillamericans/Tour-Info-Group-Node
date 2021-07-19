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


exports.sendMail = (mailOptions={}) => {
	
	const mailData = {
		from: process.env.SENDER_ADDRESS,
		to: mailOptions.to,
		subject: mailOptions.subject,
		html: mailOptions.html
	};

	transporter.sendMail(mailData, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log({ message: "Mail sent", message_id: info.messageId });
	});
}