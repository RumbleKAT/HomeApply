const sqlexecute  = require('../utils/Repository');

exports.selectById = async function(param){
    const res = await sqlexecute('select * from mydata where id = $1', Object.values(param));
    return res;
}

exports.selectByMail = async function(param){
    const res = await sqlexecute('select * from mydata where mail = $1', Object.values(param));
    return res;            
}
// const testApp = {
//     mail : 'ssj318@naver.com'
// }
exports.createId = async function(param){
    const res = await sqlexecute(`insert into mydata(mail) values ( $1 );`,Object.values(param));
    return res;
}

// const testApp2 = {
//     id : 2,
//     mail : 'ssj318@naver.com'
// }

exports.updateEmail = async function(param){
    const res = await sqlexecute(`
     update mydata 
        set mail = $2
        where id = $1
    `,Object.values(param));
    return res;
}
// const testApp3 = {
//     id : 2
// }
exports.deleteEmail = async function(param){
    const res = sqlexecute(`delete from mydata where id = $1`,Object.values(param));
    return res;
}


