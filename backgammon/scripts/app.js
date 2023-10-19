let zetGespeeld = true;
let aanZet = 'zwart';

const witteDammen = Array.from(document.getElementsByClassName("dam-wit"));
const zwarteDammen= Array.from(document.getElementsByClassName("dam-zwart"));
const mogelijkeDammen = document.querySelectorAll('.dam-mogelijk');

mogelijkeDammen.forEach((e) => e.addEventListener('click', speelZet));

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


const dobbelstenen = [
    document.querySelector(".dobbelsteen-1"),
    document.querySelector(".dobbelsteen-2")
]

dobbelstenen.forEach(e => {
    e.addEventListener('click', dobbelSteenClick);
})

let rollen = [];


function damClick(e){
    let position = e.target.classList[1].substring(5, 7);
    let damKleur = e.target.classList[0].slice(4);
    if(zetGespeeld || (damKleur !== aanZet)){
        //hier kan incorrecte input afgehandeld worden
        return;
    }

    showPotentialMoves(parseInt(position));
}

function getDamPosition(xpos){
    //dammen verplaatsen
    xpos = ("0" + xpos).slice(-2);
    let ypos = ("0" + (damPosities[xpos-1].filter(e => e !== null).length + 1)).slice(-2);
    return([xpos, ypos]);
}

function showPotentialMoves(pos){
    // let rol1 = dobbelstenen[0].rol;
    // let rol2 = dobbelstenen[1].rol;
    // if(aanZet === 'wit'){
    //     rol1 *= -1;
    //     rol2 *= -1;
    // }
    //
    let potentieleZetten = [];

    if(rollen.length > 2){
        let rol = rollen[0];
        for(let i = 0; i < rollen.length; i++) {
            potentieleZetten.push(rol + pos);
            rol += rollen[0];
        }
    }else if(rollen.length === 2){
        potentieleZetten.push(rollen[0] + pos);
        potentieleZetten.push(rollen[1] + pos);
        potentieleZetten.push(rollen[0] + rollen[1] + pos);
    }else{
        potentieleZetten.push(rollen[0] + pos);
    }

    potentieleZetten.forEach((e) => {
        if((e > 24 || e < 1) || checkPositionOccupied(e)){
            //regelen dat bepaalde zetten niet gespeeld kunen worden wanneer je op een prime van de tegenstander komt en daarna.
            potentieleZetten.splice(potentieleZetten.indexOf(e));
        }
    })

    console.log(potentieleZetten);

    mogelijkeDammen.forEach(e => e.style.visibility = "hidden");

    let index = 0;
    potentieleZetten.forEach((e) => {
        let dam = mogelijkeDammen[index];
        dam.classList.replace(dam.classList[1], "plek-"+ getDamPosition(e)[0] +""+ getDamPosition(e)[1]);
        dam.style.visibility = "visible";
        dam.vanDam = pos;
        dam.gespeeldeRol = e - pos;
        index++;
    })
}

function speelZet(e){
    console.log(e.target);
    dam = e.target;
    let xpos = ("0" + dam.classList[1].substring(5, 7)).slice(-2);
    let ypos = ("0" + dam.classList[1].substring(8,10)).slice(-2);

    console.log(dam.gespeeldeRol);

    let gespeeldeDam = damPosities[dam.vanDam - 1][damPosities[dam.vanDam - 1].filter(e => e !== null).length - 1];
    gespeeldeDam.classList.replace(gespeeldeDam.classList[1], "plek-"+ xpos +""+ ypos);

    damPosities[dam.vanDam - 1].splice(damPosities[dam.vanDam - 1].filter(e => e !== null).length - 1, 1);
    damPosities[parseInt(xpos) - 1][parseInt(ypos) - 1] = gespeeldeDam;

    mogelijkeDammen.forEach(e => e.style.visibility = "hidden");

    rollen.splice(rollen.indexOf(dam.gespeeldeRol, 0));
    console.log(rollen);

    console.log(gespeeldeDam);

    if(rollen.length === 0){
        zetGespeeld = true;
        if(aanZet === "wit") aanZet = "zwart";
        else aanZet = "wit";
    }
    showPotentialMoves(parseInt(xpos));
}

function checkPositionOccupied(xpos){
    if(isNaN(xpos)) return false;
    if(aanZet === "wit" && damPosities[xpos - 1].filter(e => e.classList.contains("dam-zwart")).length >= 2){
        return true;
    }else if(aanZet === "zwart" && damPosities[xpos - 1].filter(e => e.classList.contains("dam-wit")).length >= 2){
        return true;
    }
    return false;
}

function dobbelSteenClick(e){
    if(!zetGespeeld){
        return;
    }
    zetGespeeld = false;

    let rol1 = Math.floor(Math.random() * 6 + 1);
    let rol2 = Math.floor(Math.random() * 6 + 1);


    if(rol1 === rol2){
        for(let i = 0; i < 4; i++){
            rollen.push(rol1);
        }
    }else{
        rollen.push(rol1);
        rollen.push(rol2);
    }
    console.log(rollen);
    setDobbelstenen();
}

function setDobbelstenen(){
    dobbelstenen[0].classList.replace(dobbelstenen[0].classList[1], "rol-" + rollen[0]);
    dobbelstenen[1].classList.replace(dobbelstenen[1].classList[1], "rol-" + rollen[1]);
}