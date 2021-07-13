const nodemailer = require('nodemailer');
const emailPass = process.env.EMAIL_PASS;
const port = process.env.PORT;

exports.sendEmail = (req, res) => {
	const transporter = nodemailer.createTransport({
		port: port, 
		host: "smtp.gmail.com",
		auth: {
			user: 'rickmaya@gmail.com',
			pass: emailPass
		},
		secure: true,
	});

	const mailData = {
	from: 'rickmaya@gmail.com', //sender address
	to: 'rickmaya@gmail.com', //list of receivers 
	subject: 'TEST: Sending Email using Node.js',
	text: 'That was easy!',
	html: '<b>Hey there!</b><br>This is our first message sent with Nodemailer</br>'
};

transporter.sendMail(mailData, function (err, info) {
	if (err)
		console.log(err);
	else
		console.log(info);
});
}

