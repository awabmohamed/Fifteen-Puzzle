
// Records starting time
var start = new Date();

// Records number of moves
var moves = 0;


var ids = [
    "one",      "two",      "three",   "four",
    "five",     "six",      "seven",   "eight",
    "nine",     "ten",      "eleven",  "twelve",
    "thirteen", "fourteen", "fifteen", ""
];

// copy the ids into the shuffled array
var shuffled = ids.slice();

// maps numbers to digits
var ids_numeric = {
    "one":1,       "two":2,       "three":3,    "four":4,
    "five":5,      "six":6,       "seven":7,    "eight":8,
    "nine":9,      "ten":10,      "eleven":11,  "twelve":12,
    "thirteen":13, "fourteen":14, "fifteen":15, "sixteen":16
};

// Once the person changes the background, the current background is stored here
var selected_background;

// top right bottom left
//[ 0,   1,    1,    0  ]
var movement = [
    [0, 1, 1, 0], //0: one
    [0, 1, 1, 1], //1: two
    [0, 1, 1, 1], //2: three
    [0, 0, 1, 1], //...
    [1, 1, 1, 0], 
    [1, 1, 1, 1], 
    [1, 1, 1, 1], 
    [1, 0, 1, 1], 
    [1, 1, 1, 0], 
    [1, 1, 1, 1], 
    [1, 1, 1, 1], 
    [1, 0, 1, 1], 
    [1, 1, 0, 0], 
    [1, 1, 0, 1], 
    [1, 1, 0, 1], 
    [1, 0, 0, 1]  
];

// The available background(s)
var background = ["super-mario"];


function initializeGame() {
    var background_id = Math.floor(Math.random() * background.length);
    selected_background = background[background_id];

    var backgroundElement = document.getElementById(selected_background);
    if (backgroundElement) {
        backgroundElement.selected = true;
    } else {
        console.error('Element not found. Check the ID or selector.');
    }

    for (var i = 0; i < ids.length - 1; i++) {
        document.getElementById(ids[i]).className = "tile " + selected_background;
    }
}
function changeBackground() {
    var class_name = document.getElementById("characters").value;

    if (background.indexOf(class_name) < 0) {
        return;
    }

    selected_background = class_name;

    var mainElement = document.getElementById("main");
    mainElement.innerHTML = "";

    for (var i = 0; i < ids.length; i++) {
        if (ids[i] == "") {
            mainElement.innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = ids[i];
            var tileElement = document.createElement("div");
            tileElement.id = ids[i];
            tileElement.className = "tile " + selected_background; // Apply the new class here
            tileElement.innerText = ids_numeric[id_name];
            mainElement.appendChild(tileElement);
        }
    }
}


/**
 * Shuffles the board
 * Generates a random number between 0 and 3: used for the movement array.
 */
function shuffleBoard() {
    shuffled = ids.slice(); // Reinitialize the shuffled array
    var sixteen = 15;

    for (var i = 0; i < 500; i++) {
        var movement_id = Math.floor((Math.random() * 4));

        while (movement[sixteen][movement_id] != 1) {
            movement_id = Math.floor((Math.random() * 4));
        }

        var move_to;

        switch (movement_id) {
            case 0:
                move_to = sixteen - 4;
                break;
            // subtract 4 to go to the top
            case 1:
                move_to = sixteen + 1;
                break;
            // add 1 to go to the right
            case 2:
                move_to = sixteen + 4;
                break;
            // subtract 4 to go to the bottom
            case 3:
                move_to = sixteen - 1;
                break;
            // subtract 1 to go to the left
        }

        var temp = shuffled[sixteen];
        shuffled[sixteen] = shuffled[move_to];
        shuffled[move_to] = temp;

        sixteen = move_to;
    }

    var mainElement = document.getElementById("main");
    mainElement.innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            mainElement.innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            var tileElement = document.createElement("div");
            tileElement.id = shuffled[i];
            tileElement.className = "tile";
            tileElement.innerText = ids_numeric[id_name];
            mainElement.appendChild(tileElement);
        }
    }

    // Add the selected background class to each tile
    var tiles = document.getElementsByClassName("tile");
    for (var i = 0; i < tiles.length; i++) {
        tiles[i].classList.add(selected_background);
    }

    displayBoard();
}



function displayBoard() {
    var mainElement = document.getElementById("main");
    mainElement.innerHTML = "";

    for (var i = 0; i < shuffled.length; i++) {
        if (shuffled[i] == "") {
            mainElement.innerHTML += '<div id="sixteen" class="tile"></div>';
        } else {
            var id_name = shuffled[i];
            var tileElement = document.createElement("div");
            tileElement.id = shuffled[i];
            tileElement.className = "tile " + selected_background;
            tileElement.innerText = ids_numeric[id_name];
            mainElement.appendChild(tileElement);
        }
    }

    var clickable_id;

    if (movement[shuffled.indexOf("")][0] == 1) {
        clickable_id = shuffled.indexOf("") - 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][1] == 1) {
        clickable_id = shuffled.indexOf("") + 1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][2] == 1) {
        clickable_id = shuffled.indexOf("") + 4;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }

    if (movement[shuffled.indexOf("")][3] == 1) {
        clickable_id = shuffled.indexOf("") -1;
        document.getElementById(shuffled[clickable_id]).className += " clickable";
        document.getElementById(shuffled[clickable_id]).setAttribute("onclick", "swapPieces(" + clickable_id + ", " + shuffled.indexOf("") + ")");
    }
}

/**total number of moves the player has done
 * @param clickable_id
 * @param empty_id
 */
function swapPieces(clickable_id, empty_id) {
    animateMovement(clickable_id, empty_id);

    setTimeout(function() {
        var temp = shuffled[empty_id];
        shuffled[empty_id] = shuffled[clickable_id];
        shuffled[clickable_id] = temp;

        moves++;

        displayBoard();
        checkIfWon();
    }, 600);
}

/**
 * Animates the movement of the blocks
 * @param clickable_id
 * @param empty_id
 */
function animateMovement(clickable_id, empty_id) {
    if (clickable_id - 4 == empty_id) {
        console.log(shuffled[clickable_id]);
        document.getElementById(shuffled[clickable_id]).className += " animate-up";
    } else if (clickable_id + 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-right";
    } else if (clickable_id + 4 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-down";
    } else if (clickable_id - 1 == empty_id) {
        document.getElementById(shuffled[clickable_id]).className += " animate-left";
    }
}

/**
 * Checks to see if the user won
 */
function checkIfWon() {
    if (ids.toString() == shuffled.toString()) { // Test the image, time and number of turns by swapping == to !=
        var end        = new Date();
        var elapsed_ms = end - start;
        var seconds    = Math.round(elapsed_ms / 1000);

        var html = "";
        html += "<img src='super_mariowin.jpg' alt='You win' />";
		 html += "<p> YOU WIN!! </p>";
        html += "<p>Total time it took you to solve this puzzle (in seconds): " + seconds + "</p>";
        html += "<p>Total number of moves it took you to solve this puzzle: " + moves + "</p>";

        document.getElementById("win").innerHTML = html;
    }
}


function solvePuzzle() {
    // Rearrange the shuffled array back to the original order (ids array)
    shuffled = ids.slice();

    // Reset the number of moves to zero
    moves = 0;

    // Display the solved puzzle
    displayBoard();
	  // Check if the puzzle is solved and display the win message
    checkIfWon();
}