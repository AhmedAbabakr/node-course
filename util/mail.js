const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
// const transport = nodemailer.createTransport(sendGridTransport({
//     auth:{
//         api_key:"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"
//     }
// }));
const transport =  nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "26e78bf2c917ee",
      pass: "7810f71e25d426"
    }
  });
module.exports = transport;
