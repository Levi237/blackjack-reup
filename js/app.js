//--> BLACK JACK GAME


//-->   END GAME PSEUDOCODE
//intervalTimer needed for dealer, how to break up each card draw?
//opening page?
//restart option


//----------------------> CLASS OBJECT
class Player {
    constructor(name){
        this.name = name;
        this.chips = 10;
        this.hand = [];
        this.round = 0;
    }
}
const dealer = {
    hand: []
}

let player = new Player("Fauxman");  //--> edit out later into prompt with name display

let deck = [];
let shuffledDeck = [];
let playerFinalScore = 0;
let dealerFinalScore = 0;
let dealerCall = [];
let playerSplitHand = [];
let playerSplitScore = 0;
let alert = document.querySelector("#alert")
const getSum = (total, num) => {return total + num;}


//---------------------->   BUTTONS
const playButton = document.getElementById('play-button');
const hitButton = document.getElementById('hit-button');
const doubleButton = document.getElementById('double-button');
const splitButton = document.getElementById('split-button');  //--> change rule so dealer quits at 17
const stayButton = document.getElementById('stay-button');
const buyButton = document.getElementById('buy-button');
const splitHitButton = document.getElementById('split-hit-button');
// const restartButton = document.getElementById('restart-button')  //--> Restart or Reset

//---------------------->    START GAME EVENT LISTENER
playButton.addEventListener('click', () => {
    displayReset();
    eraseSplit();
    stayButton.removeAttribute('disabled');
    doubleButton.removeAttribute('disabled');
    hitButton.removeAttribute('disabled');//dd
    alert.innerText = "";
    if (player.chips !== 0) {
        player.chips -= 1;
        clearField();
        showRound();
        makeDeck();
        shuffleCards();
        dealHand();
        displayDeal();
        showMoney()
        splitDetector()
    } else {
        buyIn()
    }     
})
//---------------------->    DOUBLE DOWN BUTTON
doubleButton.addEventListener('click', () => {
    if (!playerSplitHand.length > 0){
    player.chips -= 1;
    } else {
        player.chips -= 1;
    }
    hitMe();
    displayPlayerCard();
    handValue();
    dealerAI();
    doubleDown(); // why doesn't this work?
    showMoney(); 
    doubleButton.setAttribute('disabled', true);
    hitButton.setAttribute('disabled', true);
    stayButton.setAttribute('disabled', true);
})
//---------------------->    HIT BUTTON
hitButton.addEventListener('click', () => {
    hitMe();
    displayPlayerCard();
    showMoney(); 
})















//---------------------->    SPLIT BUTTON - this mostly works  sometimes pushes wrong card
splitButton.addEventListener('click', () => {
    player.chips -= 1;
    showMoney(); 
    clearSplitBtns();
    splitHand();
    displayPlayerSplitCard();
})
const splitDetector = () => {
    let button = document.querySelector('#split-button');
    if (player.hand[0].value === player.hand[1].value){
        button.style.display = "block";
    }
}
const clearSplitBtns = () => {
    document.querySelector('#split-button').style.display = "none";
    document.querySelector('#split-hand').style.display = "block";
}
const splitHand = () => {
    playerSplitHand.unshift(player.hand[0]);
    player.hand.shift()
}
const displayPlayerSplitCard = () => {
    document.getElementById("blankSplit").insertAdjacentHTML("beforebegin", `<element class="fade card ${playerSplitHand[0].suit} r${playerSplitHand[0].face}"></element>`);
    let card = document.getElementById("player-hand");
    card.removeChild(card.childNodes[0]);
}
//---------------------->    SPLIT HIT BUTTON - this works
splitHitButton.addEventListener('click', () => {
    splitHitMe();
    displayHitSplitCard();
})
const splitHitMe = () => {
    let card = shuffledDeck.shift();
    playerSplitHand.unshift(card);
}
const displayHitSplitCard = () => {
    document.getElementById("blankSplit").insertAdjacentHTML("beforebegin", `<element class="slide card ${playerSplitHand[0].suit} r${playerSplitHand[0].face}"></element>`);
}
//---------------------->    SPLIT

// need AI
// need accounting
splitStayButton.addEventListener('click', () => {

})

const splitValue = () => {
    let splitCall = [];
    for (let i = 0; i < player.hand.length; i++){
        splitCall.push(player.hand[i].value);
    }
        playerFinalScore = splitCall.reduce(getSum);
        dealerFinalScore = dealerCall.reduce(getSum);
    for (let i = 0; i < playerSplitHand.length; i++){
        if (playerSplitHand[i].face == "Ace" && playerSplitScore > 21) {
            playerSplitScor = playerSplitScor - 10;
        } 
    }
    if (playerSplitScor > 21) { //
        alert.innerText = "Split Bust"; //
       } //
}
// //---------------------->    AI - DEALER HIT  -->  STAY button
// const  dealerAI = () => {
// document.getElementById("dealerDown").className = `card ${dealer.hand[0].suit} r${dealer.hand[0].face}`;
//     while (dealerFinalScore < playerFinalScore && playerFinalScore <= 21 || dealerFinalScore < 12 && dealerFinalScore === playerFinalScore) {
//         let card = shuffledDeck.shift();
//         dealer.hand.unshift(card);
//         dealerCall.unshift(card.value);
//         dealerFinalScore = dealerCall.reduce(getSum);
//         displayDealerCard();    
//     }
//     for (let d = 0; d < dealer.hand.length; d++) {  //---------------------->    IDK WHY THIS WORKS YET BUT IT DOES?
//         if (dealer.hand[d].face == "Ace" && dealerFinalScore > 21) {
//             dealerFinalScore = dealerFinalScore - 10;
//             if (dealerFinalScore < playerFinalScore && playerFinalScore <= 21){
//                 let card = shuffledDeck.shift();
//                 dealer.hand.unshift(card);
//                 dealerCall.unshift(card.value);
//                 dealerFinalScore = dealerCall.reduce(getSum);
//                 displayDealerCard();
//             }
//         }
//     }
// }

// //---------------------->    DOUBLE DOWN
// if (playerSplitHand.length > 0){
//     doubleDown()
// }



// const doubleDown = () => {  
    //     if (playerFinalScore <= 21 && playerFinalScore > dealerFinalScore || playerFinalScore <= 21 &&  dealerFinalScore > 21) {
    //         player.chips += 3;
    //     }
    //     if (playerFinalScore === dealerFinalScore){
    //         player.chips += 1;
    //     }
    //     if (playerSplitScore <= 21 && playerSplitScore > dealerFinalScore || playerSplitScore <= 21 &&  dealerFinalScore > 21) {
    //         player.chips += 3;
    //     }
    //     if (playerSplitScore === dealerFinalScore){
    //         player.chips += 1;
    //     }
//     callHand();
// };

// //---------------------->    PLAY HAND  -->  STAY button
// const callHand = () => {
//     if (playerFinalScore === 21) {
//         alert.innerText = "21!";
//     } if (dealerFinalScore > 21 && playerFinalScore <= 21) {
//         player.chips += 3;
//         if (playerFinalScore < 17 && dealerFinalScore > 21){
//         alert.innerText = "Dealer Bust!";
//         } else {
//             alert.innerText = "You Win!";
//         }
//     } else if (playerFinalScore <= 21 && playerFinalScore > dealerFinalScore) {
//         player.chips += 3;
//         alert.innerText = "You Win!";
//     } else if (playerFinalScore <= 21 && playerFinalScore === dealerFinalScore) {
//         player.chips++;
//         alert.innerText = "Push";
//     } else if (playerFinalScore < dealerFinalScore && dealerFinalScore <= 21) {
//         alert.innerText = "House Wins";  
//     }
//     //-------->  anything else need to go in here?
// };



//---------------------->    CLEAR SPLIT - this works
const eraseSplit = () => {
    let hand = document.querySelector('#split-hand');
    hand.style.display = "none";
    playerSplitHand = [];
    hand.innerHTML = `<div class="player"><element id="blankSplit" class="player"></element></div>`;  
}




// need split STAY option

//-------------------------------------------->    SPLIT PSEUDOCODE


// const thirdSplitDetector = () => {}
// thirdSplitDetector()
//---------------------->    SPLIT HAND
//---------------------->    SHOW MOVED SPLIT CARD











//---------------------->    STAY BUTTON
stayButton.addEventListener('click', () => {
    handValue();
    // setTimeout(function() {
        dealerAI();
    // },200);
    callHand();
    showMoney();
    stayButton.setAttribute('disabled', true);
})
//---------------------->    BUY IN BUTTON
buyButton.addEventListener('click', () => {
    player.chips += 10;
    showMoney();
    buyButton.style.visibility = "hidden";
})
//---------------------->    DEAL CARD VISUAL
const displayDeal = () => {
    let blankPlayer = document.querySelector("#blankPlayer");
    let blankDealer = document.querySelector("#blankDealer");
        setTimeout(function() {
            blankPlayer.insertAdjacentHTML("beforebegin", `<element class="slide card ${player.hand[0].suit} r${player.hand[0].face}"></element>`)
        },200);
        setTimeout(function() {
            blankDealer.insertAdjacentHTML("beforebegin", `<element id="dealerDown" class="slide card back-red"></element>`);
        },400);
        setTimeout(function() {
            blankPlayer.insertAdjacentHTML("beforebegin", `<element class="slide card ${player.hand[1].suit} r${player.hand[1].face}"></element>`);
        },800);
        setTimeout(function() {
            blankDealer.insertAdjacentHTML("beforebegin", `<element class="slide card ${dealer.hand[1].suit} r${dealer.hand[1].face}"></element>`);
        },1000);
        if (player.hand[0].value === 11 && player.hand[1].value === 10 || player.hand[1].value === 11 && player.hand[0].value === 10){
            alert.innerText = "21 blackjack!";
        }
}

//---------------------->    SHOW NEW CARD
const displayPlayerCard = () => {
    document.getElementById("blankPlayer").insertAdjacentHTML("beforebegin", `<element class="slide card ${player.hand[0].suit} r${player.hand[0].face}"></element>`);
}
const displayDealerCard = () => {
    document.getElementById("blankDealer").insertAdjacentHTML("beforebegin", `<element class="slide card ${dealer.hand[0].suit} r${dealer.hand[0].face}"></element>`);
}

//---------------------->    RESET CARD DISPLAY
const displayReset = () => {
    let childPlayer = document.getElementById("player-hand");
        childPlayer.innerHTML = '';
    let ep = document.createElement("element");
        ep.setAttribute("id","blankPlayer")
        childPlayer.appendChild(ep);
    let childDealer = document.getElementById("dealer-hand");
        childDealer.innerHTML = '';
    let ed = document.createElement("element");
        ed.setAttribute("id","blankDealer");
        childDealer.appendChild(ed);
}
//---------------------->   DISPLAY WINDOW
const showMoney = () => {
    let money = player.chips * 10;
    document.getElementById("chips").innerText = money;
}
const showRound = () => {
    let counter = player.round;
    document.getElementById("round").innerText = counter;
}
//---------------------->    CLEAR FIELD
const clearField = () => {
    player.hand = [];
    dealer.hand = [];
    // playerSplitHand = [];
    deck = [];
    shuffledDeck = [];
    player.round++;
    dealerCall = [];
}
//---------------------->    BUILD A DECK
const makeDeck = () => {
    const suits = ["spades", "hearts", "diamonds", "clubs"];
    const face = ["Ace", "02", "03", "04", "05", "06", "07", "08", "09", "10", "Jack", "Queen", "King"];
    for (let s = 0; s < suits.length; s++){
        for (let f = 0; f < face.length; f++){
            let card = {name: face[f] + " of " + suits[s], face: face[f], suit: suits[s], value: +face[f]}
            if (card.face ===  "Ace"){
                card.value = 11
            } else if (card.face === "Jack" || card.face === "Queen" || card.face === "King"){
                card.value = 10
            }
            deck.push(card);
        }
    }
}
//---------------------->    SHUFFLE DECK
const shuffleCards = ()  => {
    while (deck.length > 0) {
        let index = Math.floor(Math.random() * deck.length);
        let card = deck[index];
        shuffledDeck.push(card);
        deck.splice(index, 1);
    }
}
//---------------------->    DEAL HAND
const dealHand = () => {
    dealer.hand.push(shuffledDeck[0]);
        shuffledDeck.splice(0, 1);
    player.hand.push(shuffledDeck[0]);
        shuffledDeck.splice(0, 1);
    dealer.hand.push(shuffledDeck[0]);
        shuffledDeck.splice(0, 1);
    player.hand.push(shuffledDeck[0]);
        shuffledDeck.splice(0, 1);
}

//---------------------->    HIT ME - deal another card  -->  HIT button
const hitMe = () => {
    let card = shuffledDeck.shift();
    player.hand.unshift(card);
}
//---------------------->   PLAYER HAND VALUE  -->  STAY button

const handValue = () => {
    let playerCall = [];
    for (let i = 0; i < player.hand.length; i++){
        playerCall.push(player.hand[i].value);
    }
    for (let d = 0; d < dealer.hand.length; d++){
        dealerCall.push(dealer.hand[d].value);
        }
        playerFinalScore = playerCall.reduce(getSum);
        dealerFinalScore = dealerCall.reduce(getSum);
    for (let i = 0; i < player.hand.length; i++){
        if (player.hand[i].face == "Ace" && playerFinalScore > 21) {
            playerFinalScore = playerFinalScore - 10;
        } 
    }
    if (playerFinalScore > 21) { //
        alert.innerText = "Bust"; //
       stayButton.setAttribute('disabled', true); //
       } //
}
//---------------------->    AI - DEALER HIT  -->  STAY button
const  dealerAI = () => {
document.getElementById("dealerDown").className = `card ${dealer.hand[0].suit} r${dealer.hand[0].face}`;
    while (dealerFinalScore < playerFinalScore && playerFinalScore <= 21 || dealerFinalScore < 12 && dealerFinalScore === playerFinalScore) {
        let card = shuffledDeck.shift();
        dealer.hand.unshift(card);
        dealerCall.unshift(card.value);
        dealerFinalScore = dealerCall.reduce(getSum);
        displayDealerCard();    
    }
    for (let d = 0; d < dealer.hand.length; d++) {  //---------------------->    IDK WHY THIS WORKS YET BUT IT DOES?
        if (dealer.hand[d].face == "Ace" && dealerFinalScore > 21) {
            dealerFinalScore = dealerFinalScore - 10;
            if (dealerFinalScore < playerFinalScore && playerFinalScore <= 21){
                let card = shuffledDeck.shift();
                dealer.hand.unshift(card);
                dealerCall.unshift(card.value);
                dealerFinalScore = dealerCall.reduce(getSum);
                displayDealerCard();
            }
        }
    }
}

//---------------------->    DOUBLE DOWN
const doubleDown = () => {  
        if (playerFinalScore <= 21 && playerFinalScore > dealerFinalScore || playerFinalScore <= 21 &&  dealerFinalScore > 21) {
            player.chips += 3;
        } else if (playerFinalScore === dealerFinalScore){
            player.chips += 1;
        }
            if (playerSplitScore <= 21 && playerSplitScore > dealerFinalScore || playerSplitScore <= 21 &&  dealerFinalScore > 21) {
                player.chips += 3;
            } else if (playerSplitScore === dealerFinalScore){
                player.chips += 1;
            }
    callHand();
};


// const doubleDown = () => {  

//     if (playerFinalScore <= 21 && playerFinalScore > dealerFinalScore || playerFinalScore <= 21 &&  dealerFinalScore > 21) {
//         player.chips += 3;
//     }
//     if (playerFinalScore === dealerFinalScore){
//         player.chips += 1;
//     }
//     callHand();
// };

//---------------------->    PLAY HAND  -->  STAY button
const callHand = () => {
    if (playerFinalScore === 21) {
        alert.innerText = "21!";
    } if (dealerFinalScore > 21 && playerFinalScore <= 21) {
        player.chips += 3;
        if (playerFinalScore < 17 && dealerFinalScore > 21){
        alert.innerText = "Dealer Bust!";
        } else {
            alert.innerText = "You Win!";
        }
    } else if (playerFinalScore <= 21 && playerFinalScore > dealerFinalScore) {
        player.chips += 3;
        alert.innerText = "You Win!";
    } else if (playerFinalScore <= 21 && playerFinalScore === dealerFinalScore) {
        player.chips++;
        alert.innerText = "Push";
    } else if (playerFinalScore < dealerFinalScore && dealerFinalScore <= 21) {
        alert.innerText = "House Wins";  
    }
    //-------->  anything else need to go in here?
};

//---------------------->       BUY IN
const buyIn = () => {
    if (player.chips === 0) {
        document.querySelector('#buy-button').style.visibility = "visible"
    }   
}
