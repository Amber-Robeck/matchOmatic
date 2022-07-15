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

//While this does return 4 different images due to adding different params, it does not change images often like the puppy api
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
let scorePoints = 0;
let fetchData = [];
let userChoice = [];

console.log(catData)

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
    await mixArray(fetchData);
    //clears grid before creating new grid for button to button clicking bug
    makeGrid();
    makeCard();
};

async function fetchKittenData() {
    //clears grid before creating new grid for button to button clicking bug
    await clearData();
    arr = [];
    arr = catData.concat(catData);
    mixArray(arr);
    makeGrid();
    makeCard();
};

async function fetchRandomData() {
    //clears grid before creating new grid for button to button clicking bug
    await clearData();
    arr = [];
    arr = dData
    mixArray(arr);
    makeGrid();
    makeCard();
}

function makeGrid() {
    // //clears grid before creating new grid for button to button clicking bug
    // clearGrid();
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
    console.log(cardId);
    console.log(userChoice[0]?.id);
    if (cardId !== userChoice[0]?.id) {
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
    } else {
        console.log("already chosen");
    }
};


function makeHeader() {
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

async function clearData() {
    if (document.getElementById('grid')) {
        grid.remove();
    }
    score.innerHTML = "Score: 0";
    scorePoints = 0;
    userChoice = [];
    // const gridDisplay = document.getElementById('grid') || "";
    // // gridDisplay.innerHTML = "";
    // gridDisplay.remove();
};

function changeGame(e) {
    // console.log(e.target.id)
    let optionPicked = e.target.id;
    switch (optionPicked) {
        case "dogs":
            console.log("dogs");
            fetchPuppyData();
            break;
        case "cats":
            console.log("cats");
            fetchKittenData();
            break;
        case "random":
            console.log("random");
            fetchRandomData();
            break;
    }
};
//function to create the header allowing user to choose game type
makeHeader();

