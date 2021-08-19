exports.renderEmailConfirmation = async (req, res) => {
    
    req.flash(
        "Email(s) sent",
        "Thank you for contacting the Touryst team!"
      );

    return res.status(200).render('emailConfirmation')

}
//Flash notification confirming sent email
