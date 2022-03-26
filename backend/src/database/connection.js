const sql = require('mssql');

const dbSettings = {
  user: "skeg",
  password:"46987600edu",
  server: "localhost",
  database: "camionsito",
  options:{
    encrypt: true,
    trustServerCertificate: true
  }
};

const getConnection = async()=>{
  try{
    const pool = await sql.connect(dbSettings);
    return pool;
  }catch(e){
    console.error(e.message);
  }
}

module.exports = getConnection;
