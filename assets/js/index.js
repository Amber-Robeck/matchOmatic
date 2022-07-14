//random pictures if api call fails
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
let arr = [];
let grid;
let scorePoints = 0;
let fetchData = [];
let userChoice = [];



//function to fetch random images of puppies and then push item twice into fetchData array
async function fetchPuppy() {
    //Dog API call    
    await fetch("https://dog.ceo/api/breeds/image/random")
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






async function checkData() {
    fetchData.length ? arr = fetchData : arr = dData;
    return arr;
};

function mixArray(array) {
    return array.sort(() => 0.5 - Math.random());
};

async function callPuppy() {
    for (let i = 0; i < 4; i++) {
        await fetchPuppy()
    };
    return fetchData;
};

async function makeGame() {
    await callPuppy();
    await checkData();
    await mixArray(fetchData);
    //create the grid
    grid = document.createElement("div");
    grid.setAttribute("id", "grid");
    document.body.prepend(grid);
    //adding header with title and score elements
    let header = document.createElement("header");
    header.setAttribute("id", "header");
    let title = document.createElement("h1");
    title.setAttribute("id", "title");
    title.innerHTML = "MatchOMatic";
    header.append(title);
    let score = document.createElement("div");
    score.setAttribute("id", "score");
    score.innerHTML = "Score: 0";
    header.append(score);
    document.body.prepend(header);
    makeCard();
};

function makeCard() {
    //create the cards and append to grid
    for (let i = 0; i < arr.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("class", "card");
        //this can't be used or players can find from inspecting the page
        // card.setAttribute("data-name", dData[i].name);
        card.setAttribute("data-id", i);
        //Set to background image for start of game play
        card.setAttribute("src", "./assets/images/background.png");
        card.addEventListener("click", turnCard);
        grid.appendChild(card);
    };
};

//turning the card over by setting image by data-id
function turnCard() {
    cardId = this.getAttribute("data-id");
    //changes image to the picture from the array
    this.setAttribute("src", arr[cardId].img);
    //If userChoice array is less, push the cardId to the array
    if (userChoice.length < 2) {
        userChoice.push({ id: cardId, name: arr[cardId].name });
    };
    //if I use else if, this condition doesn't run until there are three cards Perhaps change to switch for long term
    //create checkMatch function to store these items
    //If userChoice array is equal to 2, run checkMatch function
    if (userChoice.length === 2) {
        //alert disrupts gameplay would like to change to modal or display on page
        console.log("checking for match");
        if (userChoice[0].name === userChoice[1].name) {
            console.log("match");
            //to add if score ===4 then alert player won
            scorePoints++;
            document.getElementById("score").innerHTML = `Score: ${scorePoints}`;
            userChoice = [];
        }
        else {
            console.log("no match");
            //change cards back to background image
            //timeout function to allow user to see the second card choice
            setTimeout(function () {
                console.log(userChoice[0].id, userChoice[1].id);
                let choice1 = document.querySelector('[data-id="' + userChoice[0].id + '"]');
                choice1.setAttribute("src", "./assets/images/background.png");
                let choice2 = document.querySelector('[data-id="' + userChoice[1].id + '"]');
                choice2.setAttribute("src", "./assets/images/background.png");
                userChoice = [];
            }, 1500);
        }
    }
}

//function to start the game
makeGame();

