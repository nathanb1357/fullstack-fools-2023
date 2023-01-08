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
    let searchKey = req.query.ingr;
    let type = req.query.vof;

    let doc =fs.readFileSync("./app/html/produce.html" , "utf-8")

    console.log(type);
    console.log(searchKey);
    console.log(typeof(searchKey));

    if (type == "fruits") {
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "fvdata",
            multipleStatements: true,
        });
        connection.connect();
        
        //for debug
        // console.log("s connect");

        squepool = [
            "SELECT Name FROM `fruits` ORDER BY Protein DESC LIMIT 5",
            "SELECT Name FROM `fruits` ORDER BY Fiber DESC LIMIT 5",
            "SELECT Name FROM `fruits` ORDER BY Calcium DESC LIMIT 5",
            "SELECT Name FROM `fruits` ORDER BY Iron DESC LIMIT 5",
            "SELECT Name FROM `fruits` ORDER BY VitaminA DESC LIMIT 5",
            "SELECT Name FROM `fruits` ORDER BY VitaminB DESC LIMIT 5",
            "SELECT Name FROM `fruits` ORDER BY VitaminC DESC LIMIT 5",
            "SELECT Name FROM `fruits` ORDER BY VitaminE DESC LIMIT 5",            
        ]

        let sqlStatement;

        switch(searchKey){
            case "Protein":
                sqlStatement = squepool[0];
            break;
            case "Fiber":
                sqlStatement = squepool[1];
            break;
            case "Calcuim":
                sqlStatement = squepool[2];
            break;
            case "Iron":
                sqlStatement = squepool[3];
            break;
            case "VitaminA":
                sqlStatement = squepool[4];
            break;
            case "VitaminB":
                sqlStatement = squepool[5];
            break;
            case "VitaminC":
                sqlStatement = squepool[6];
            break;
            default:
                sqlStatement = squepool[7];
        }



        connection.execute(
            // "SELECT Name FROM `fruits` ORDER BY ? DESC LIMIT 5" ,
            // [searchKey],
            sqlStatement,
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
                    let pack = [
                        result[0],
                        result[1],
                        result[2],
                        result[3],
                        result[4]
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

        squepool = [
            "SELECT Name FROM `vegetables` ORDER BY Protein DESC LIMIT 5",
            "SELECT Name FROM `vegetables` ORDER BY Fiber DESC LIMIT 5",
            "SELECT Name FROM `vegetables` ORDER BY Calcium DESC LIMIT 5",
            "SELECT Name FROM `vegetables` ORDER BY Iron DESC LIMIT 5",
            "SELECT Name FROM `vegetables` ORDER BY VitaminA DESC LIMIT 5",
            "SELECT Name FROM `vegetables` ORDER BY VitaminB DESC LIMIT 5",
            "SELECT Name FROM `vegetables` ORDER BY VitaminC DESC LIMIT 5",
            "SELECT Name FROM `vegetables` ORDER BY VitaminE DESC LIMIT 5",            
        ]

        let sqlStatement;

        switch(searchKey){
            case "Protein":
                sqlStatement = squepool[0];
            break;
            case "Fiber":
                sqlStatement = squepool[1];
            break;
            case "Calcuim":
                sqlStatement = squepool[2];
            break;
            case "Iron":
                sqlStatement = squepool[3];
            break;
            case "VitaminA":
                sqlStatement = squepool[4];
            break;
            case "VitaminB":
                sqlStatement = squepool[5];
            break;
            case "VitaminC":
                sqlStatement = squepool[6];
            break;
            default:
                sqlStatement = squepool[7];
        }
        connection.connect();
        connection.execute(

            sqlStatement,
            // "SELECT Name FROM vegetables ORDER BY fiber LIMIT 5",
            
            // [searchKey],
            function (error, result, fields) {
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

                    let pack = [
                        result[length-5],
                        result[length-4],
                        result[length-3],
                        result[length-2],
                        result[length-1]
                    ];

                    box.page.push(doc);
                    box.pack.push(pack);

                    res.send(box);
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