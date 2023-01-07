"use strick";

//============================================
//Server side code
//============================================

// initial
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

var colomnID = 1;

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");

    // just send the text stream
    res.send(doc);
});

// app.get("/", function (req, res) {
    
//     const prasedData = JSON.parse(data);

//     const trucks = prasedData.TRUCK_ID;

//     console.log(trucks);

//     // just send the text stream
//     res.send(doc);
// });


//=====================================================================
//our real code from here

//async way
async function readMySQL(res) {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "fvdata", //currently fvdata is the data base name
        multipleStatements: true
    });
    connection.connect();
    const queryState = "SELECT * FROM `produce` ORDER BY = ?"; //fruits is the table name 
    
    const [rows, fields] = await connection.execute(queryState, [colomnID]);

    //=====================================
    //feedback info as table or else
    //=====================================
    
    connection.end();
    res.send(table);
    return;
}





// for page not found (i.e., 404)
app.use(function (req, res, next) {
    // this could be a separate file too - but you'd have to make sure that you have the path
    // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});
// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("The server runs on port " + port + "!");
});