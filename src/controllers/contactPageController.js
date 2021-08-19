exports.renderContactUs = async (req, res) => {
    
    return res.status(200).render('contact')

}
//Flash notification confirming sent email
// req.flash(
//     "Email(s) sent",
//     "Thank you for contacting the Touryst team!"
//   );



//   ?what about this ??????
// app.get('/flash', function(req, res){
//     // Set a flash message by passing the key, followed by the value, to req.flash().
//     req.flash('info', 'Flash is back!')
//     res.redirect('/');
//   });
   
//   app.get('/', function(req, res){
//     // Get an array of flash messages by passing the key to req.flash()
//     res.render('index', { messages: req.flash('info') });
//   });