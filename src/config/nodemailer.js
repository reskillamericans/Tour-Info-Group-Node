const nodemailer = require('nodemailer');
const emailPass = process.env.EMAIL_PASS;
const port = process.env.PORT;

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

// 	service: 'gmail',
// 	auth: {
// 		user: 'rickmaya@gmail.com',
// 		pass: emailPass
// 	}
// });

// module.exports={
// 	sendAuth: function(link, email) {
// 		const mailOptions = {
// 			from: 'rickmaya@gmail.com',
// 			to: email,
// 			subject: 'TEST EMAIL',
// 			html: `<a href='` +link+ `'>link</a>`
// 		};
// 		trasporter.sendMail(mailOptions, function (err, info) {
// 			if (err) {
// 				console.log(err);
// 			} else {
// 				console.log(info);
// 			}
// 		});
// 	}
// }
