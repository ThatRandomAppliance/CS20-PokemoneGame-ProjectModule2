//Find out why Nidorino's sleep move doesn't work
// let gengarHP = 60;
// let nidorinoHP = 61;

let playerTurn = true
let opponentHpElement = document.getElementById("opponent-hp")
// opponentHpElement.innerHTML = (nidorinoHP)
let playerHpElement = document.getElementById("player-hp")
// playerHpElement.innerHTML = (gengarHP)
let messageBox = document.getElementById("message")

let pausePlayN = document.getElementById("opponentIdle")
let pausePlayG = document.getElementById("playerIdle")

let buttons = document.getElementsByTagName("button");
let button1 = buttons[0].innerHTML
let button2 = buttons[1].innerHTML
let button3 = buttons[2].innerHTML
let button4 = buttons[3].innerHTML

// let tNPP = 13
// let scNPP = 1
// let sNPP = 1
// let hpNPP = 2
// let tGPP = 13
// let scGPP = 1
// let rsGPP = 1
// let hpGPP = 2

// let tDMG = 5
// let scDMG = 45
// let rsdmg = 6
// let sHeal = 50

let active = null
let pokemon = null
let moveNum = null
let playerTotalHp = null
let playerHp = null
let opponentTotalHp = null
let opponentHp = null
let playerTotalPP1 = null
let playerPP1 = null

pokemonSelector()
function pokemonSelector() {
    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            pokemon = 94
            console.log(pokemon);
            active = "P"
            PokeData(pokemon, active)
        }
        if (i == 1) {
            pokemon = Math.floor(Math.random() * (1025)) + 1
            console.log(pokemon);
            active = "O"
            PokeData(pokemon, active)
        }
        
    }
}

async function PokeData(pokemon, active) {
    if (active == "P") {
            let pokemonP = await(await (fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon))).json()
            console.log(pokemonP);
            playerSprite(pokemonP)
            pokemonNameP(pokemonP)
            pokemonHpP(pokemonP)
            playerMoves(pokemonP)
    }
    if (active == "O") {
        try {
            let pokemonO = await(await (fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon))).json()
            console.log(pokemonO);
            opponentSprite(pokemonO)
            pokemonNameO(pokemonO)
            pokemonHpO(pokemonO)
        } catch (error) {
            location.reload();
        }
    }
}

function pokemonNameP(pokemonP) {
    // if (active == "P") {
        let nameP = document.getElementById("playerName")
        nameP.innerHTML = pokemonP.name
        let playerTurnPrompt = document.getElementById("WhatWillPlayerDo?")
        playerTurnPrompt.innerHTML = pokemonP.name + " do?"
        // console.log(nameP);
    // }
}

function pokemonHpP(pokemonP) {
    playerTotalHp = document.getElementById("player-hp-total")
    console.log(playerTotalHp);
    playerTotalHp.innerHTML = "/" + pokemonP.stats[0].base_stat
    playerHp = document.getElementById("player-hp")
    playerHp.innerHTML = pokemonP.stats[0].base_stat
}

function pokemonNameO(pokemonO) {
    // if (active == "O") {
        let nameO = document.getElementById("opponentName")
        nameO.innerHTML = pokemonO.name
        console.log(nameO);
    // }
}

function pokemonHpO(pokemonO) {
    opponentTotalHp = document.getElementById("opponent-hp-total")
    console.log(opponentTotalHp);
    opponentTotalHp.innerHTML = "/" + pokemonO.stats[0].base_stat
    opponentHp = document.getElementById("opponent-hp")
    opponentHp.innerHTML = pokemonO.stats[0].base_stat
}


async function playerSprite(pokemonP) {
    console.log(active);
        // if (active == "P") {
            let spriteP = pokemonP.sprites.back_default
            let imgP = document.getElementById("playerIdle")
            console.log(imgP);
            imgP.src = spriteP
        // }
    }
    
async function opponentSprite(pokemonO) {
    // if (active == "O") {
        let spriteO = pokemonO.sprites.front_default
        let imgO = document.getElementById("opponentIdle")
        console.log(pokemonO.sprites.front_default);
        imgO.src = spriteO
        // }
    }

async function playerMoves(pokemonP) {
    let pMove1 = document.getElementById("button" + 1)
    moveNum = Math.floor(Math.random() * (77)) + 1
    let moveStats = await(await (fetch("https://pokeapi.co/api/v2/move/" + moveNum))).json()
    pMove1.innerHTML = pokemonP.moves[moveNum].move.name
    playerTotalPP1 = document.getElementById("pp1Total")
    playerTotalPP1.innerHTML = "/" + moveStats.pp
    playerPP1 = document.getElementById("pp1")
    playerPP1.innerHTML = moveStats.pp
}
    
    // function turns(choice)
    //     {
    //         if (playerTurn == true)
    //         {
    //             pausePlayG.removeAttribute("id", "playerIdle")
    //             pausePlayN.style.animationPlayState = "paused"
    //             if (choice.innerHTML != "Rock Smash")
    //             {
    //                 playerTurn = false
    //             }
    //             actionsGengar(choice)
    //         }
    //     }
// function tackleGengar() 
// {
//     console.log("Gt")
//     nidorinoHP -= tDMG
//     messageBox.innerHTML = "GENGAR used tackle"
//     if (nidorinoHP <= 0) 
//     {
//         nidorinoHP = 0
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = ("Nidorino has fainted")
//             }
//             ,1000)
//             setTimeout(()=> 
//             {
//                 restartButton()
//             }
//             ,1400)
//     }
//     else
//     {
//         setTimeout(()=> 
//             {
//                 nidorinoTurn()
//             }
//             ,1000)
            
//     }
//     opponentHpElement.innerHTML = (nidorinoHP)
//     playerTurn = false
//     console.log(playerTurn)
// }
// function shadowClawGengar() 
// {
//     console.log("Gsc")
//     nidorinoHP -= scDMG
//     messageBox.innerHTML = "GENGAR used shadow claw"
//     if (nidorinoHP <= 0) 
//     {
//         nidorinoHP = 0
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = ("Nidorino has fainted")
//             }
//             ,1000)
//             setTimeout(()=> 
//             {
//                 restartButton()
//             }
//             ,1400)
//             pausePlayN.style.animationPlayState = "play"
//     }
//     else
//     {
//         setTimeout(()=> 
//             {
//                 nidorinoTurn()
//             }
//             ,1000)
//     }
//     opponentHpElement.innerHTML = (nidorinoHP)
//     console.log(playerTurn)
// }
// function rockSmashGengar()
// {
//     setTimeout(()=> 
//             {
//                 pausePlayG.setAttribute("id", "gengarFighting")
//             }
//             ,700)
//     console.log("Grs")
//     nidorinoHP -= rsdmg
//     messageBox.innerHTML = "GENGAR used rock smash"
//     if (nidorinoHP <= 0) 
//     {
//         nidorinoHP = 0
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = ("Nidorino has fainted")
//             }
//             ,1000)
//             setTimeout(()=> 
//             {
//                 restartButton()
//             }
//             ,1400)
//     }
//     else
//     {
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,1000)
//     }
//     opponentHpElement.innerHTML = (nidorinoHP)
//     playerTurn = true
//     console.log(playerTurn)
// }
// function hiddenPowerGengar()
// {
//     console.log("Ghp")
//     let hPDmgGengar = Math.floor(Math.random() * (62 - 1) + 1)
//     nidorinoHP -= hPDmgGengar
//     messageBox.innerHTML = "GENGAR used hidden power"
//     if (nidorinoHP <= 0) 
//     {
//         nidorinoHP = 0
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = ("Nidorino has fainted")
//             }
//             ,1000)
//         setTimeout(()=> 
//             {
//                 restartButton()
//             }
//             ,1400)
//     }
//     else
//     {
//         setTimeout(()=> 
//             {
//                 nidorinoTurn()
//             }
//             ,1000)
//     }
//     opponentHpElement.innerHTML = (nidorinoHP)
//     console.log(hPDmgGengar)
//     console.log(playerTurn)
// }

// function tackleNidorino() 
// {
//     console.log("Nt") 
//     gengarHP -= tDMG
//     messageBox.innerHTML = "NIDORINO used tackle"
//     if (gengarHP <= 0) 
//     {
//         gengarHP = 0
//         setTimeout(()=> 
//             {
//                 pausePlayG.style.animationPlayState = "paused"
//                 messageBox.innerHTML = ("Gengar has fainted")
//             }
//             ,1000)
//             setTimeout(()=> 
//             {
//                 restartButton()
//             }
//             ,1400)
//     }
//     else{
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,1000)
//     }
//     playerHpElement.innerHTML = (gengarHP)
//     playerTurn = true
//     console.log(playerTurn)
// }
// function shadowClawNidorino() 
// {
//     console.log("Nsc") 
//     gengarHP -= scDMG
//     messageBox.innerHTML = "NIDORINO used shadow claw"
//     if (gengarHP <= 0) 
//     {
//         gengarHP = 0
//         setTimeout(()=> 
//             {
//                 pausePlayG.style.animationPlayState = "paused"
//                 messageBox.innerHTML = ("Gengar has fainted")
//             }
//             ,1000)
//             setTimeout(()=> 
//             {
//                 console.log("hiekwfhwhn")
//                 restartButton()
//             }
//             ,1400)
//     }
//     else{
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,1000)
//     }
//     playerHpElement.innerHTML = (gengarHP)
//     playerTurn = true
//     console.log(playerTurn)
// }
// function rockSmashNidorino()
// {
//     console.log("Nrs") 
//     gengarHP -= rsdmg
//     messageBox.innerHTML = "NIDORINO used rock smash"
//     if (gengarHP <= 0) 
//     {
//         gengarHP = 0
//         setTimeout(()=> 
//             {
//                 pausePlayG.style.animationPlayState = "paused"
//                 messageBox.innerHTML = ("Gengar has fainted")
//             }
//             ,700)
//             setTimeout(()=> 
//             {

//                 restartButton()
//             }
//             ,1400)
//     }
//     else{
//         setTimeout(()=> 
//             {
//                 nidorinoTurn()
//             }
//             ,700)
//     }
//     playerHpElement.innerHTML = (gengarHP)
//     console.log(playerTurn)
// }
// function sleepNidorino()
// {
//     console.log("Ns") 
//     nidorinoHP += 50
//     messageBox.innerHTML = "NIDORINO used sleep"
//     setTimeout(()=> 
//         {
//             messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//         }
//         ,1000)
//     if (nidorinoHP >= 61) 
//     {
//         nidorinoHP = 61
//     }
//     opponentHpElement.innerHTML = (nidorinoHP)
//     playerTurn = true
//     console.log(playerTurn)
// }
// function hiddenPowerNidorino()
// {
//     let hPDmgNidorino = Math.floor(Math.random() * (62 - 1) + 1)
//     console.log("Nhp") 
//     gengarHP -= hPDmgNidorino
//     messageBox.innerHTML = "NIDORINO used hidden power"
//     if (gengarHP <= 0) 
//     {
//         gengarHP = 0
//         setTimeout(()=> 
//             {
//                 pausePlayG.style.animationPlayState = "paused"
//                 messageBox.innerHTML = ("Gengar has fainted")
//             }
//             ,1000)
//             setTimeout(()=> 
//             {
//                 restartButton()
//             }
//             ,1400)
//     }
//     else{
//         setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,1000)
//     }
//     playerHpElement.innerHTML = (gengarHP)
//     console.log(hPDmgNidorino)
//     console.log(playerTurn)
//     playerTurn = true
// }

// function actionsGengar(choice) 
// {
//     console.log(choice.innerHTML)
//     if (choice.innerHTML == button1) 
//     {
//         if (tGPP != 0) 
//         {
//         tackleGengar()
//         tGPP--
//         ppT.innerHTML = tGPP
//         console.log(tGPP)
//         }
//         else if (tGPP <= 0)
//         {
//             messageBox.innerHTML = "Tackle is out of PP"
//             setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,700)
//             playerTurn = true
//             console.log(playerTurn)
//         }
//     }
//     else if (choice.innerHTML == button2)
//     {
//         if (scGPP != 0) 
//         {
//         shadowClawGengar()
//         scGPP--
//         ppSC.innerHTML = scGPP
//         console.log(scGPP)
//         }
//         else if (scGPP <= 0)
//         {
//             messageBox.innerHTML = "Shadow Claw is out of PP"
//             setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,700)
//             playerTurn = true
//             console.log(playerTurn)
//         }
//     }
//     else if (choice.innerHTML == button3)
//     {
//         if (rsGPP != 0) 
//         {
//         rockSmashGengar()
//         rsGPP--
//         ppRS.innerHTML = rsGPP
//         console.log(rsGPP)
//         }
//         else if (rsGPP <= 0)
//         {
//             messageBox.innerHTML = "Rock Smash is out of PP"
//             setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,700)
//             playerTurn = true
//             console.log(playerTurn)
//         } 
//     }
//     else if (choice.innerHTML == button4)
//     {
//         if (hpGPP != 0) 
//         {
//         hiddenPowerGengar()
//         hpGPP--
//         ppHP.innerHTML = hpGPP
//         console.log(hpGPP)
//         }
//         else if (hpGPP <= 0)
//         {
//             messageBox.innerHTML = "Hidden Power is out of PP"
//             setTimeout(()=> 
//             {
//                 messageBox.innerHTML = "What will <br>GENGAR do?</br>"
//             }
//             ,700)
//             playerTurn = true
//             console.log(playerTurn)
//         } 
//     }
// }
// function actionsNidorino(choice) 
// {
//     if (choice == "1") 
//     {
//         if (tNPP != 0) 
//         {
//             tackleNidorino()
//             tNPP--
//             console.log(tNPP)
//         }
//         else if (tNPP <= 0)
//         {
//             setTimeout(()=> 
//             {
//                 nidorinoTurn()
//                 console.log("Hi")
//             }
//             ,1400)
//         }
//     }
//     else if (choice == 2)
//     {
//         if (scNPP != 0) 
//         {
//         shadowClawNidorino()
//         scNPP--
//         console.log(scNPP)
//         }
//         else if (scNPP <= 0)
//         {
//             setTimeout(()=> 
//             {
//                 nidorinoTurn()
//                 console.log("Hi")
//             }
//             ,1400)
//         }
//     }
//     else if (choice == 3)
//     {
//         if (sNPP != 0) 
//         {
//         sleepNidorino()
//         sNPP--
//         console.log(sNPP)
//         }
//         else if (sNPP <= 0)
//         {
//             setTimeout(()=> 
//             {
//                 nidorinoTurn()
//                 console.log("Hi")
//             }
//             ,1400)
//         }
//     }
//     else if (choice == 4) 
//     {
//         if (hpNPP != 0) 
//         {
//             hiddenPowerNidorino()
//             hpNPP--
//             console.log(hpNPP)
//         }
//         else if (hpNPP <= 0)
//         {
//             setTimeout(()=> 
//             {
//                 nidorinoTurn()
//                 console.log("Hi")
//             }
//             ,1400)
//         } 
//     }
// }
// function nidorinoTurn()
// {
//     pausePlayG.setAttribute("id", "gengarFighting")
//     let choice = Math.floor(Math.random() * (5 - 1) + 1)
//     console.log(choice)
//     actionsNidorino(choice)
// }




function restartButton()
{
    console.log("gg")
    let redoButton = document.createElement("button");
    redoButton.innerHTML = "RESTART"
    redoButton.setAttribute("id", "resetButton");
    document.body.appendChild(redoButton);
    redoButton.addEventListener("click", restart);
}
function restart()
{
    location.reload();
}