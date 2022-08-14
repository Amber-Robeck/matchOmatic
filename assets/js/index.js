//random pictures if api call fails or user chooses random
const dData = [
    {
        name: "gZilla",
        img: "./assets/images/gZilla.png",
    },
    {
        name: "mike",
        img: "./assets/images/mike.png",
    },
    {
        name: "gZilla",
        img: "./assets/images/gZilla.png",
    },
    {
        name: "mike",
        img: "./assets/images/mike.png",
    }
];

//Retrieve cat data from api
catUrl = "https://cataas.com/cat";
const catData = [
    {
        name: "cat1",
        img: catUrl
    },
    {
        name: "cat2",
        img: catUrl + "?t=sm",
    },
    {
        name: "cat3",
        img: catUrl + "?t=md",
    },
    {
        name: "cat4",
        img: catUrl + "?t=sq",
    }
];
let arr = [];
let grid;
let correctMatches = 0;
let numberOfGuesses = 0;
let fetchData = [];
let userChoice = [];
let winningPairs = [];
let matchingSelection;

//function to fetch random images of puppies and then push item twice into fetchData array
async function fetchPuppy() {
    //Dog API call    
    url = "https://dog.ceo/api/breeds/image/random";
    await fetch(url)
        .then(response => response.json())
        .then(data => {
            fetchData.push({
                name: `puppy${fetchData.length}`,
                img: data.message,
            }, {
                name: `puppy${fetchData.length}`,
                img: data.message,
            })
        })
        .catch(err => console.log(err));
};

//Checking to see if data exists otherwise use default data
async function checkData() {
    fetchData.length ? arr = fetchData : arr = dData;
    return arr;
};

//function to mix the array
function mixArray(array) {
    return array.sort(() => 0.5 - Math.random());
};

//function to run the dog fetch 4 times
async function callPuppy() {
    fetchData = [];
    for (let i = 0; i < 4; i++) {
        await fetchPuppy()
    };
    return fetchData;
};

async function fetchPuppyData() {
    await clearData();
    await callPuppy();
    await checkData();
    //still unsure about this not being async, first time wasn't shuffled but after that every time it was
    mixAndMake(fetchData);
};

async function fetchKittenData() {
    await clearData();
    arr = [];
    arr = catData.concat(catData);
    mixAndMake(arr);
};

async function fetchRandomData() {
    await clearData();
    arr = dData
    mixAndMake(arr);
};

function mixAndMake(array) {
    mixArray(array);
    makeGrid();
    makeCard();
};

function makeGrid() {
    //create the grid
    grid = document.createElement("div");
    grid.setAttribute("id", "grid");
    document.body.append(grid);
};

function makeCard() {
    //create the cards and append to grid
    for (let i = 0; i < arr.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("class", "card");
        card.setAttribute("data-id", i);
        //Set to background image for start of game play
        card.setAttribute("src", "./assets/images/background.png");
        card.addEventListener("click", turnCard);
        grid.appendChild(card);
    };
};

function makeFlippableCard() {
    //create the cards and append to grid
    for (let i = 0; i < arr.length; i++) {
        let cardFront = document.createElement("img");
        cardFront.setAttribute("class", "card front");
        cardFront.setAttribute("data-id", i + 4);
        //Set to background image for start of game play
        cardFront.setAttribute("src", "./assets/images/background.png");
        cardFront.addEventListener("click", turnCard);
        grid.appendChild(cardFront);
    };
    for (let i = 0; i < arr.length; i++) {
        let cardBack = document.createElement("img");
        cardBack.setAttribute("class", "card back");
        cardBack.setAttribute("data-id", i + 4);
        //Set to background image for start of game play
        cardBack.setAttribute("src", "./assets/images/background.png");
        // cardBack.addEventListener("click", turnCard);
        grid.appendChild(cardBack);
    };
};

//turning the card over by setting image by data-id
function turnCard() {
    cardId = this.getAttribute("data-id");
    //if card clicked is not the one already clicked
    if (cardId !== userChoice[0]?.id && cardId !== userChoice[1]?.id) {
        //changes image to the picture from the array
        this.setAttribute("src", arr[cardId].img);
        //If userChoice array is less than 2, push the cardId to the array
        if (userChoice.length < 2) {
            userChoice.push({ id: cardId, name: arr[cardId].name });
        };
        //if I use else if, this condition doesn't run until there are three cards Perhaps change to switch for long term
        //create checkMatch function to store these items
        //If userChoice array is equal to 2, run checkMatch function
        if (userChoice.length === 2) {
            let choiceOne = document.querySelector('[data-id="' + userChoice[0].id + '"]');
            let choiceTwo = document.querySelector('[data-id="' + userChoice[1].id + '"]');
            let cards = document.querySelectorAll('.card');
            //remove event listener from cards so they can't be clicked during validation
            cards.forEach(card => {
                card.removeEventListener("click", turnCard);
            });
            //alert disrupts gameplay would like to change to modal or display on page
            // console.log("checking for match");
            // setTimeout(userAlert("Checking for match..."), 3000);
            userAlert("checking for match");
            if (userChoice[0].name !== userChoice[1].name) {
                userAlert("no match");
                numberOfGuesses++;
                //change cards back to background image
                //timeout function to allow user to see the second card choice
                setTimeout(function () {
                    console.log(userChoice[0].id, userChoice[1].id);
                    choiceOne.setAttribute("src", "./assets/images/background.png");
                    choiceTwo.setAttribute("src", "./assets/images/background.png");
                    //no match returns event listener
                    //need to check to make sure not in winning pair array
                    cards.forEach(card => {
                        card.addEventListener("click", turnCard);
                    });
                    userChoice = [];
                }, 1500);
            } else {
                userAlert("match");
                //push winning pairs into array to compare for event listener
                winningPairs.push(userChoice[0].id, userChoice[1].id);
                numberOfGuesses++;
                //remove eventlistener from cards once matched
                cards.forEach(card12 => {
                    if (winningPairs.includes(card12.getAttribute("data-id"))) {
                        card12.removeEventListener("click", turnCard);
                    } else {
                        card12.addEventListener("click", turnCard);
                    }
                });
                //calculate if all matches were found and you win message
                let winnerAmmount = document.querySelectorAll('.card').length / 2;
                if (correctMatches === winnerAmmount) {

                    console.log(winnerAmmount)
                }
                correctMatches++;
                let newMatchDisplay = document.getElementById("matches");
                newMatchDisplay.innerHTML = `${matchingSelection} Matches: ${correctMatches}`;
                userChoice = [];
                if (correctMatches === winnerAmmount) {
                    let finalScore = (correctMatches * 10) + winnerAmmount - numberOfGuesses;
                    if (finalScore < 0) {
                        finalScore = correctMatches;
                    }
                    makeModal(correctMatches, numberOfGuesses, finalScore);
                    localStorageSave(finalScore);
                };
            };
        };
    } else {
        console.log("already chosen");
    };
};

//creating header and score
function makeHeader() {
    let header = document.createElement("header");
    header.setAttribute("id", "header");
    let title = document.createElement("h1");
    title.setAttribute("id", "title");
    title.innerHTML = "MatchOMatic";
    header.append(title);
    let message = document.createElement("p");
    message.setAttribute("id", "message");
    message.innerHTML = "Select a choice to start matching"
    header.append(message);
    let matches = document.createElement("div");
    matches.setAttribute("id", "matches");
    matches.innerHTML = "Matches: 0";
    header.append(matches);
    let userOptionsDiv = document.createElement("div");
    userOptionsDiv.setAttribute("id", "options");
    let choices = ["Dogs", "Cats", "Random"];
    for (let i = 0; i < choices.length; i++) {
        let choiceButton = document.createElement("button");
        choiceButton.setAttribute("id", choices[i].toLowerCase());
        choiceButton.innerHTML = choices[i];
        choiceButton.addEventListener("click", changeGame);
        userOptionsDiv.append(choiceButton);
    };
    header.append(userOptionsDiv);
    document.body.prepend(header);
};


//Modal for winning message
function makeModal(matches, guesses, finalScore) {
    let modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    let modalContent = document.createElement("div");
    modalContent.setAttribute("id", "modalContent");
    let modalMessage = document.createElement("p");
    modalMessage.setAttribute("id", "modalMessage");
    modalMessage.innerHTML = ` YOU WIN!!! You found ${matches} matches in ${guesses} guesses! Your final score is ${finalScore}.`;
    modalContent.append(modalMessage);
    let modalButton = document.createElement("button");
    modalButton.setAttribute("id", "modalButton");
    modalButton.innerHTML = "Play Again";
    modalButton.addEventListener("click", clearData);
    modalContent.append(modalButton);
    modal.append(modalContent);
    grid.append(modal);
};

//clears all data from the grid to fix button click issue
async function clearData() {
    if (document.getElementById('grid')) {
        grid.remove();
    }
    matches.innerHTML = "Matches: 0";
    // matches.removeAttribute("class", "winner")
    correctMatches = 0;
    numberOfGuesses = 0;
    userChoice = [];
    winningPairs = [];
    arr = [];
};

//function to change game based on button click
function changeGame(e) {
    let optionPicked = e.target.id;
    switch (optionPicked) {
        case "dogs":
            console.log("dogs");
            fetchPuppyData();
            matchingSelection = "Dog";
            document.getElementById("matches").innerHTML = matchingSelection + " Matches: 0";
            break;
        case "cats":
            console.log("cats");
            fetchKittenData();
            matchingSelection = "Cat";
            document.getElementById("matches").innerHTML = matchingSelection + " Matches: 0";
            break;
        case "random":
            console.log("random");
            fetchRandomData();
            matchingSelection = "Random";
            document.getElementById("matches").innerHTML = matchingSelection + " Matches: 0";
            break;
    }
};


function userAlert(string) {
    let message = document.getElementById("message");
    message.setAttribute("class", "alert");
    message.innerHTML = string.toUpperCase();
    setTimeout(function () {
        message.innerHTML = "Select a choice to start matching";
        message.removeAttribute("class", "alert");
    }, 1500);

};

// function localStorageSave(finalScore) {
//     let highscore = localStorage.getItem("highscore") || [];
//     console.log(matchingSelection)
//         highscore = JSONParse(highscore);
//         highscore.push({ matchingSelection: finalScore });
//     }
//     localStorage.setItem("highscores", JSON.stringify(highscore));
// }

function localStorageSave(finalScore) {
    if (localStorage.getItem("highscore") === null) {
        localStorage.setItem("highscore", JSON.stringify([]));
    }
    let highscore = localStorage.getItem("highscore") || [];
    highscore = JSON.parse(highscore);
    highscore.push({ matchingSelection, finalScore });
    localStorage.setItem("highscore", JSON.stringify(highscore));
}

//function to create the header allowing user to choose game type
makeHeader();

//TODO:
//add animation to cards flipping over
//add sound to cards flipping over
//add local storage to save high score