//--> BLACK JACK GAME

//--------------------------->BUGS
// when there are 3 aces only two get counted as 1s, the last is still an 11
// Does not stop at 0 with chips anymore


//-->   END GAME PSEUDOCODE
//intervalTimer needed for dealer, how to break up each card draw?
//opening page?
//restart option

// why is it that sometimes the card gets unshifted into the wrong place in the array?

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
let dealerAICall = [];
let alert = document.querySelector("#alert")
const getSum = (total, num) => {return total + num;}


//---------------------->   BUTTONS
const startButton = document.getElementById('start-button');
const playButton = document.getElementById('play-button');
// const splitHitButton = document.getElementById('split-hit-button');
const hitButton = document.getElementById('hit-button');
// const splitButton = document.getElementById('split-button')  //--> change rule so dealer quits at 17
const doubleButton = document.getElementById('doubleButton')  //--> Double Down
// const restartButton = document.getElementById('restart-button')  //--> Restart or Reset
const stayButton = document.getElementById('stay-button');
const buyButton = document.getElementById('buy-button');

//---------------------->    START GAME EVENT LISTENER
playButton.addEventListener('click', () => {
    displayReset();
    buttonsOn();
    playBtnOff();
    windowOn();
    alert.innerText = "";
    if (player.chips > 0) {
        player.chips -= 1;
        clearField();
        showRound();
        makeDeck();
        shuffleCards();
        dealHand();
        displayDeal();
        showMoney();
        playerStartScore();
        document.getElementById("dealerScore").innerText = dealer.hand[1].value + "+?";
    } else {
        buyIn();
    }     
})
//---------------------->    DOUBLE DOWN BUTTON
doubleButton.addEventListener('click', () => {
    console.log('double click')
    if (player.chips > 0){
    // if (!playerSplitHand.length > 0){
    // player.chips -= 1;
    // } else {
        player.chips -= 1;
        // }
        hitMe();
        displayPlayerCard();
        playerHandValue();
        cardReveal();
        dealerHandValue();
        showDealerScore();
        dealerAI();
        dealerHandValue();
        doubleDown(); 
        showMoney(); 
        showDealerScore();
        showPlayerScore();
        hitOff();
        stayOff();
        doubleOff();
        playBtnOn();
    } else {
        doubleOff();
        alert.innerText = "Not enough money";
    }
})
//---------------------->    HIT BUTTON
hitButton.addEventListener('click', () => {
    hitMe();
    displayPlayerCard();
    showMoney();
    playerHandValue(); 
    showPlayerScore();
})

//---------------------->    STAY BUTTON
stayButton.addEventListener('click', () => {
    playerHandValue();
    dealerHandValue();
    cardReveal();
    // setTimeout(function() {
    dealerAI();
    // },200);
    callHand();
    showMoney();
    showDealerScore();
    showPlayerScore();
    hitOff();
    stayOff();
    doubleOff();
    playBtnOn();
})
//---------------------->    BUY IN BUTTON
buyButton.addEventListener('click', () => {
    player.chips += 10;
    showMoney();
    hitOff();
    stayOff();
    doubleOff();
    playBtnOn();
    buyButton.style.visibility = "hidden";
})
//---------------------->    BUTTON ON/OFF SWITCHES
const windowOn = () => {
    let box = document.querySelector('.big-box');
    box.style.visibility = "visible";
    let double = document.getElementById('doubleButton');
    double.style.visibility = "visible";
}

const playBtnOn = () => {
    playButton.classList.add('gold');
    playButton.classList.remove('gray');
    playButton.removeAttribute('disabled');
}

const playBtnOff = () => {
    playButton.setAttribute('disabled', true);
    playButton.classList.add('gray');
    playButton.classList.remove('gold');
}

const buttonsOn = () => {
    stayButton.classList.add('gold');
    stayButton.classList.remove('gray');
    stayButton.removeAttribute('disabled');
    doubleButton.classList.add('gold');
    doubleButton.classList.remove('gray');
    doubleButton.removeAttribute('disabled', false);
    hitButton.classList.add('gold');
    hitButton.classList.remove('gray');
    hitButton.removeAttribute('disabled');
}

// const buttonsOff = () => {
const doubleOff = () => {
    doubleButton.setAttribute('disabled', true);
    doubleButton.classList.add('gray');
    doubleButton.classList.remove('gold');
}
const hitOff = () => {
    hitButton.setAttribute('disabled', true);
    hitButton.classList.add('gray');
    hitButton.classList.remove('gold');
}
const stayOff = () => {
    stayButton.setAttribute('disabled', true);
    stayButton.classList.add('gray');
    stayButton.classList.remove('gold');
}


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
            doubleOff();
            hitOff();
            alert.innerText = "BlackJack!";
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
const showPlayerScore = () => {
    let score = playerFinalScore;
    document.getElementById("player-score").innerText = score;
}
const showDealerScore = () => {
    let score = dealerFinalScore;
    document.getElementById("dealerScore").innerText = score;
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
    dealerFinalScore = 0;
    playerFinalScore = 0;
}
const playerStartScore = () => {
    let score =  player.hand[0].value + player.hand[1].value;
    if (score > 21) {
        score = 12
    }
    document.getElementById("player-score").innerText = score;
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

const playerHandValue = () => {
    let playerCall = [];
    for (let i = 0; i < player.hand.length; i++){
        playerCall.push(player.hand[i].value);
    }

        playerFinalScore = playerCall.reduce(getSum);

    for (let i = 0; i < player.hand.length; i++){
        if (player.hand[i].name == "Ace of spades" && playerFinalScore > 21) {
            playerFinalScore = playerFinalScore - 10;
        } 
        if (player.hand[i].name == "Ace of hearts" && playerFinalScore > 21) {
            playerFinalScore = playerFinalScore - 10;
        } 
        if (player.hand[i].name == "Ace of diamonds" && playerFinalScore > 21) {
            playerFinalScore = playerFinalScore - 10;
        } 
        if (player.hand[i].name == "Ace of clubs" && playerFinalScore > 21) {
            playerFinalScore = playerFinalScore - 10;
        } 
    }
}

const dealerHandValue = () => {
    let dealerCall = [];
    for (let d = 0; d < dealer.hand.length; d++){
        dealerCall.push(dealer.hand[d].value);
        }

        dealerFinalScore = dealerCall.reduce(getSum);

    for (let i = 0; i < dealer.hand.length; i++){
        if (dealer.hand[i].name == "Ace of spades" && dealerFinalScore > 21) {
            dealerFinalScore = dealerFinalScore - 10;
        } 
        if (dealer.hand[i].name == "Ace of hearts" && dealerFinalScore > 21) {
            dealerFinalScore = dealerFinalScore - 10;
        } 
        if (dealer.hand[i].name == "Ace of diamonds" && dealerFinalScore > 21) {
            dealerFinalScore = dealerFinalScore - 10;
        } 
        if (dealer.hand[i].name == "Ace of clubs" && dealerFinalScore > 21) {
            dealerFinalScore = dealerFinalScore - 10;
        } 
    }
    if (dealerFinalScore > 21) { //
        alert.innerText = "Dealer Bust"; //
       stayButton.setAttribute('disabled', true); //
       } //
}
//---------------------->    AI - DEALER HIT  -->  STAY button
const cardReveal = () => document.getElementById("dealerDown").className = `card ${dealer.hand[0].suit} r${dealer.hand[0].face}`;
const  dealerAI = () => {

    while (dealerFinalScore < playerFinalScore && playerFinalScore <= 21 || dealerFinalScore < 12 && dealerFinalScore === playerFinalScore) {
        let card = shuffledDeck.shift();
        dealer.hand.unshift(card);
        displayDealerCard(); 
        dealerAICall.unshift(card.value);
        dealerFinalScore = dealerAICall.reduce(getSum);
        dealerHandValue();
          
    }  
}

//---------------------->    DOUBLE DOWN
// Still need to figure out how to get this working, goes into the negative instead of stopping the game
const doubleDown = () => {  
    if (player.chips > 0) {
        if (playerFinalScore <= 21 && playerFinalScore > dealerFinalScore || playerFinalScore <= 21 &&  dealerFinalScore > 21) {
            player.chips += 3;
        } else if (playerFinalScore === dealerFinalScore){
            player.chips += 1;
        }
    //         if (playerSplitScore <= 21 && playerSplitScore > dealerFinalScore || playerSplitScore <= 21 &&  dealerFinalScore > 21) {
    //             player.chips += 3;
    //         } else if (playerSplitScore === dealerFinalScore){
    //             player.chips += 1;
    //         } 
    // } else {
        // alert.innerText = "Not enough money";  // this isn't working
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
    if (player.chips <= 0) {
        document.querySelector('#buy-button').style.visibility = "visible"
    }   
}
