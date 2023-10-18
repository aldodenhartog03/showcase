let zetGespeeld = true;

const witteDammen = Array.from(document.getElementsByClassName("dam-wit"));
const zwarteDammen= Array.from(document.getElementsByClassName("dam-zwart"));

const damPosities = new Array(24);
for(var i = 0; i < damPosities.length; i++){
    damPosities[i] = new Array(15);
}

witteDammen.forEach(e => {
    e.addEventListener("click", damClick);
    damPositieNaam = e.classList.value.slice(-4);
    damPosities[damPositieNaam.substring(0, 2) - 1][damPositieNaam.substring(2, 4) - 1] = e;
});

zwarteDammen.forEach(e => {
    e.addEventListener("click", damClick);
    damPositieNaam = e.classList.value.slice(-4);
    damPosities[damPositieNaam.substring(0, 2) - 1][damPositieNaam.substring(2, 4) - 1] = e;
})

console.log(damPosities);

function damClick(e){
    //laat zetten zien
    console.log(e.target);
}

const dobbelStenen = new Array(2);
dobbelStenen[0] = document.getElementsByClassName("dobbelsteen-1")[0];
dobbelStenen[1] = document.getElementsByClassName("dobbelsteen-2")[0];

dobbelStenen.forEach(e => {
    e.addEventListener('click', dobbelSteenClick);
})

Dobbelstenen2 = {
    dobbelsteen_1: {
        element: document.getElementsByClassName("dobbelsteen-1")[0],
        rol: 5,
        vorige_rol:1
    },

    dobbelsteen_2: {
        element: document.getElementsByClassName("dobbelsteen-2")[0],
        rol: 2,
        vorige_rol:2
    },
}

function dobbelSteenClick(e){
    if(zetGespeeld){
        zetGespeeld = false;
        Math.random()
    }
}