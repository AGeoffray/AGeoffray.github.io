
var express = require("express");
var path = require("path");
var mysql = require("mysql");
var app = express();

//here we connect to mysql so we can manipulate the db 'friend_finder'
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: //password goes here
    database: "friend_finder"
});

//we make the directory 'public' static so that we can access all the files with a route
app.use(express.static("public"));

//a home route takes you to home.html
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/home.html"));
})

//a route brings you to take the survey
app.get("/friends", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/survey.html"));
})

//creating global variables to store the user's answers, so we can refer to it in other functions
var name;
var photo;
var score01;
var score02;
var score03;
var score04;
var score05;
var score06;
var score07;
var score08;
var score09;
var score10;

//when the user submits a survey and updates their username/photo, we use /friends-new to add them to the mysql table 'friends'
app.get("/friends-new", function (req, res) {
    name = req.query.newFriend;
    photo = req.query.photoURL;
    score01 = req.query.qone;
    score02 = req.query.qtwo;
    score03 = req.query.qthree;
    score04 = req.query.qfour;
    score05 = req.query.qfive;
    score06 = req.query.qsix;
    score07 = req.query.qseven;
    score08 = req.query.qeight;
    score09 = req.query.qnine;
    score10 = req.query.qten;
    console.log(name + " has added a photo! URL:" + photo + "\n " + name + "'s Scores: " + score01 + ', ' + score02 + ', ' + score03 + ', ' + score04 + ', ' + score05 + ', ' + score06 + ', ' + score07 + ', ' + score08 + ', ' + score09 + ', ' + score10);
    connection.query("INSERT INTO friends (name, photo, score01, score02, score03, score04, score05, score06, score07, score08, score09, score10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, photo, score01, score02, score03, score04, score05, score06, score07, score08, score09, score10], function (error, response, fields) {
        if (error) console.log("404");

        //once the user's info has been added to mysql, we redirect them to another page
        res.redirect("/directory.html");
    })
})

//a route to get all data from the 'friends' table
app.get("/list", function (req, res) {
    connection.query("SELECT * FROM friends;", function (error, response, fields) {
        res.json(response);
    })
})

app.get("/available", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/allFriends.html"));
})




//I'm working on a function below to compare scores with other members, but it isn't quite right yet.
//When it's ready, I will call this function after a user submits their survey and 
//redirect them to an HTML page displaying their best matches.
//so far, I think I'm able to compare answers but I am not able to tell which user it is that they match with

app.get("/myMatches", function (req, res) {
    findMatch();
})

var totalDifference;
var smallestDifference;
var one;
var two;
var three;
var four;
var five;
var six;
var seven;
var eight;
var nine;
var ten;

function findMatch() {
    connection.query("SELECT score01, score02, score03, score04, score05, score06, score07, score08, score09, score10 FROM friends", function (err, results, fields) {
        for (var i = 0; i < [results.length - 1]; i++) {

            if (results[i].score01 > score01) {
                one = results[i].score01 - score01;
            } else {
                one = score01 - results[i].score01;
            } if (results[i].score02 > score02) {
                two = results[i].score02 - score02;
            } else {
                two = score02 - results[i].score02;
            } if (results[i].score01 > score01) {
                three = results[i].score01 - score01;
            } else {
                three = score03 - results[i].score03;
            } if (results[i].score04 > score04) {
                four = results[i].score04 - score04;
            } else {
                four = score04 - results[i].score04;
            } if (results[i].score05 > score05) {
                five = results[i].score05 - score05;
            } else {
                five = score05 - results[i].score05;
            } if (results[i].score06 > score06) {
                six = results[i].score06 - score06;
            } else {
                six = score06 - results[i].score06;
            } if (results[i].score07 > score07) {
                seven = results[i].score07 - score07;
            } else {
                seven = score07 - results[i].score07;
            } if (results[i].score08 > score08) {
                eight = results[i].score08 - score08;
            } else {
                eight = score08 - results[i].score08;
            } if (results[i].score09 > score09) {
                nine = results[i].score09 - score09;
            } else {
                nine = score09 - results[i].score09;
            } if (results[i].score10 > score10) {
                ten = results[i].score10 - score10;
            } else {
                ten = score10 - results[i].score10;
            }

            //here we take the difference in each score and add them together
            totalDifference = one + two + three + four + five + six + seven + eight + nine + ten;

            //next we find the smallest 'totalDifference', because that is their match
            var smallestDifference = 0;
            for (var x = 0; x < totalDifference.length; x++) {
                if (totalDifference[x] < smallestDifference) {
                    smallestDifference = totalDifference[i];
                }
            }
            console.log("Difference in scores, answer 1: " + one +" answer 2: " + two + " answer 3: " + three + " answer 4: " + four + " answer 5: " + five);
            console.log("total" + totalDifference + " , smallest: " + smallestDifference);
        }
    })
}

app.listen(3004, function () {
    console.log("Ready on port 3004");
})

