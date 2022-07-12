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
    // console.log(dData[cardId].name);
    userChoice.push(dData[cardId].name);
    console.log(userChoice)
}

makeGame();