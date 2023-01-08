"use strick";

//============================================
//Server side code
//============================================

// initial
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/images", express.static("./app/images"));
app.use("/html", express.static("./app/html"))

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");

    // just send the text stream
    res.send(doc);
});

//=====================================================================
//our real code from here
app.get("/produce", function (req, res) {
    const searchKey = req.query.ingr;
    const type = req.query.vof;

    let doc =fs.readFileSync("./app/html/test.html" , "utf-8")

    console.log(type);
    console.log(searchKey);

    if (type == "fruits") {
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "fvdata",
        });
        connection.connect();
        
        //for debug
        // console.log("s connect");

        connection.query(
            "SELECT Name FROM fruits ORDER BY ?" ,
            [searchKey],
            function (error, result, fields) {
                
                //for debug
                console.log(result);

                if (error) {
                    console.log(error);
                }

                if (typeof result[0] == 'undefined') {
                    res.send(null);
                    connection.end();
                    return;
                } else {
                    let box = {page:[], pack:[]};
                    let length = result.length;

                    const pack = [
                        result[length-1],
                        result[length-2],
                        result[length-3],
                        result[length-4],
                        result[length-5]
                    ];

                    box.page.push(doc);
                    box.pack.push(pack);

                    res.send(box);
                }

            });

        connection.end();
        
    } else {
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "fvdata",
        });
        connection.connect();
        connection.execute(
            "SELECT Name FROM vegetables ORDER BY ?",
            [searchKey],
            function (error, result, fields) {
                if (error) {
                    console.log(error);
                }

                if (typeof result[0] == 'undefined') {
                    res.send(null);
                    connection.end();
                    return;
                } else {
                    let length = result.length;

                    const pack = [
                        result[length-1],
                        result[length-2],
                        result[length-3],
                        result[length-4],
                        result[length-5]
                    ];

                    res.send(pack);
                }
                
            });

        connection.end();
        // res.send("vegetables");
    }
    return;
});



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