

// store chosen character
var character = {};

// store chosen enemy
var defender = {};

// store # of enemies defeated
var enemiesDefeated = 0;

var characterSelected = false;

var defenderSelected = false;

gameOver = false;

// players

var leopard = {
  name: "leopard",
  health: 120,
  baseAttack: 10,
  attack: 10
};

var giraffe = {
  name: "giraffe",
  health: 100,
  baseAttack: 10,
  attack: 10
};

var elephant = {
  name: "elephant",
  health: 150,
  baseAttack: 20,
  attack: 20
};

var lion = {
  name: "lion",
  health: 180,
  baseAttack: 25,
  attack: 25
};

var zebra = {
    name: "zebra",
    health: 110,
    baseAttack: 8,
    attack: 8
};


function initializeCharacter(chosenCharacter) {
  character.name = chosenCharacter.name;
  character.health = chosenCharacter.health;
  character.baseAttack = chosenCharacter.baseAttack;
  character.attack = chosenCharacter.attack;
}


function initializeDefender(chosenDefender) {
  defender.name = chosenDefender.name;
  defender.health = chosenDefender.health;
  defender.baseAttack = chosenDefender.baseAttack;
  defender.attack = chosenDefender.attack;
}

// move other players to enemy section
function moveToEnemies() {
  $(".availablecharacter").removeClass("availablecharacter").addClass("enemy-character");
  $("#enemies-available").append($(".enemy-character"));
}

// resets game
function resetGame() {
 
  $("#leopard-character").children(".health").html(leopard.health);
  $("#giraffe-character").children(".health").html(giraffe.health);
  $("#elephant-character").children(".health").html(elephant.health);
  $("#lion-character").children(".health").html(lion.health);
  $("#zebra-character").children(".health").html(zebra.health);

  $(".character-image").removeClass("player enemy-character defender-character").addClass("availablecharacter");
  var available = $(".availablecharacter").show();
  $("#characters-available").html(available);

  $("#game-message").empty();
  $("#restart").hide();

  characterSelected = false;
  defenderSelected = false;
  enemiesDefeated = 0;
  gameOver = false;

  character = {};
  defender = {};
}







$(document).ready(function() {


  $("#restart").hide();

//if user selects leopard
  $("#leopard-character").on("click", function () {
    console.log("You selected the leopard");

    
    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(leopard);
      characterSelected = true;

      $("#leopard-character").removeClass("availablecharacter").addClass("player");
      $("#player").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

        //if user selects leopard for enemy
      if($("#leopard-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(leopard);
        defenderSelected = true;

        $("#leopard-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  //if user selects giraffe
  $("#giraffe-character").on("click", function () {
    console.log("You selected the giraffe");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(giraffe);
      characterSelected = true;

      $("#giraffe-character").removeClass("availablecharacter").addClass("player");
      $("#player").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      //if user selects giraffe as enemy
      if($("#giraffe-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(giraffe);
        defenderSelected = true;

        $("#giraffe-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  //if user selects elephant
  $("#elephant-character").on("click", function () {
    console.log("You selected the elephant");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(elephant);
      characterSelected = true;

      $("#elephant-character").removeClass("availablecharacter").addClass("player");
      $("#player").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      //if user selects elephant as enemy
      if($("#elephant-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(elephant);
        defenderSelected = true;

        $("#elephant-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  //if user selects lion
  $("#lion-character").on("click", function () {
    console.log("You selected the lion");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(lion);
      characterSelected = true;

      $("#lion-character").removeClass("availablecharacter").addClass("player");
      $("#player").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      //if user selects lion as enemy
      if($("#lion-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(lion);
        defenderSelected = true;

        $("#lion-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });

  //if user selects zebra
  $("#zebra-character").on("click", function () {
    console.log("You selected the zebra");

    if(characterSelected == false) {
      $("#game-message").empty();

      initializeCharacter(zebra);
      characterSelected = true;

      $("#zebra-character").removeClass("availablecharacter").addClass("player");
      $("#player").append(this);

      moveToEnemies();
    } else if ((characterSelected == true) && (defenderSelected == false)) {

      //user selects zebra as enemy
      if($("#zebra-character").hasClass("enemy-character")) {
        $("#game-message").empty();

        initializeDefender(zebra);
        defenderSelected = true;

        $("#zebra-character").removeClass("enemy-character").addClass("defender-character");
        $("#defender-section").append(this);
      }
    }
  });






  $("#attack").on("click", function() {
    console.log("You pressed attack!");
    console.log("Player Stats: " + JSON.stringify(character));
    console.log("Enemy Stats: " + JSON.stringify(defender));

    if (characterSelected && defenderSelected && !gameOver) {

      defender.health = defender.health - character.attack;
      $(".defender-character").children(".health").html(defender.health);
      $("#game-message").html("<p>The " + defender.name + " was hit with " + character.attack + " damage.<p>");

      //attack power increases after each attack
      character.attack = character.attack + character.baseAttack;

      if (defender.health > 0) {
        character.health = character.health - defender.baseAttack;
        $(".player").children(".health").html(character.health);

        if (character.health > 0) {
          $("#game-message").append("<p>The " + defender.name + " strikes back with " + defender.baseAttack + " damage.</p>");
        } else {
//changes health div to string message when user loses the game
            $("#zebra-character").children(".health").html("Take it ezy, bra!");
            $("#lion-character").children(".health").html("Check meowt");
            $("#giraffe-character").children(".health").html("Giraffing at me??");
            $("#leopard-character").children(".health").html("Someone call a purr-amedic");
            $("#elephant-character").children(".health").html("Scores are irrelephant anyway");
          gameOver = true;
          $("#game-message").html("<p>You were demolished!</p><p>Why don't you try again?</p>");
          $("#restart").show();
        }
      } else {

        enemiesDefeated++;
        defenderSelected = false;
        $("#game-message").html("<p>You beat the " + defender.name + ". Choose your next prey.</p>");
        $(".defender-character").hide();

//check if user wins
        if (enemiesDefeated === 4) {
          gameOver = true;
          $("#game-message").html("<p>You defeated all the animals!!!</p><p>Wanna play again?</p>");
          $("#restart").show();
        }
      }
    } else if (!characterSelected && !gameOver) {
      $("#game-message").html("<p>Select your battle character.</p>");
    } else if (!defenderSelected && !gameOver) {
      $("#game-message").html("<p>Choose an enemy to fight.</p>");
    }

    console.log("player: " + character.name + ". Current Attack: " + character.attack + " Health: " + character.health);
    console.log("opponent: " + defender.name + ". Current Attack: " + defender.attack + " Health: " + defender.health);
  });

  $("#restart").on("click", function() {
    console.log("You started a new game");

    resetGame();
  });

});
