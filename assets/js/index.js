const dData = [
    {
        name: "gZilla",
        img: "./assets/images/gzilla.png",
    },
    {
        name: "mike",
        img: "./assets/images/mike.png",
    },
    {
        name: "gZilla",
        img: "./assets/images/gzilla.png",
    },
    {
        name: "mike",
        img: "./assets/images/mike.png",
    }
];


dData.sort(() => Math.random() - 0.5);
console.log(dData);