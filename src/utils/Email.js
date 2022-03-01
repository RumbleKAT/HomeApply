const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

async function main(){

    let transporter  = nodemailer.createTransport(smtpTransport({
       service : 'gmail',
       host: 'smtp.gmail.com',
       port : 587,
       secure : false,
       auth : {
        user: `${process.env.USER}@gmail.com`,
        pass: `${process.env.PASSWORD}`
       } 
    }));

    const test = 'test1234';

    let info = await transporter.sendMail({
        // 보내는 곳의 이름과, 메일 주소를 입력
        from: `"WDMA Team" <${process.env.USER}@gmail.com>`,
        // 받는 곳의 메일 주소를 입력
        to: 'reki318@naver.com',
        // 보내는 메일의 제목을 입력
        subject: 'WDMA Auth Number',
        // 보내는 메일의 내용을 입력
        // text: 일반 text로 작성된 내용
        // html: html로 작성된 내용
        text: test,
        html: `<b>${test}</b>`,
      });

      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
    //   res.status(200).json({
    //     status: 'Success',
    //     code: 200,
    //     message: 'Sent Auth Email',
    //   });
}

main().catch(console.error);