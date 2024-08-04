const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config(); 


const port = 8081;
const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

app.post('/login', (req,res) =>{
    const { username, password } = req.body;
    console.log('Request body:', req.body);

    const query ="SELECT * FROM login WHERE username = ? AND password = ?";

    db.query(query, [username, password], (err, results) =>{
        if (err) {
            console.error('Error querying the database:', err);
            res.status(500).send('Server error');
            return;
        }
        if (results.length > 0){
            console.log("Success");
            return res.json("Success")
        } else {
            console.log("Failed");
            return res.json("Invalid credentials")

        }
    })

});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});