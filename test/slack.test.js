const { sendSlack } = require('../src/backend/router/slack');

describe('Slack API 테스트', ()=>{
    test('test error bot', async function(){
        sendSlack('test','sample text');
    });
});