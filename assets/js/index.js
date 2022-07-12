//random pictures that will be api call
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

let userChoice = [];

//shuffle the array
dData.sort(() => Math.random() - 0.5);
console.log(dData);

let grid = document.createElement("div");
// const grid = document.querySelector("#grid");

function makeGame() {
    //create the grid
    let grid = document.createElement("div");
    grid.setAttribute("id", "grid");
    document.body.prepend(grid);
    //create the cards
    for (let i = 0; i < dData.length; i++) {
        let card = document.createElement("img");
        card.setAttribute("class", "card");
        //this can't be used or players can find from inspecting the page
        // card.setAttribute("data-name", dData[i].name);
        card.setAttribute("data-id", i);
        //need to set to background image
        // card.setAttribute("src", dData[i].img);
        card.setAttribute("src", "./assets/images/background.png");
        card.addEventListener("click", turnCard);
        grid.appendChild(card);
    }
}

//turning the card over by setting image by data-id
function turnCard() {
    // console.log(this);
    cardId = this.getAttribute("data-id");
    console.log(cardId);
    //changes image to the picture from the array
    this.setAttribute("src", dData[cardId].img);
    if (userChoice.length < 2) {
        // console.log(dData[cardId].name);
        //had to add object push to change background image back to background.png
        userChoice.push({ id: cardId, name: dData[cardId].name });
        console.log(userChoice);
    }
    //if I use else if, this condition doesn't run until there are three cards Perhaps change to switch for long term
    //create checkMatch function to store these items
    if (userChoice.length === 2) {
        console.log("checking for match");
        if (userChoice[0].name === userChoice[1].name) {
            console.log("match");
            userChoice = [];
        }
        else {
            console.log("no match");
            //change cards back to background image
            // userChoice[0].id.setAttribute("src", "./assets/images/background.png");
            // userChoice[1].id.setAttribute("src", "./assets/images/background.png");
            // cardId.setAttribute("src", "./assets/images/background.png");
            // this.setAttribute("src", "./assets/images/background.png");
            console.log(userChoice[0].id, userChoice[1].id);
            let choice1 = document.querySelector('[data-id="' + userChoice[0].id + '"]');
            choice1.setAttribute("src", "./assets/images/background.png");
            let choice2 = document.querySelector('[data-id="' + userChoice[1].id + '"]');
            choice2.setAttribute("src", "./assets/images/background.png");
            // console.log(choice1);
            userChoice = [];
        }
    }
}


makeGame();