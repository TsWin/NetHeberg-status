require("dotenv").config();
const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    host: "netheberg.fr",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_AUTH_USER, // generated ethereal user
        pass: process.env.EMAIL_AUTH_PASS, // generated ethereal password
    },
    tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
    },
});

async function verifyConnection() {
    const connectionVerification = new Promise((resolve, reject) => {
        transporter.verify(function (error, success) {
            if (error) {
                reject({ status: "500", error: { type: "Internal Server Error", message: "Mail Connection Failed" } });
            } else {
                resolve({ status: "200", message: "OK"})
            }
        });
    })
    return connectionVerification;
}

async function sendMailWebsite(alertType, alertInfo) {
    let mailConfig;
    switch (alertType) {
        case "1": 
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEBSITE_STATUS_MAIL, // list of receivers
                    subject: "DOWN", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "2":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEBSITE_STATUS_MAIL, // list of receivers
                    subject: "UP", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "3":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEBSITE_STATUS_MAIL_PARTIAL, // list of receivers
                    subject: "DOWN", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "4":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEBSITE_STATUS_MAIL_PARTIAL, // list of receivers
                    subject: "UP", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;  
    }

    const mailSent = new Promise((resolve, reject) => {
        if (!mailConfig) reject({ status: "400", error: { type: "Bad Request", message: "Alert type does not match" } });
        transporter.sendMail(mailConfig, (error, info) => {
            if (error) {
                console.error(`[ERROR] - [Website] Mail Sending Failed, error: ${error}`)
                reject({ status: "500", error: { type: "Internal Server Error", message: "StatusPage Notification Failed", error: `${error.name}: ${error.message}` } });
            }
            else {
                resolve({ status: "200", message: "StatusPage Successfully Notified", info });
            }
        });
    });

    return mailSent;
}

async function sendMailWEB01(alertType, alertInfo) {
    let mailConfig;
    switch (alertType) {
        case "1": 
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEB01_STATUS_MAIL, // list of receivers
                    subject: "DOWN", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "2":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEB01_STATUS_MAIL, // list of receivers
                    subject: "UP", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "3":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEB01_STATUS_MAIL_PARTIAL, // list of receivers
                    subject: "DOWN", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "4":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.WEB01_STATUS_MAIL_PARTIAL, // list of receivers
                    subject: "UP", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
    }
    

    const mailSent = new Promise((resolve, reject) => {
        if (!mailConfig) reject({ status: "400", error: { type: "Bad Request", message: "Alert type does not match" } });
        transporter.sendMail(mailConfig, (error, info) => {
            if (error) {
                console.error(`[ERROR] - [WEB01] Mail Sending Failed, error: ${error}`)
                reject({ status: "500", error: { type: "Internal Server Error", message: "StatusPage Notification Failed", error: `${error.name}: ${error.message}` } });
            }
            else {
                resolve({ status: "200", message: "StatusPage Successfully Notified", info });
            }
        });
    });
    
    return mailSent;
}

async function sendMailLXC01(alertType, alertInfo) {
    let mailConfig;
    switch (alertType) {
        case "1": 
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.LXC01_STATUS_MAIL, // list of receivers
                    subject: "DOWN", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "2":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.LXC01_STATUS_MAIL, // list of receivers
                    subject: "UP", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "3":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.LXC01_STATUS_MAIL_PARTIAL, // list of receivers
                    subject: "DOWN", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
        case "4":
            {
                mailConfig = {
                    from: "status@netheberg.fr", // sender address
                    to: process.env.LXC01_STATUS_MAIL_PARTIAL, // list of receivers
                    subject: "UP", // Subject line
                    text: `MONITOR:${alertInfo.monitorName}\nMONITOR_URL:${alertInfo.monitorURL}\nALERT_NAME:${alertInfo.alertName}\nDETAILS:${alertInfo.alertDetails}\nDURATION:${alertInfo.alertDuration}\nDURATION_TMP:${alertInfo.alertDurationTimestamp}`,
                };
            }
            break;
    }
    

    const mailSent = new Promise((resolve, reject) => {
        if (!mailConfig) reject({ status: "400", error: { type: "Bad Request", message: "Alert type does not match" } });
        transporter.sendMail(mailConfig, (error, info) => {
            if (error) {
                console.error(`[ERROR] - [LXC01] Mail Sending Failed, error: ${error}`)
                reject({ status: "500", error: { type: "Internal Server Error", message: "StatusPage Notification Failed", error: `${error.name}: ${error.message}` } });
            }
            else {
                resolve({ status: "200", message: "StatusPage Successfully Notified", info });
            }
        });
    });

    return mailSent;
}

module.exports = { verifyConnection, sendMailWebsite, sendMailWEB01, sendMailLXC01 };