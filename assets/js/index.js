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
        card.setAttribute("data-name", dData[i].name);
        card.setAttribute("data-id", i);
        card.setAttribute("src", dData[i].img);
        grid.appendChild(card);
    }
}

makeGame();