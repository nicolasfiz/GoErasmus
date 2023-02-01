import config from '../config';
const nodemailer = require('nodemailer');

export const sendEmailToUser = (userEmail, subject, message, recover) => {
  
  // Generating the transport object
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.email_pass
    }
  });

  // Creating the object with the email options
  const mailOptions = {
    from: `GoErasmus <${config.email}>`,
    to: userEmail,
    subject,
    text: message
  };

  //Sending the email to the user
  transporter.sendMail(mailOptions, function(error, info){
    if (recover)
    {
      if (error)
        return res.status(500).json({ message: error });
      else
        return res.json({ message: 'Email enviado: ' + info.response });
    }
  });
}

export const methods = {
  sendEmailToUser
};