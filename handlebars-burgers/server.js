var express = require("express");
var app = express();
var mysql = require('mysql');

// connecting to mysql to access 'burgers_db' 
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "root",
	password: "Sql506087",
	database: "burgers_db"
});

// here we make the 'public' directory static
app.use(express.static(process.cwd() + "/public"));

// now we set up our handlebars
Handlebars = require('handlebars');
var exphbs = require("express-handlebars");

var hbs = exphbs.create({
	handlebars: Handlebars,
	defaultLayout: "main",
});

//setting up file extensions
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//default route for '/' returns all data from sql table, rendered into 'burgers.handlebars' file
app.get('/', function (req, res) {
	connection.query('SELECT * FROM burgers', function (error, results, fields) {
		if (error) throw error;

		res.render('burgers', {
			data: results
		});
	});
})

// route for when user clicks 'Eat Me' button, changes devoured boolean to 'true'
app.get("/eat", function (req, res) {
	connection.query("UPDATE burgers SET devoured=true WHERE id=?", [req.query.idb], function (error, results, fields) {
		if (error) throw error;
		console.log("Burger has been devoured.");
		res.redirect("/");
	})
})

// route for when user clicks 'Make Another' button, changes devoured boolean to "false"
app.get("/cook", function (req, res) {
	connection.query("UPDATE burgers SET devoured=false WHERE id=?", [req.query.idbn], function (error, results, fields) {
		if (error) throw error;
		console.log("Burger has been restocked!");
		res.redirect("/");
	})
})

// route for when user creates a new burger, adds burger name to sql table with devoured boolean set to 'false'
app.get("/custom", function (req, res) {
	connection.query("INSERT INTO burgers (burger_name, devoured) VALUES (?, ?)", [req.query.customBurger, false], function (error, results, fields) {
		if (error) throw error;
		console.log("Successfully added " + req.query.customBurger + " to the menu!");
		res.redirect("/");
	})
})


//listening for port 
app.listen(3001, function () {
	console.log('Listening on port 3001');
});







