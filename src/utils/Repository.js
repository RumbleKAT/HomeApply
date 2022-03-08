const { dbconfig } = require('./dbconfig'); 
const pq = require('pg');

const pool = new pq.Pool(dbconfig);

//insert mydata
//select mydata by user-email
//update mydata
//delete mydata

const sqlexecute = async function(query){
  const res = await pool
  .connect()
  .then(client => {
    return client
    .query(query)
        .then(res => {
          client.release();
          return res;
      })
      .catch(err => {
        client.release();
        console.err(err.stack);
        return err.stack;
      })
  });
  return res;
}

module.exports = sqlexecute;