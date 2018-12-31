
var express = require("express");
var path = require("path");
var mysql = require("mysql");
var app = express();

//here we connect to mysql so we can manipulate the db 'friend_finder'
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Sql506087",
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

app.get("/available", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/allFriends.html"));
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

//after the user creates a profile/fills out the survey, they are directed to this route which adds them to the mysql table 'friends'
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
    //console log to make sure the user's submission is accurate, then connect to mysql to update the db
    console.log(name + " has added a photo! URL:" + photo + "\n " + name + "'s Scores: " + score01 + ', ' + score02 + ', ' + score03 + ', ' + score04 + ', ' + score05 + ', ' + score06 + ', ' + score07 + ', ' + score08 + ', ' + score09 + ', ' + score10);
    connection.query("INSERT INTO friends (name, photo, score01, score02, score03, score04, score05, score06, score07, score08, score09, score10) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [name, photo, score01, score02, score03, score04, score05, score06, score07, score08, score09, score10], function (error, response, fields) {
        if (error) console.log("404");

        //once the user's info has been added to mysql, they are redirected to the menu page
        res.redirect("/directory.html");
    })
})

//a route to get all data from the 'friends' table
app.get("/list", function (req, res) {
    connection.query("SELECT * FROM friends;", function (error, response, fields) {
        res.json(response);
    })
})





//Below is a function to compare each user's scores to other users' scores and find their compatibility
//A total difference of 40 is the worst compatibility
//A total difference of 0 is the best compatibility


//variable to hold each user's scores as an array
var firstScores=[];
var secondScores=[];
//variables to hold the total difference as well as each question's individual difference
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
var difference;

app.get("/match", function(req, res){
        f = req.query.first; //first user's ID
        s = req.query.second; //second user's ID
connection.query("SELECT * FROM friends WHERE id=? OR id=?", [f, s], function(err, results){
    if(err) console.log("404");

    firstUserName = results[0].name;
    secondUserName = results[1].name;

    firstUserPic = results[0].photo;
    secondUserPic = results[1].photo;

// storing an array of the selected users' scores
firstScores = [results[0].score01, results[0].score02, results[0].score03, results[0].score04, results[0].score05,
results[0].score06, results[0].score07, results[0].score08, results[0].score09, results[0].score10];
secondScores = [results[1].score01, results[1].score02, results[1].score03, results[1].score04, results[1].score05, 
results[1].score06, results[1].score07, results[1].score08, results[1].score09, results[1].score10,];


    if(firstScores[0] < secondScores[0]){
        one = secondScores[0] - firstScores[0];
    }else{
        one = firstScores[0] - secondScores[0];
    }
    if(firstScores[1] < secondScores[1]){
        two = secondScores[1] - firstScores[1];
    }else{
        two = firstScores[1] - secondScores[1];
    }
    if(firstScores[2] < secondScores[2]){
        three = secondScores[2] - firstScores[2];
    }else{
        three = firstScores[2] - secondScores[2];
    }
    if(firstScores[3] < secondScores[3]){
        four = secondScores[3] - firstScores[3];
    }else{
        four = firstScores[3] - secondScores[3];
    }
    if(firstScores[4] < secondScores[4]){
        five = secondScores[4] - firstScores[4];
    }else{
        five = firstScores[4] - secondScores[4];
    }
    if(firstScores[5] < secondScores[5]){
        six = secondScores[5] - firstScores[5];
    }else{
        six = firstScores[5] - secondScores[5];
    }
    if(firstScores[6] < secondScores[6]){
        seven = secondScores[6] - firstScores[6];
    }else{
        seven = firstScores[6] - secondScores[6];
    }
    if(firstScores[7] < secondScores[7]){
        eight = secondScores[7] - firstScores[7];
    }else{
        eight = firstScores[7] - secondScores[7];
    }
    if(firstScores[8] < secondScores[8]){
        nine = secondScores[8] - firstScores[8];
    }else{
        nine = firstScores[8] - secondScores[8];
    }
    if(firstScores[9] < secondScores[9]){
        ten = secondScores[9] - firstScores[9];
    }else{
        ten = firstScores[9] - secondScores[9];
    }


difference = one+two+three+four+five+six+seven+eight+nine+ten;

var percentage = (40-difference);

// console.log("first: " + firstScores + " second: " + secondScores + " Total differences: " + difference + "/40");
// res.json(firstUserName+ " and " +secondUserName+" have a total difference of " + difference + " points. Compatibility: " + percentage + " out of 40.");

// var displayDiv = document.getElementById("#displayCompat");

// displayDiv.html(firstUserName+ " and " +secondUserName+" have a total difference of " + difference + " points. Compatibility: " + percentage + " out of 40.");


res.send("<html><head><link href='https://fonts.googleapis.com/css?family=Poiret+One|Tangerine' rel='stylesheet'>"+
"</head><style> * {background: url('/purple.png') center fixed no-repeat; margin: 15px; color: purple; font-weight: bold; font-family: 'poiret one', cursive;}; .servC {padding:10px; margin:10px;};"+ 
"#serverbtn {color: rgb(59, 11, 45); font-size: 45px; font-family: 'Tangerine', cursive;} #serverbtn:hover {color: rgb(203, 147, 229); text-shadow: 2px 2px rgb(126, 36, 99); font-size: 50px;}</style><center><div id='servResults' class='servC'>"+
firstUserName + " and " + secondUserName + " have a total difference of " + difference +
" points. <br> Compatibility: " + percentage + " out of 40.</div><br><img id='fpic' class='servC' src='"+
firstUserPic+"' height='300px'><img src='/purpleheart.png' class='servC' height='50px'><img id='spic' class='servC' src='"+
secondUserPic+"' height='300px'><br><a href='/allFriends.html' id='serverbtn'>Back</a></center></html>");

})
})



app.listen(3040, function () {
    console.log("Ready on port 3040");
})

