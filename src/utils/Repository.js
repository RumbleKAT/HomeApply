const { dbconfig } = require('./dbconfig'); 
const pq = require('pg');

const pool = new pq.Pool(dbconfig);

pool
  .connect()
  .then(client => {
    return client
    .query('select * from mydata;')
        .then(res => {
        client.release()
        console.log(res)
      })
      .catch(err => {
        client.release()
        console.log(err.stack)
      })
  })