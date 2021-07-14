// const express = require('express');
// // const router = express.Router();
// const nodemailer = require('nodemailer');
// const app = express();

// const transporter = nodemailer.createTransport({
// 	port: 465,
// 	host: "smtp.gmail.email",
// 	auth: {
// 		user: 'rickmayatest@gmail.com',
// 		pass: 'ChappedLips!234',
// 	},
// 	secure: true
// });

// app.post('/text-mail', (req, res) => {
// 	const {to, subject, text} = req.body;
// 	const msg = {
// 		from: 'rickmayatest@gmail.com',
// 		to: 'rickmaya@gmail.com',
// 		subject: 'Sending Email using Node.js',
// 		text: 'That was easy!'
// 	};

// 	transporter.sendMail(msg, (err, info) => {
// 		if (err){
// 			return console.log(err);
// 		}
// 		res.status(200).send({ message: "Mail sent", message_id: info.messageId });
// 	});
// });

