const { verifyConnection, sendMailWebsite, sendMailWEB02 } = require('./Utils/mailManager');
const { sendWebhookNotification } = require('./Utils/webhookManager');

const router = require('express').Router();

router.post("/recieve", async (req, res) => {
    const alertData = req.body.alert;
    const monitorData = req.body.monitor;

    if (!req.body) return res.status(400).json({ status: "400", message: "Bad Request", info: "Missing Body" });
    if (!alertData) return res.status(400).json({ status: "400", message: "Bad Request", info: "Missing Alert Data" });
    if (!monitorData) return res.status(400).json({ status: "400", message: "Bad Request", info: "Missing Monitor Data" });

    const alertInfo = {
        monitorName: monitorData.monitorName,
        monitorURL: monitorData.monitorURL,
        alertName: alertData.alertName,
        alertDetails: alertData.alertDetails,
        alertDuration: alertData.alertDuration,
        alertDurationTimestamp: alertData.alertDurationTimestamp,
    };

    const connectMail = await verifyConnection().catch((error) => {
        res.status(500).json(error);
        return error;
    })
    if (connectMail.status == "200") {
        switch (monitorData.monitorID) {
            case process.env.WEBSITE_MONITOR_ID:
                {
                    const mailResponse = await sendMailWebsite(alertData.alertType, alertInfo).catch((error) => {
                        if (error.status == "400") return res.status(400).json(error);
                        else if (error.status == "500") return res.status(500).json(error);
                        else return res.status(500).json(error);
                    })
                    const webhookResponse = await sendWebhookNotification(alertData.alertType, alertInfo).catch((error) => {
                        if (error.status == "400") return res.status(400).json(error);
                        else if (error.status == "500") return res.status(500).json(error);
                        else return res.status(500).json(error);
                    })
                    if (mailResponse.status == "200" && webhookResponse.status == "200") {
                        return res.status(200).json({ status: "200", message: "StatusPage and Discord Webhook Successfully Notified", info: { mailResponse, webhookResponse } });
                    } else {
                        return res.status(500).json({ status: "500", message: "StatusPage or Discord Webhook Notification Failed", info: { mailResponse, webhookResponse } });
                    }
                }
                break;
            case process.env.WEB02_MONITOR_ID:
                {
                    const mailResponse = await sendMailWEB02(alertData.alertType, alertInfo).catch((error) => {
                        if (error.status == "400") return res.status(400).json(error);
                        else if (error.status == "500") return res.status(500).json(error);
                        else return res.status(500).json(error);
                    })
                    const webhookResponse = await sendWebhookNotification(alertData.alertType, alertInfo).catch((error) => {
                        if (error.status == "400") return res.status(400).json(error);
                        else if (error.status == "500") return res.status(500).json(error);
                        else return res.status(500).json(error);
                    })
                    if (mailResponse.status == "200" && webhookResponse.status == "200") {
                        return res.status(200).json({ status: "200", message: "StatusPage and Discord Webhook Successfully Notified", info: { mailResponse, webhookResponse } });
                    } else {
                        return res.status(500).json({ status: "500", message: "StatusPage or Discord Webhook Notification Failed", info: { mailResponse, webhookResponse } });
                    }
                }
                break;   
            default:
                return res.status(406).json({ status: "406", message: "Not Acceptable", info: "Monitor Not Handled" });
                break;
        }
    }
})

module.exports = router;