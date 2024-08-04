const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config(); 


const port = 8081;
const app = express();

app.use(cors());
app.use(express.json());

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

    const query =`SELECT * FROM login WHERE username = ? AND password = ?`;

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

app.post('/get-locations',(req,res) => {
    const query = "SELECT * FROM location";
    db.query(query, (err,results) => {
        if (err) {
            console.error('Error fetching data from the database:', err);
            res.status(500).send('Server error');
            return;
        } else {
            console.log("Locations fetched successfully");
            res.status(200).send(results);
            return;
        }
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
