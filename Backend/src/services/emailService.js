require('dotenv').config();
import { language } from 'googleapis/build/src/apis/language';
import nodemailer from 'nodemailer';
const { google } = require('googleapis');

// const CLIENT_ID = process.env.CLIENT_ID
// const CLIENT_SECRET = process.env.CLIENT_SECRET
// const REDIRECT_URL = process.env.REDIRECT_URL
// const REFRESH_TOKEN = process.env.REFRESH_TOKEN

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Duy Tân 👻" <duytan0220@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: getBodyHTMLEmail(dataSend)
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = ''
    if (dataSend.language === 'en') {
        result = `  
        <h3>Hello ${dataSend.patientName}!</h3>
        <p>You have received this email because you have booked an online medical appointment at website Duy Tân Care </p>
        <p>Information to the schedule medical appointment: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>

        <p>If the information above is truly and you have who booked this schedule medical appointment, please click
        on the link below to confirm booking this schedule medical appointment.
        </p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div> Best regards!</div>`
    }
    if (dataSend.language === 'vi') {
        result = `  
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online tại website Duy Tân Care </p>
        <p>Thông tin đặt lịch khám bệnh: </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

        <p>Nếu các thông tin trên là đúng và bạn là người đặt lịch này, vui lòng click
        vào đường link bên dưới để xác nhận đặt lịch khám bệnh.
        </p>

        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div> Xin chân thành cảm ơn!</div>`
    }

    return result
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}