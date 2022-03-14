var amqp = require('amqplib/callback_api');
require("dotenv").config();
const { sendMail } = require('../utils/Email');
const { setMailForm } = require('../utils/mailForm');

amqp.connect(`amqp://${process.env.MQ_HOST}`, function(error0, connection) {
    if (error0) {
        console.error(error0);
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'mail';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            var result = JSON.parse(msg.content.toString());
            console.log(result);
            sendMail(setMailForm(result),result.mail);
            channel.ack(msg);
        }, {
            //noAck: true 이면 queue에서 데이터를 가져간다음 Ack를 바로 반환함으로 가져가자마자 queue에서 지워버림
            noAck: false
        });
    });
});