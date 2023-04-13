const mysql = require("mysql2");

const con = mysql.createConnection({
    user: 'root', 
    database: 'mydb', 
    host:'localhost', 
    password: '',
    port: '3307'
});
const con1 = () => {con.connect((err)=>{
    // if(err) throw err;
    console.log("connected");
});};
const con2 = () => {con.query("select Name, phno, countphn from dbase", (err, result, fields)=>{
    if(err)
        console.log(err);
    console.log(result);
});};
const con3 = (req, res) => {
    con.query("INSERT INTO dbase (name, age) VALUES ?", [[req.body.name, req.body.phn]],(err,result,fields)=>{
    console.log(result);
});};

module.exports = {con1,con2,con3};