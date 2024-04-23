const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'xxxxxx',
    database: 'Movies'
})

app.get('/', (re, res) => {
    return res.json("From Backend");
})

app.get('/Movies', (req, res) => {
    const searchTerm = req.query.title || '';
    
    const sql = "SELECT * FROM Movies WHERE Title LIKE ?";
    
    db.query(sql, [`%${searchTerm}%`], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
})

app.listen(8081, () => {
    console.log("listening");
})