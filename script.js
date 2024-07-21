let boxDOM = document.querySelectorAll(".box");
let resentDOM = document.getElementById("btn-reset");
let winnerContainer = document.querySelector(".msg-container");
let winnerMessage = document.getElementById("msg");
let newGameBtn= document.getElementById("new-btn");

let player = document.querySelector(".player");
let player1 = document.getElementById("Player-1");
let player2 = document.getElementById("Player-2");

let turn = document.querySelector(".user-turn");
turn.innerText = `now turn is : Player-1`;


let user0 = true;

player1.innerText = player1.innerText + ": 0";
player2.innerText = player2.innerText + ": X";


const winnerLogic = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


boxDOM.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(user0){
            turn.innerText = "";
            user0= false;
            box.innerText="0";
            turn.innerText = `now turn is : Player-2`;
        }
        else{
            turn.innerText = "";
            user0= true;
            box.innerText="X";
            turn.innerText = `now turn is : Player-1`;
        }
        box.disabled = true;
        handleWinner();
    })
})


let disabledBoxes = ()=>{
    winnerContainer.classList.remove("hidden");
    for(let box in boxDOM){
        box.disabled = true;
    }
}

let showWinner = (value)=>{
    if (value==="0"){
        winnerMessage.innerText= `Congratulation, The winner is player-1`;
    }
    else{
        winnerMessage.innerText= `Congratulation, The winner is player-2`;
    }
    player.classList.add("hide-player");
    disabledBoxes();
}

let enabledBoxes = ()=>{
    for(let box of boxDOM){
        box.disabled = false;
        box.innerText = "";
    }
    turn.innerText = `now turn is : Player-1`;
}

const resetGame = ()=>{
    user0 = true;
    enabledBoxes();
    winnerContainer.classList.add("hidden");
    player.classList.remove("hide-player");

}
let showDraw = (value)=>{
    enabledBoxes();
    user0 = true;
    winnerContainer.classList.remove("hidden");
    player.classList.remove("hide-player");
    winnerMessage.innerText= `Match is draw!`;
}

let handleWinner = ()=>{
    let allBoxesFilled = true;

    for(let pattern of winnerLogic){
        let pos1Val= boxDOM[pattern[0]].innerText;
        let pos2Val= boxDOM[pattern[1]].innerText;
        let pos3Val= boxDOM[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val!= ""){
            if(pos1Val===pos2Val && pos2Val === pos3Val && pos1Val===pos3Val){
                console.log(pos1Val, pos2Val, pos3Val);
                console.log("winner");
                showWinner(pos1Val);
                return;
            }
        }
    }

    for(let box of boxDOM){
        if(box.innerText === ""){
            allBoxesFilled = false;
            break;
        }
    }
    if (allBoxesFilled){
        showDraw();
    }
}



newGameBtn.addEventListener("click",resetGame);
resentDOM.addEventListener("click",resetGame);