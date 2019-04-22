


//---------------------->    SPLIT BUTTON
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
    let card = document.getElementById("player-hand");
    card.removeChild(card.childNodes[0]);
    document.getElementById("blankSplit").insertAdjacentHTML("beforebegin", `<element class="fade card ${playerSplitHand[0].suit} r${playerSplitHand[0].face}"></element><button id="split-hit-button" class="split-hit button">SPLIT HIT</button>`);
}

// //---------------------->    SPLIT HIT BUTTON - this works
// const splitHitButton = document.querySelector('split-hit');



// splitHitButton.addEventListener('click', () => {
//     splitHitMe();
//     displayHitSplitCard();
// })
// const splitHitMe = () => {
//     let card = shuffledDeck.shift();
//     playerSplitHand.unshift(card);
// }
// const displayHitSplitCard = () => {
//     document.getElementById("blankSplit").insertAdjacentHTML("beforebegin", `<element class="slide card ${playerSplitHand[0].suit} r${playerSplitHand[0].face}"></element>`);
// }
//---------------------->    SPLIT

//--> this button does not work yet
// splitStayButton.addEventListener('click', () => {
//     console.log("hi split stay button")
// })

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

