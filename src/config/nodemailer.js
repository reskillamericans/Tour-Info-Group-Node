const nodemailer = require('nodemailer');
const emailPass = process.env.EMAIL_PASS;

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'rickmaya@gmail.com',
		pass: emailPass
	}
});

module.exports={
	sendAuth: function(link, email) {
		const mailOptions = {
			from: 'rickmaya@gmail.com',
			to: email,
			subject: 'TEST EMAIL',
			html: `<a href='` +link+ `'>link</a>`
		};
		trasporter.sendMail(mailOptions, function (err, info) {
			if (err) {
				console.log(err);
			} else {
				console.log(info);
			}
		});
	}
}
