// global variables
var chances = 1;
var win = false;
var password = "";
var password1 = "";
var freezeClic = false;

//initialize password to guess
password = generatePassword();
function generatePassword() {
    var passwordsList = [
        "Actions speak louder than words",
        "A bad workman always blames his tools",
        "A bird in hand is worth two in the bush",
        "A cat has nine lives",
        "A chain is only as strong as its weakest link",
        "A drowning man will clutch at a straw",
        "A fool and his money are soon parted",
        "All good things come to an end",
        "All is well that ends well",
        "As you sow so you shall reap",
        "Best things in life are free"
    ];

    var rand = Math.floor(Math.random() * (passwordsList.length));
    console.log(rand);
    password = passwordsList[rand];
    password = password.toUpperCase();
    return password;
}

//display obscured password
for (i = 0; i < password.length; i++) {
    if (password.charAt(i) == " ") password1 += " ";
    else password1 += "-";
}

function updateBoard() {
    document.getElementById("board").innerHTML = password1;
}

//initialize alphabet array
var letters = new Array(26);
letters = createAplhabetArray();

function createAplhabetArray() {

    letters[0] = "A";
    letters[1] = "B";
    letters[2] = "C";
    letters[3] = "D";
    letters[4] = "E";
    letters[5] = "F";
    letters[6] = "G";
    letters[7] = "H";
    letters[8] = "I";
    letters[9] = "J";
    letters[10] = "K";
    letters[11] = "L";
    letters[12] = "M";
    letters[13] = "N";
    letters[14] = "O";
    letters[15] = "P";
    letters[16] = "Q";
    letters[17] = "R";
    letters[18] = "S";
    letters[19] = "T";
    letters[20] = "U";
    letters[21] = "V";
    letters[22] = "W";
    letters[23] = "X";
    letters[24] = "Y";
    letters[25] = "Z";

    return letters;
}

//display game in initial stage
function start() {
    var div_content = "";
    for (i = 0; i < letters.length; i++) {
        div_content = div_content + '<div class="letter" id="let' + i + '" onclick="checkLetter(' + i + ')">' + letters[i] + '</div>';
        if ((i + 1) % 7 == 0) div_content = div_content + '<div style="clear:both;"></div>'
    }
    document.getElementById("alphabet").innerHTML = div_content;

    updateBoard();
}

//create partial password
String.prototype.setChar = function (position, char) {
    if (position > this.length - 1) return this.toString();
    else return this.substr(0, position) + char + this.substr(position + 1);
}

//check if choosen letter is in a password and mark chosen letter
function checkLetter(num) {

    var good = false;
    for (i = 0; i < password.length; i++) {

        if (password.charAt(i) == letters[num]) {
            password1 = password1.setChar(i, letters[num]);
            good = true;
        }
    }
    if (good == true) {
        markGood(num);
        updateBoard();
        if (password1 == password) win = true;
    } 
    else {
        markBad(num);
        chances++;
        document.getElementById("hangman").innerHTML = '<img src="img/hang' + chances + '.jpg" alt="">';
    }
    checkIfGameEnded();
}

//color green and disable click on good letter
function markGood(num) {
    var id = "";
    id = 'let' + num;
    var element = document.getElementById(id);
    element.classList.add("good");
    element.setAttribute("onclick", ";");
}

//color red and disable click on bad letter
function markBad(num) {
    var id = "";
    id = 'let' + num;
    var element = document.getElementById(id);
    element.classList.add("bad");
    element.setAttribute("onclick", ";");
}
//function calling functions for win and loose
function checkIfGameEnded() {
    if (chances == 10) gameOver();
    if (win == true) winner();
}

//show game over message and restart
function gameOver() {
    var end = document.getElementById("endGame");
    end.setAttribute('style', 'display:block');
    end.innerText = "Game Over";
    end.classList.add("looser");
    freezeClic = true;
    disableMouse(freezeClic);
    setTimeout(reload, 5000);
}

//show congrats message and restart
function winner() {
    var end = document.getElementById("endGame");
    end.setAttribute('style', 'display:block');
    end.innerText = "Congratulations";
    end.classList.add("winner");
    freezeClic = true;
    disableMouse(freezeClic);
    setTimeout(reload, 5000);
}

//disable mouse clicks after game ended
function disableMouse(clic) {
    document.addEventListener("click", e => {
        if (clic) {
            e.stopPropagation();
            e.preventDefault();
        }
    }, true);
}

//restart
function reload() {
    window.location.reload(true);
}

//load game
window.onload = start;