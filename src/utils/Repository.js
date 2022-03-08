const { dbconfig } = require('./dbconfig'); 
const pq = require('pg');

const pool = new pq.Pool(dbconfig);

//insert mydata
//select mydata by user-email
//update mydata
//delete mydata

const sqlexecute = async function(query, param){
  const res = await pool
  .connect()
  .then(client => {
    return client
    .query(query, param)
        .then(res => {
          client.release();
          return res;
      })
      .catch(err => {
        client.release();
        console.error(err.stack);
        return err.stack;
      })
  });
  return res;
}

module.exports = sqlexecute;