const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const { promisify } = require('util');
const fs = require('fs');

    require.extensions['.html'] = function (module, filename) {
      module.exports = fs.readFileSync(filename, 'utf8');
    };class Mail{

  constructor(email,servico,file){
    this.email = email;
    this.servico = servico;
    this.file = file;
  }

  setup(){ 
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secureConnection: false,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });
    return this;
  }

  async send(){
    
    //let template = handlebars.compile(html);
    var html = fs.createReadStream("src/views/email-processado.html");

    this.transporter.sendMail({
      from: `"Giga Dados" <${process.env.MAIL_USERNAME}>`,
      to: this.email,
      subject: this.servico, 
      html: html,
      attachments: [{
        filename: this.file,
        path: `uploads/${this.file.split('.')[0]}_l.pdf`,
        contentType: 'application/pdf'
      }],
      function(err, info) {
        html.close();
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      }
    }); 
  }

}
module.exports = Mail;
