//create database 'bamazon'
//create table called 'products'
// The products table should have each of the following columns:
//    * item_id (unique id for each product)
//    * product_name (Name of product)
//    * department_name
//    * price (cost to customer)
//    * stock_quantity (how much of the product is available in store)

//add at least 10+ products to the table


var mysql = require("mysql");
var inquirer = require("inquirer");
var ctable = require("console.table")
//npm i console.table --save


//my global variables
var newChoice = require("inquirer");
var itemName = require("inquirer");
var itemPrice = require("inquirer");
var itemAmount = require("inquirer");
var itemID = require("inquirer");
var itemDept = require("inquirer");

var shoppingList = [];
var soldList = [];

// const inquirer = require('inquirer')
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt);

//connect to mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "", //enter password here,/
  database: "bamazon"
});


//when mySQL loads, take the user to homPage()
connection.connect(function (err) {
  if (err) throw err;
  homePage();
});


//--------------------------------------------------------------- START SCREEN ------//


//initial page at start of app
function homePage() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to buy or sell?",
      name: "buyorsell",
      choices: ["BUY", "SELL", "BROWSE INVENTORY"]
    },
    {
      type: "confirm",
      message: "Are you sure?",
      name: "doubleCheck",
      default: true
    }
  ]).then(function (answer) {

    if (answer.doubleCheck === true) {
      //if they want to BUY, call buySomething() function
      if (answer.buyorsell === "BUY") {
        console.log("Cool! You want to make a purchase.");
        buySomething();
      }
      //if they want to BROWSE, call showTable() so they can see what is in stock.
      else if (answer.buyorsell === "BROWSE INVENTORY") {
        showTable();
      }
      //if they want to SELL, call createProduct() function
      else {
        console.log("Cool! You have something to sell.");
        createProduct();
      }
    }
    //if they do NOT confirm YES, ask the question again.
    else {
      console.log("No worries! It was a hard question. Let's try this again...?");
      homePage();
    }
  })
}




//--------------------------------------------------------------- BROWSE BAMAZON INVENTORY ------//




//This function (for BROWSE) shows the entire sql table. Pressing ENTER will take the user back to home screen
function showTable() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.log("\n");
    console.table(results);
  })
  inquirer.prompt([
    {
      type: "confirm",
      message: "PRESS ENTER WHEN YOU ARE FINISHED LOOKING AT OUR INVENTORY.",
      name: "continue",
      default: true
    }
  ]).then(function (ans) {
    if (ans.continue === true) {
      homePage();
    } 
  //A special function is called for rebels who do not follow directions.
    else {
      console.log("\n Really? You couldn't just press ENTER like a normal person?? \nYou're such a rebel! I have the perfect product for you.");
      rebel();
    }
  })

}





//--------------------------------------------------------------- FUNC TO SELL AN ITEM ON BAMAZON ------//



//function to add items to sql bamazon database
function createProduct() {
  //first prompts the user to answer questions about the product they would like to sell
  inquirer.prompt([
    {
      type: "input",
      message: "What is the item you'd like to sell on Bamazon?",
      name: "addItem",
      MaxLengthInputPrompt: 20,
    },
    {
      type: "list",
      message: "What department best describes your product?",
      choices: ["clothing", "electronics", "kitchen", "shoes", "misc"],
      name: "addCategory",
      default: "misc"
    },
    {

      type: "input",
      maxLength: 6,
      message: "What is the price?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("\n Prices are usually numbers. You should enter a number.")
        return false;
      },
      name: "addPrice",
      default: 20
    },
    {

      type: "input",
      message: "How many of these do you have to sell?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        console.log("\n You must enter a number.")
        return false;
      },
      name: "addStock",
      default: 1
    },
    {
      type: "confirm",
      message: "Are you sure this information is correct?",
      name: "checkInfo",
      default: true
    }
  ]).then(function (inquirerResponse) {
    i = inquirerResponse;
    if (i.checkInfo === true) {

      //now we can add their product to our database
      connection.query("INSERT INTO products (product_name, department, stock_quantity, price) VALUES ('" + i.addItem + "', '" + i.addCategory + "', '" + i.addStock + "', '" + i.addPrice + "')", function (err, res) {
        if (err) throw err;
        console.log("\n You have successfully added " + i.addStock + " " + i.addItem + " to the " + i.addCategory + " department of our Bamazon store.");
        console.log("Price starting at $" + i.addPrice + " each.\n")
        homePage();
      })

    } else {
      console.log("\nOK, let's try this again!\n");
      createProduct();
    }
  })

};







//------------------------------------------------------- FUNCTION TO BUY SOMETHING FROM BAMAZON -----//



function buySomething() {
  //first we will ask the user which department they would like to browse
  connection.query("SELECT * FROM bamazon.products", function (err, res) {
    if (err) throw err;
    inquirer.prompt([
      {
        name: "dept",
        type: "list",
        choices: ["clothing", "electronics", "kitchen", "shoes", "misc"],
        message: "Which department would you like to browse?"
      }
    ]).then(function (answer) {
      itemDept = answer.dept;
      console.log("DEPARTMENT: " + itemDept);
      connection.query("SELECT item_id, product_name, price FROM bamazon.products WHERE department='" + itemDept + "'", function (e, res) {
        if (e) throw e;

        //once the user gives an answer, we display a table of that department's inventory
        console.table(res);

        //continue onto phase two, where we get more specific about the products available
        buySomethingTwo();
      })
    })
  })
}

function buySomethingTwo() {
  //now that we picked a department, we ask the user to specify a product via ID number
  connection.query("SELECT item_id FROM bamazon.products WHERE department='" + itemDept + "'", function (err, response) {
    if (err) throw err;

    //a for loop is used to cycle through all available ID numbers in a department
    var listID = [];
    for (var i = 0; i < response.length; i++) {
      listID += " " + response[i].item_id;
    }
    //we want to turn these numbers into an array of JUST numbers, no letters, spaces, or characters
    idDiv = listID.match(/\d+/g);
    idArrays = JSON.stringify(idDiv);

    //below we allow the user to select an ID from the array we created of the department's products
    inquirer.prompt([
      {
        name: "pickId",
        message: "Please select the ID# of the item you'd like to buy.",
        type: "list",
        choices: function () {
          idlist = idArrays.match(/\d+/g);
          return idlist;
        }
      }

    ]).then(function (answer) {

      //store the selected id into global variable, check accuracy via console
      itemID = answer.pickId;
      console.log("You picked item #" + itemID);

      //continue to the last step in making a purchase.
      makeAPurchase();
    })
  })
}

//In the final purchase step, we will query mySQL for the specific item
function makeAPurchase() {
  connection.query("SELECT * FROM bamazon.products WHERE item_id=" + itemID, function (err, res) {

    //check for errors before we continue
    if (err) throw err;

    //store info about the user's purchase into global variables
    itemName = JSON.stringify(res[0].product_name);
    itemAmount = JSON.stringify(res[0].stock_quantity);
    itemPrice = JSON.stringify(res[0].price);

    console.log("We have " + itemAmount + " in stock.\n")
 
    if(itemAmount === 0){
      console.log("Unfortunately, that item is not available.");
      console.log("Why don't you keep looking?\n")
      buySomething();
    }
    else{

    //Ask the user how many of this item they would like to buy
    inquirer.prompt([
      {
        name: "howMany",
        type: "input",
        message: "One " + itemName + " costs $" + itemPrice + ". How many would you like to purchase?",
        validate: function(value) {
          if (isNaN(value) === false || value < 1) {
            return true;
          }
          console.log("\n You must enter a number. " + value + " has no value.");
          return false;
        },
      },

    ]).then(function (a) {

      console.log("Your total is $" + (itemPrice * a.howMany));
      //calculate the total cost and confirm with user before finalizing payment and updating db
      inquirer.prompt([
        {
          name: "sure",
          type: "confirm",
          message: "Are you sure you want to make this purchase?",
          default: true
        }
      ]).then(function (answer) {

        //if the user confirms YES and we have the items in stock, we sell to the user and update the database table
        if(answer.sure === true){
          itemsLeft = itemAmount - a.howMany;
          if(itemsLeft >= 0){
            connection.query("UPDATE products SET stock_quantity="+itemsLeft+" WHERE item_id='"+itemID+"'", function(err, res){
              if(err) throw err;
              console.log("Congrats! You are now the owner of " + a.howMany + " " + itemName + ".");
              homePage();
            })
          }
          //if user confirms YES but items are not in stock, we inform user and restart function makeAPurchase() to order a different amount
          else if(itemsLeft < 0){
            console.log("Oops! Looks like we don't have that many " + itemName + " available to purchase.\n");
            makeAPurchase();
          }
        }

        //If they cancel the order by NOT confirming, we will take them to the homePage() for new orders.
        else {
          console.log("Ok, window shopper! Let's start over, shall we?");
          homePage();
        }
      })
    
    })
  }
  })
}





//----------------------------------------------------- SPECIAL FUNCTION FOR REBELS WHO PRESS 'N' INSTEAD OF CONTINUE WHILE BROWSING --//

function rebel(){
  connection.query("SELECT product_name AS Rebel_Items, price AS Rebel_Price, department AS Department FROM products WHERE id=14", function(err, res){
console.table(res);
    console.log("May I suggest a Rubix Cube? It is easier to break than Alyssa's code.");
    inquirer.prompt([
      {
        name: "rebelBuy",
        type: "list",
        message: "I want to purchase the Rubix Cube.",
        choices: ["YES", "NO", "IDK"]
      }
    ]).then(function(answer){
      if(answer.rebelBuy === "YES"){
        console.log("\n Good choice, rebel.");
        itemID = 14;
        makeAPurchase();
      }
      else if (answer.rebelBuy === "NO"){
        console.log("\n Suit yourself, rebel.");
        homePage();
      }
      else if (answer.rebelBuy === "IDK"){
        console.log("\n I see.... why don't we start fresh.");
        console.log("This time, maybe you can follow instructions?")
        console.log(" (: \n");
        homePage();
      }
    })
  })
}

