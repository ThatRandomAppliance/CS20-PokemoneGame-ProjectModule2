//Find out why Nidorino's sleep move doesn't work
// let gengarHP = 60;
// let nidorinoHP = 61;

let playerTurn = true
let opponentHpElement = document.getElementById("opponent-hp")
// opponentHpElement.innerHTML = (nidorinoHP)
let playerHpElement = document.getElementById("player-hp")
// playerHpElement.innerHTML = (gengarHP)
let messageBox = document.getElementById("message")

let pausePlayO = document.getElementById("opponentIdle")
let pausePlayP = document.getElementById("playerIdle")

let buttons = document.getElementsByTagName("button");
let button1 = buttons[0].innerHTML
let button2 = buttons[1].innerHTML
let button3 = buttons[2].innerHTML
let button4 = buttons[3].innerHTML

// let opponentHp = document.getElementById("opponent-hp")
// let opponentTotalHp = document.getElementById("opponent-hp-total")
// let nameO = null
// let nameP = null

let opponentMoves = []
let opponentMovesPPT = []
let opponentMovesPP = []
let opponentMovesPower = []

let playerMoves = []
let playerMovesPPT = []
let playerMovesPP = []
let playerMovesPower = []


pokemonSelector()
function pokemonSelector() {
    let active = null
    let pokemon = null
    for (let i = 0; i < 2; i++) {
        if (i == 0) {
            pokemon = 94
            // console.log(pokemon);
            active = "P"
            PokeData(pokemon, active)
        }
        if (i == 1) {
            pokemon = Math.floor(Math.random() * (1025)) + 1
            // console.log(pokemon);
            active = "O"
            PokeData(pokemon, active)
        }
        
    }
}

async function PokeData(pokemon, active) {
    if (active == "P") {
            let pokemonP = await(await (fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon))).json()
            // console.log(pokemonP);
            playerSprite(pokemonP)
            pokemonNameP(pokemonP)
            pokemonHpP(pokemonP)
            playerMovePicker(pokemonP, pokemon)
    }
    if (active == "O") {
            let pokemonO = await(await (fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon))).json()
            console.log(pokemonO);
            opponentSprite(pokemonO)
            pokemonNameO(pokemonO)
            pokemonHpO(pokemonO)
            opponentMovePicker(pokemonO)
    }
}

function pokemonNameP(pokemonP) {
        let nameP = document.getElementById("playerName")
        nameP.innerHTML = pokemonP.name
        let playerTurnPrompt = document.getElementById("WhatWillPlayerDo?")
        playerTurnPrompt.innerHTML = pokemonP.name + " do?"
        // console.log(nameP);
        
}

function pokemonHpP(pokemonP) {
    // let playerTotalHp = null
    // let playerHp = null
    let playerTotalHp = document.getElementById("player-hp-total")
    // console.log(playerTotalHp);
    playerTotalHp.innerHTML = "/" + pokemonP.stats[0].base_stat
    let playerHp = document.getElementById("player-hp")
    playerHp.innerHTML = pokemonP.stats[0].base_stat
}

function pokemonNameO(pokemonO) {
        let nameO = document.getElementById("opponentName")
        nameO.innerHTML = pokemonO.name
        // console.log(nameO);
}

function pokemonHpO(pokemonO) {
        let opponentTotalHp = document.getElementById("opponent-hp-total")
        opponentTotalHp.innerHTML = "/" + pokemonO.stats[0].base_stat
        // console.log(opponentTotalHp);
        let opponentHp = document.getElementById("opponent-hp")
        opponentHp.innerHTML = pokemonO.stats[0].base_stat
}


async function playerSprite(pokemonP) {
    // console.log(active);
        // if (active == "P") {
            let spriteP = pokemonP.sprites.back_default
            let imgP = document.getElementById("playerIdle")
            // console.log(imgP);
            imgP.src = spriteP
        // }
    }
    
async function opponentSprite(pokemonO) {
    // if (active == "O") {
        let spriteO = pokemonO.sprites.front_default
        let imgO = document.getElementById("opponentIdle")
        // console.log(pokemonO.sprites.front_default);
        imgO.src = spriteO
        // }
    }

async function playerMovePicker(pokemonP, pokemon) {
    // let moveNum = null
    // let playerMoves = []
    // let playerMovesPPT = []
    // let playerMovesPP = []
    // let playerMovesPower = []
    for (let i = 1; i < 5; i++) {
        let moveNumP = Math.floor(Math.random() * (pokemonP.moves.length - 1))
        if (moveNumP == 0) {
            moveNumP ++
        }
        let pokeMove = pokemonP.moves[moveNumP].move.name
        let moveStatsP = await(await (fetch("https://pokeapi.co/api/v2/pokemon/move/" + pokeMove))).json()
        console.log(moveStatsP.power);
        console.log(moveNumP);
        console.log(moveStatsP.name);
        if (moveStatsP.power == null) {
            console.log(moveStatsP.power);
            moveNumP = Math.floor(Math.random() * (pokemonP.moves.length - 1))
            moveStatsP = await(await (fetch("https://pokeapi.co/api/v2/pokemon/move/" + pokeMove))).json()
            console.log(moveNumP);
            console.log(moveStatsP.power);
            console.log(moveStatsP.name);
            i--; 
            continue;
        }
        if (moveStatsP.power != null) {
            playerMovesPower[i] = moveStatsP.power
            playerMoves[i] = document.getElementById("button" + i)
            playerMoves[i].innerHTML = pokeMove
            playerMovesPPT[i] = document.getElementById("ppTotal" + i)
            playerMovesPPT[i].innerHTML = "/" + moveStatsP.pp
            playerMovesPP[i] = document.getElementById("pp" + i)
            playerMovesPP[i].innerHTML = moveStatsP.pp
            // console.log(playerMoves);
            // console.log(pokemonP.moves[moveNumP].move);
            // console.log(playerMovesPower);
            // console.log(playerMovesPP);
          }
        //   playerAbilities(pokemonP)
        // console.log(playerMovesPPT);
    }
}

function turns(choice, moveUsed)
    {
        console.log(choice.innerHTML);
        if (playerTurn == true)
        {
            if (opponentMovesPP[moveUsed] != 0) {
                pausePlayP.removeAttribute("id", "playerIdle")
                pausePlayO.style.animationPlayState = "paused"
            //     if (choice.innerHTML != "Rock Smash")
            //     {
            //         playerTurn = false
            //     }
                actionsPlayer(choice, moveUsed)
            }
        }
        if (playerTurn == false) {
            console.log("opponent Turn");
        }
    }

    async function actionsPlayer(choice, moveUsed) {
        let choiceStats = await(await (fetch("https://pokeapi.co/api/v2/move/" + choice.innerHTML))).json()
        console.log(choiceStats);
        playerAttack(choiceStats, choice, moveUsed)

    }

function playerAttack(choiceStats, choice, moveUsed) 
{
    console.log(moveUsed);
    let moveUsedPP = document.getElementById("pp" + moveUsed)
    console.log(moveUsedPP.innerHTML);
    moveUsedPP.innerHTML -= 1
    console.log(moveUsedPP);

    let pokeNameO = document.getElementById("opponentName").innerHTML
    let pokeNameP = document.getElementById("playerName").innerHTML

    let damage = Math.floor(choiceStats.power * 0.5)
    console.log(damage)
    let currentHpO = document.getElementById("opponent-hp")
    let remainingHpO = currentHpO.innerHTML
    remainingHpO -= damage
    currentHpO.innerHTML = remainingHpO

    messageBox.innerHTML = pokeNameP + " used " + choice.innerHTML
    if (remainingHpO <= 0) 
    {
        currentHpO.innerHTML = 0
        setTimeout(()=> 
            {
                messageBox.innerHTML = (pokeNameO + " has fainted")
            }
            ,1000)
            setTimeout(()=> 
            {
                restartButton()
            }
            ,1400)
    }
    else
    {
        setTimeout(()=> 
            {
                playerTurn = false
                opponentChoice()
            }
            ,1000)
            
    }
    // opponentHpElement.innerHTML = (nidorinoHP)
}

async function opponentMovePicker(pokemonO) {
    // let opponentMoves = []
    // let opponentMovesPPT = []
    // let opponentMovesPP = []
    for (let i = 1; i < 5; i++) {
        let moveNumO = Math.floor(Math.random() * (pokemonO.moves.length - 1))
        if (moveNumO == 0) {
            moveNumO ++
        }
        let moveStatsO = await(await (fetch("https://pokeapi.co/api/v2/move/" + moveNumO))).json()
        if (Number.isFinite(moveStatsO.power) && moveStatsO.power != null && moveStatsO.power != 0) {
        opponentMoves[i] = pokemonO.moves[moveNumO].move.name
        opponentMovesPower[i] = moveStatsO.power
        opponentMovesPPT[i] = "/" + moveStatsO.pp
        opponentMovesPP[i] = moveStatsO.pp
        // console.log(opponentMovesPower);
        // console.log(opponentMovesPPT);
        // console.log(opponentMovesPP);
        }
        else {
            //   playerAbilities(pokemonP)
                console.log(i);
                i--; continue;
            }
    }
}
// opponentChoice()
function opponentChoice() {
    let moveChoiceO = Math.floor(Math.random() * (4)) + 1
    if (opponentMovesPP[moveChoiceO] == 0) {
        opponentChoice()
    }
    console.log(moveChoiceO);
    opponentAttack(moveChoiceO)

    // console.log(opponentMoves);
    // console.log(opponentMovesPPT);
    // console.log(opponentMovesPP);
}

function opponentAttack(moveChoiceO) 
{
    // console.log(moveUsed);
    let OmoveUsedPP = opponentMovesPP[moveChoiceO]
    OmoveUsedPP --
    console.log(OmoveUsedPP);

    let pokeNameO = document.getElementById("opponentName").innerHTML
    let pokeNameP = document.getElementById("playerName").innerHTML

    let damage = Math.floor(opponentMovesPower[moveChoiceO] * 0.5)
    // let damage = Math.floor(opponentMovesPower[moveChoiceO] * 0.5)
    console.log(damage)
    let currentHpP = document.getElementById("player-hp")
    let remainingHpP = currentHpP.innerHTML
    remainingHpP -= damage
    currentHpP.innerHTML = remainingHpP

    messageBox.innerHTML = pokeNameO + " used " + opponentMoves[moveChoiceO]
    if (remainingHpP <= 0) 
    {
        currentHpP.innerHTML = 0
        setTimeout(()=> 
            {
                messageBox.innerHTML = (pokeNameP + " has fainted")
            }
            ,1000)
            setTimeout(()=> 
            {
                restartButton()
            }
            ,1400)
    }
    else
    {
        setTimeout(()=> 
            {
                playerTurn = true
                messageBox.innerHTML = "What will " + pokeNameP + " do?"
                // turns(playerTurn)
            }
            ,1000)
            
    }
}
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
//             pausePlayO.style.animationPlayState = "play"
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
//                 pausePlayP.setAttribute("id", "gengarFighting")
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
//                 pausePlayP.style.animationPlayState = "paused"
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
//                 pausePlayP.style.animationPlayState = "paused"
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
//                 pausePlayP.style.animationPlayState = "paused"
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
//                 pausePlayP.style.animationPlayState = "paused"
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
//     pausePlayP.setAttribute("id", "gengarFighting")
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