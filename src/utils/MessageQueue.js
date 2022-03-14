var amqp = require('amqplib/callback_api');

exports.sendMQ = function(param){
    amqp.connect(`amqp://${process.env.MQ_HOST}`,(err,connection)=>{
        if(err){
            throw err;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'mail';
            channel.assertQueue(queue, {
                durable: false
            });

            var msg = param;
            channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

            console.log(" [x] Sent %s", msg);            
        });

        setTimeout(function() {
            connection.close();
            // process.exit(0);
        }, 3000);
    });
}