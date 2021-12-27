const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql2');

function randomNumber(digit) {
    let number = Math.floor(Math.random() * digit);

    return number;
}

const db2 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'people_database'
});

db2.connect();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM people_attend;";
    db2.query(sqlSelect, (err, result) => {
        res.send(result);        
    });
});

app.post("/api/insert", (req, res) => {
    const id = randomNumber(100000);
    const fullname = req.body.fullname;
    const email = req.body.email;
    const age = req.body.age;
    const job = req.body.job;
    const attend_time = req.body.attend_time;

    const sqlInsert = "INSERT INTO people_attend (id, fullname, email, age, job, attend_time) VALUES (?, ?, ?, ?, ?, ?);"
    db2.query(sqlInsert, [id, fullname, email, age, job, attend_time], (err, result) => {
        res.send("success.");
        if (err) {
            console.log(err)
        }
    });
});

app.delete("/api/delete/:fullname", (req, res) => {
    const fullname = req.params.fullname;
    const sqlDelete = "DELETE FROM people_attend WHERE fullname = ?";
    db2.query(sqlDelete, fullname, (err, result) => {
        res.send(result);
        if (err) {
            console.log(err);
        }
    });
});

app.put("/api/update", (req, res) => {
    const fullname = req.body.fullname;
    const attend_time = req.body.attend_time;
    const sqlUpdate = "UPDATE people_attend SET attend_time = ? WHERE fullname = ?";

    db2.query(sqlUpdate, [attend_time, fullname], (err, result) => {
        if (err) {
            console.log(err);
        };
    });
});

// solution -> use mysql2 instead of mysql for integration
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     database: 'people_database',
// });

// working
// app.get("/adduser", (req, res) => {
//     const sqlInsert = "INSERT INTO people_attend (id, fullname, email, age, job, attend_time) VALUES ('0', 'Alvians Maulana', 'alviansmaulana@testmail.com', '18', 'Pengangguran', '07:24');"
//     db2.query(sqlInsert, (err, result) => {
//         res.send("succes.");
//         if (err) throw err;
//         console.log("The solution is ", rows[0].solution);
//     })
// });

app.listen(3001, () => {
    console.log("Running on port 3001.");
});