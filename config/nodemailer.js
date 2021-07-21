
// Nos va ayudar a poder enviar correos electronicos 
const nodemailer = require('nodemailer');
// nos permitir usar nuestra cuenta de google para poder enviar correos 
const googleapis = require('googleapis');

const nodemailerSendgrid = require('nodemailer-sendgrid');

const Oauth2 = googleapis.google.auth.OAuth2; 

const createTrasporter = async() => {

   const oauthClient = new Oauth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
   );
   
   //Fijamos el refresh token para poder obtener los tokens de acceso
   oauthClient.setCredentials({refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

   try {
      // solicitar un token de acceso 
      const accesToken = await oauthClient.getAccessToken();

      // ======== GMAIL ======== //
      const transporterGmail = nodemailer.createTransport({
         service: "gmail",
         auth: {
            type: "OAuth2",
            user: "camilogore99@gmail.com",
            accesToken,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            refreshToken: process.env.GOOGLE_REFRESH_TOKEN
         }
      });

      //====== SENDGRID ====== //
      const transpoterSendgrid = nodemailer.createTransport(nodemailerSendgrid({
         apiKey: process.env.SENGRID_APIKEY
      }));

      return transpoterSendgrid;
   } catch (error) {
      throw new Error(error)
   }
}

const sendMail = async(options) => {
   try {
      const gmailTrasporter = await createTrasporter();
      const result = await gmailTrasporter.sendMail(options);
   } catch (error) {
      throw new Error(error)
   }
}
const emailOptions = {
   subject:"",
   to:"",
   from:"camilo.gonzalezre@amigo.edu.co",
   html:"",
};

module.exports = {
   sendMail,
   emailOptions,
}
