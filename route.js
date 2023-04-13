const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
// const {con3} = require("./modules/database");
const app = express();

const con = mysql.createConnection({
    user: 'root',
    database: 'mydb',
    host: 'localhost',
    password: '',
    port: '3307'
});
con.connect((err) => {
    // if(err) throw err;
    console.log("connected");
});

app.set("view-engine", "hbs");

router.route("/").get((req, res) => {
    res.render("index.hbs");
});
router.route("/sall").post((req, res) => {
    con.query("SELECT * FROM dbase", (err ,result, fields) => {
        if(err) throw err;
        else{
            if(result.length == 0)
                res.render("error.hbs", {eror: "No Database Available!!"});
            else{
                con.query("SELECT Name, phno, countphn FROM dbase ORDER BY Name", (err ,result, fields) => {
                    if(err) throw err;
                    else 
                        res.render("seall.hbs", {lst: result});
                });
            }
        }
    });
});
/* router.route("/sall").post((req, res) => {
    con.query("SELECT * FROM dbase", (err ,result, fields) => {
        if(err) throw err;
        else{
            if(result.length == 0)
                res.render("error.hbs", {eror: "No Database Available!!"});
            else{
                con.query("SELECT Name, phno, countphn FROM dbase ORDER BY Name", (err ,result, fields) => {
                    if(err) throw err;
                    else{
                        const resultPerPage = 5;
                        const noOfResults = result.length;
                        const noOfPages = Math.ceil(noOfResults/resultPerPage);
                        let page = req.query.page ? Number(req.query.page) : 1;
                        if(page > noOfPages)
                            res.send("/?page" + encodeURIComponent(noOfPages));
                        else if(page < 1)
                            res.send("/?page" + encodeURIComponent("1"));
                        const slt = (page - 1) * resultPerPage;
                        con.query("SELECT Name, phno, countphn FROM dbase LIMIT ?, ?", [slt, resultPerPage], (err, result) =>{
                            if(err) throw err;
                            let itr = (page - 5) < 1 ? 1 : page - 5;
                            let end = (itr + 9) <= noOfPages ? (itr + 9) : page + noOfPages;
                            if(end < (page+4)) 
                                itr -= (page+4) - noOfPages;
                            res.render("seall.hbs", {lst: result, page, itr, end, noOfPages});
                        })
                    }
                });
                // res.render("seall.hbs", {lst: result});
            }
        }
    });
}); */
router.route("/gett").get((req, res) => {
    res.render("putt.hbs");
});
router.route("/gett").post((req, res) => {
    res.render("puttno.hbs");
});
router.route("/putdata").post((req, res) => {
    con.query("SELECT * FROM dbase WHERE Name = ?", [req.body.name], (err,result,fields) => {
        if(err) throw err;
        else{
            if(result.length != 0)
                res.render("error.hbs", {eror: "Already Available!!"});
            else{
                con.query("INSERT INTO dbase (name, Phno, countphn) VALUES (?,?,?)", [req.body.name, req.body.phn, 1], (err, result, fields) => {
                    if (err) throw err;
                    console.log(result);
                    res.render("okpage.hbs", {dia: "Contact Registered!!"});
                });
            }
        }
    });
});
router.route("/putdata1").post((req, res) => {
    con.query("SELECT * FROM dbase WHERE Name = ?", [req.body.name], (err,result,fields) => {
        if(err) throw err;
        else{
            if(result.length == 0)
                res.render("error.hbs", {eror: "Add Contact First!!"});
            else{
                con.query("INSERT INTO dbase (name, Phno, countphn) VALUES (?,?,?)", [req.body.name, req.body.phn, req.body.altno], (err, result, fields) => {
                    if (err) throw err;
                    console.log(result);
                    res.render("okpage.hbs", {dia: "Contact Registered!!"});
                });
            }
        }
    });
});
router.route("/uen").get((req, res) => {
    res.render("uname.hbs");
});
router.route("/uen").post((req, res) => {
    con.query("SELECT * FROM dbase WHERE Name = ?", [req.body.pname], (err,result,fields) => {
        if(err) throw err;
        else{
            if(result.length == 0)
                res.render("error.hbs", {eror: "Add Contact First!!"});
            else{
                con.query("UPDATE dbase SET Name = ? WHERE Name = ?", [req.body.newname, req.body.pname], (err,result,fields) => {
                    if(err) throw err;
                    res.render("okpage.hbs", {dia: "Contact Updated!!"});
                });
            }
        }
    });
});
router.route("/ueno").get((req, res) => {
    res.render("unum.hbs");
});
router.route("/ueno").post((req, res) => {
    con.query("SELECT * FROM dbase WHERE Name = ?", [req.body.pname], (err,result,fields) => {
        if(err) throw err;
        else{
            if(result.length == 0)
                res.render("error.hbs", {eror: "Add Contact First!!"});
            else{
                con.query("UPDATE dbase SET phno = ? WHERE Name = ? AND countphn = ?", [req.body.newnum, req.body.pname, req.body.altno], (err,result,fields) => {
                    if(err) throw err;
                        res.render("okpage.hbs", {dia: "Contact Number Updated!!"});
                });
            }
        }
    });
});
router.route("/fech").get((req, res) => {
    res.render("fech.hbs"); 
});
router.route("/fech").post((req, res) => {
    con.query("SELECT * FROM dbase WHERE Name = ?", [req.body.pname], (err,result,fields) => {
        if(err) throw err;
        else{
            if(result.length == 0)
                res.render("error.hbs", {eror: "Cannot Fetch The Data, Add First!!"});
            else{
                res.render("fech.hbs", {nme: result[0].Name, phn: result});
            }
        }
    });
});
router.route("/del").get((req, res) => {
    res.render("del.hbs"); 
});
router.route("/del").post((req, res) => {
    con.query("SELECT * FROM dbase WHERE Name = ?", [req.body.pname], (err,result,fields) => {
        if(result.length == 0)
                res.render("error.hbs", {eror: "Cannot Delete The Data!!"});
        else{
            if(err) throw err;
            con.query("DELETE FROM dbase WHERE Name = ?", [req.body.pname], (err, result) => {
                res.render("okpage.hbs", {dia: "Contact Deleted!!"});
            });
        }
    });
});

module.exports = router;