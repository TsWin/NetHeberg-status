require("dotenv").config();
const { WebhookClient, MessageEmbed } = require("discord.js");
const webhookClient = new WebhookClient(process.env.WEBHOOK_ID, process.env.WEBHOOK_TOKEN);

async function sendWebhookNotification(alertType, alertData) {
    const embed = new MessageEmbed()
        .setTitle(`📡 - ${alertData.monitorName} is ${alertData.alertName}`)
        .addField("📝 Reason:", alertData.alertDetails)
        .addField("⌛ Date:", `<t:${alertData.alertDurationTimestamp}>`)
        .addField("🔗 URL:", alertData.monitorURL)
        .setTimestamp()
        .setThumbnail('https://media.discordapp.net/attachments/741389982156980276/995767441563078767/logotxt_blanc.png')
        .setFooter(`Notification recieved:`)
    switch (alertType) {
        case "1":
            embed.setColor("RED");
            break;
            case "2":
            embed.setColor("GREEN");
            embed.addField("⌛ Duration:", alertData.alertDuration)
            break;
        case "3":
            embed.setColor("BLUE");
            break;
        case "4":
            embed.setColor("ORANGE");
            break;
    }
    const webhookResponse = new Promise(async (resolve, reject) => {
        const sentMessage = await webhookClient.send({
            username: 'NetHeberg Status Bot',
            avatarURL: 'https://media.discordapp.net/attachments/741389982156980276/995767441563078767/logotxt_blanc.png',
            embeds: [embed],
        }).catch((error) => {
            reject({ status: "500", error: { type: "Internal Server Error", message: "Discord Server Notification Failed", error: `${error.name}: ${error.message}` } });
        })
        resolve({ status: "200", message: "Discord Server Successfully Notified", sentMessage });
    });
    return webhookResponse;
}

module.exports = { sendWebhookNotification };