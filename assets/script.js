window.onload = function () {

    var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];

    var categ;
    var chosenCategory;
    var getHint;
    var word;
    var guess;        
    var guessLetter = [];
    var lives;      
    var counter;     
    var space;


    var showLives = document.getElementById("mylives");
    var showCatagory = document.getElementById("scatagory");
    var getHint = document.getElementById("hint");
    var showClue = document.getElementById("clue");



    var buttons = function () {
        myButtons = document.getElementById('buttons');
        letters = document.createElement('ul');

        for (var i = 0; i < alphabet.length; i++) {
            letters.id = 'alphabet';
            list = document.createElement('li');
            list.id = 'letter';
            list.innerHTML = alphabet[i];
            check();
            myButtons.appendChild(letters);
            letters.appendChild(list);
        }
    }



    var selectCat = function () {
        if (chosenCategory === categ[0]) {
            catagoryName.innerHTML = "Category: Sea Creatures";
        } else if (chosenCategory === categ[1]) {
            catagoryName.innerHTML = "Category: Underwater Films and Shows";
        } else if (chosenCategory === categ[2]) {
            catagoryName.innerHTML = "Category: World Oceans";
        }
    }


    result = function () {
        wordHolder = document.getElementById('hold');
        correct = document.createElement('ul');

        for (var i = 0; i < word.length; i++) {
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
            } else {
                guess.innerHTML = "_";
            }

            guessLetter.push(guess);
            wordHolder.appendChild(correct);
            correct.appendChild(guess);
        }
    }


    comments = function () {
        showLives.innerHTML = "You have " + lives + " lives";
        if (lives < 1) {
            showLives.innerHTML = "You drowned in failure! Why don't you try again?";
        }
        for (var i = 0; i < guessLetter.length; i++) {
            if (counter + space === guessLetter.length) {
                showLives.innerHTML = "You Win!!!";
            }
        }
    }

 

    var animate = function () {
        var drawMe = lives;

    }

    canvas = function () {

        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.strokeStyle = "#fff";
        context.lineWidth = 2;
    };

    head = function () {
        myStickman = document.getElementById("stickman");
        context = myStickman.getContext('2d');
        context.beginPath();
        context.arc(60, 25, 10, 0, Math.PI * 2, true);
        context.stroke();
    }


    check = function () {
        list.onclick = function () {
            var guess = (this.innerHTML);
            this.setAttribute("class", "active");
            this.onclick = null;
            for (var i = 0; i < word.length; i++) {
                if (word[i] === guess) {
                    guessLetter[i].innerHTML = guess;
                    counter += 1;
                }
            }
            var j = (word.indexOf(guess));
            if (j === -1) {
                lives -= 1;
                comments();
                animate();
            } else {
                comments();
            }
        }
    }



    play = function () {
        categ = [
            ["clownfish", "cichlid", "starfish", "orca", "squid", "bloodparrot", "dolphin", "plecostomus"],
            ["little-mermaid", "spongebob", "free-willy", "finding-nemo", "jaws"],
            ["atlantic", "pacific", "indian", "arctic", "southern"]
        ];

        chosenCategory = categ[Math.floor(Math.random() * categ.length)];
        word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
        word = word.replace(/\s/g, "-");
        console.log(word);
        buttons();

        guessLetter = [];
        lives = 10;
        counter = 0;
        space = 0;
        result();
        comments();
        selectCat();
        canvas();
    }

    play();


    hint.onclick = function () {

        hints = [
            ["A small orange saltwater fish", "A popular genre of aquarium fish, generally of medium size and ovate in shape", "Marine invertebrate that typically has five arms", "Common type of whale", "Sea creature with two tentacles", "A genetically altered tropical fish", "A large fish known for being smart and graceful", "Commonly referred to as 'bottom feeders'"],
            ["Popular Disney princess", "Cartoon about a creature who lives in a pineapple under the sea", "Cult classic about a whale", "A concerned father searches the ocean for his lost son", "The movie that generated many peoples' fear of sharks"],
            ["Home to walruses and bluefin tuna", "An ocean so vast that it covers more area than all the land masses combined", "Touches Asia, Africa, and Australia", "Smallest and shallowest of the world's five major oceans", "Surrounds Antarctica"]
        ];

        var catagoryIndex = categ.indexOf(chosenCategory);
        var hintIndex = chosenCategory.indexOf(word);
        showClue.innerHTML = "Hint: " + hints[catagoryIndex][hintIndex];
    };


//    resets the game
    document.getElementById('reset').onclick = function () {
        correct.parentNode.removeChild(correct);
        letters.parentNode.removeChild(letters);
        showClue.innerHTML = "";
        context.clearRect(0, 0, 400, 400);
        play();
    }
}


