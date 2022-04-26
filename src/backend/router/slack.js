const { WebClient } = require('@slack/web-api'); 
const token = process.env.SLACK_BOT_TOKEN;

const web = new WebClient(token);

exports.sendSlack = async (channel, message) => {
    try{
        const { result } = await web.chat.postMessage({  text: message, channel: channel });
        return result.ts;
    }catch(err){
        console.error(err);
        throw new Error('Slack API Connection Error', err);
    }    
};
