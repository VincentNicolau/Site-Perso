var canvas;
var ctx;
var canvasWidth = 814;
var canvasHeight = 700;
var interval = setInterval(deplacerBalle, 10);

//table virtuelle tuiles
var tabBriques;
var nbLignes = 6;
var nbColones = 8;
var largeurBrique;
var hauteurBrique;
var espace = 2;
//var isVisible;//

//infos pad
var padX = (canvasWidth / 2) - 75;
var padY = canvasHeight - 70;
var padWidth = 150;
var padHeight = 30;
var padVitesse = 20;


//infos balle
var balleRayon = 20;
var balleX = padX + (padWidth / 2);
var balleY = (padY - balleRayon) - 1;
var moveX = 2;
var moveY = -2;

document.addEventListener('keydown', deplacerPaddle);

function init() {
    canvas = document.getElementById("Canvas");
    ctx = canvas.getContext("2d");

    largeurBrique = 100;
    hauteurBrique = 30;

    creerBriques();
    creerPaddle();
    creerBalle();
    deplacerPaddle(event);
    deplacerBalle();

    interval;

}

function creerBriques() {
    tabBriques = new Array(nbLignes);                                         // creation d'une table virtuelle pour les lignes
    for (l = 0; l < nbLignes; l++) {                                            // creation des lignes
        tabBriques[l] = new Array(nbColones);
        for (c = 0; c < nbColones; c++) {                                      // creation des collones
            ctx.fillStyle = "red";
            ctx.fillRect(c * (largeurBrique + espace), l * (hauteurBrique + espace), largeurBrique, hauteurBrique);
            tabBriques[l][c] = {x: (largeurBrique + espace) * c, y: (hauteurBrique + espace) * l, isVisible: true};
        }
    }

}
/*
 {
 for (l = 0; l < nbLignes; l++) {
 for (c = 0; c < nbColones; c++) {
 ctx.fillStyle = "red";
 ctx.fillRect(c * (largeurBrique + espace), l * (hauteurBrique + espace), largeurBrique, hauteurBrique); 
 }
 }
 }
 */

function creerPaddle() {
    ctx.fillStyle = "black";
    ctx.fillRect(padX, padY, padWidth, padHeight);
}

function creerBalle() {
    ctx.beginPath();
    ctx.arc(balleX, balleY, balleRayon, 0, Math.PI * 2, true);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function deplacerPaddle(event) {

    if (event.keyCode === 37) {
        //console.log("gauche");
        ctx.clearRect(padX, padY, padWidth, padHeight);
        padX = padX - padVitesse;
        creerPaddle();                                                          // appel de la création du padlle
        if (padX <= 0) {
            padX = 0;
        }
    }

    if (event.keyCode === 39) {
        //console.log("droite");
        ctx.clearRect(padX, padY, padWidth, padHeight);
        padX = padX + padVitesse;
        creerPaddle();                                                          // appel de la création du padlle
        if (padX >= 814 - padWidth) {
            padX = 814 - padWidth;
        }
    }

}

function deplacerBalle() {
    ctx.clearRect(balleX - balleRayon, balleY - balleRayon, balleRayon * 2, balleRayon * 2);

    if (balleX > canvasWidth - balleRayon || balleX < balleRayon) {             // collision mur en X
        moveX = -moveX;
    }

    if (balleY < balleRayon) {                                                  // collision mur en Y
        moveY = -moveY;
    } else {
        if (balleY >= canvasHeight) {
            alert("Perdu !");
            clearInterval(interval);
            location.reload();
        }
    }

    if ((balleY >= padY - balleRayon) && (balleX >= padX) && (balleX < (padX + padWidth))) {    // collision sur paddle face haute
        balleY = padY - balleRayon;

        moveY = -moveY;
        creerPaddle();
    }
    if (balleX + balleRayon <= padX) {                                                          // collision sur paddle coté
        if ((balleX + balleRayon) >= padX && (balleY >= padY) && (balleY <= (padY + padHeight))) {
            moveY = -moveY;
            creerPaddle();
        }
    }


    balleX = balleX + moveX;                                                    // mouvement de la balle en X
    balleY = balleY + moveY;                                                    // mouvement de la balle en Y

    creerBalle();                                                               // appel de la cration de la balle
    collision();
}

function collision() {
    for (l = 0; l < nbLignes; l++) {
        for (c = 0; c < nbColones; c++) {
            var brique = tabBriques[l][c];
            if (brique.isVisible) {
                if (balleX > brique.x && balleX < brique.x + largeurBrique && balleY - balleRayon > brique.y && balleY - balleRayon < brique.y + hauteurBrique) {
                    brique.isVisible = false;
                    ctx.clearRect(brique.x, brique.y, largeurBrique, hauteurBrique);
                    moveY = -moveY;
                }
            }
        }
    }
}

function start() {
    document.getElementById("start");
    init();
}

