const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

app.post('/signup', (req,res) =>){
    const sql ="INSERT INTO login ('username','password') VALUES (?)";
    const values = [
        req.body.username,
        req.body.password
    ]
    db.query(sql, [values], (err,data) =>{
        if(err){
            return res.json("error");
        }
        return res.json(data);
    })

}

app.listen(8081, () => {
    console.log("listening");
})