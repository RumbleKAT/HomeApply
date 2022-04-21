const { WebClient } = require('@slack/web-api'); 
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);

exports.sendSlack = async (channel, message) => {
    web.chat.postMessage({  text: message, channel: channel })
        .then(result => { 
            console.log('Message sent: ' + result.ts) 
    });
};
