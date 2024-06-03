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
            playerMoves(pokemonP)
    }
    if (active == "O") {
            let pokemonO = await(await (fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon))).json()
            // console.log(pokemonO);
            opponentSprite(pokemonO)
            pokemonNameO(pokemonO)
            pokemonHpO(pokemonO)
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

async function playerMoves(pokemonP) {
    // let moveNum = null
    let playerMoves = []
    let playerMovesPPT = []
    let playerMovesPP = []
    for (let i = 1; i < 5; i++) {
        let moveNum = Math.floor(Math.random() * (77)) + 1
        let moveStats = await(await (fetch("https://pokeapi.co/api/v2/move/" + moveNum))).json()
        playerMoves[i] = document.getElementById("button" + i)
        console.log(playerMoves);
        playerMoves[i].innerHTML = pokemonP.moves[moveNum].move.name
        playerMovesPPT[i] = document.getElementById("ppTotal" + i)
        playerMovesPPT[i].innerHTML = "/" + moveStats.pp
        playerMovesPP[i] = document.getElementById("pp" + i)
        playerMovesPP[i].innerHTML = moveStats.pp
        // console.log(playerMovesPPT);
    }
}

function turns(choice)
    {
        console.log(choice.innerHTML);
        if (playerTurn == true)
        {
            pausePlayP.removeAttribute("id", "playerIdle")
            pausePlayO.style.animationPlayState = "paused"
        //     if (choice.innerHTML != "Rock Smash")
        //     {
        //         playerTurn = false
        //     }
            actionsPlayer(choice)
        }
        if (playerTurn == false) {
            console.log("opponent Turn");
        }
    }

    async function actionsPlayer(choice) {
        let choiceStats = await(await (fetch("https://pokeapi.co/api/v2/move/" + choice.innerHTML))).json()
        console.log(choiceStats);
        playerAttack(choiceStats, choice)

    }

function playerAttack(choiceStats, choice) 
{
    let pokeNameO = document.getElementById("opponentName").innerHTML
    let pokeNameP = document.getElementById("playerName").innerHTML
    console.log("PA")
    let damage = choiceStats.power * 0.25
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
                turns()
            }
            ,1000)
            
    }
    // opponentHpElement.innerHTML = (nidorinoHP)
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