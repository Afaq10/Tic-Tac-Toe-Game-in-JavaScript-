let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-btn');
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');
let winnerSound = document.getElementById("winner-sound");
let loserSound = document.getElementById("loser-sound");


let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = (resetBtn) => {
    resetBtn.addEventListener('click', () => {
        location.reload();
    });

};

resetGame(resetBtn);

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        console.log('Box was clicked');
        if(turnO) {
            box.innerText = 'O';
            turnO = false;
        } else {
            box.innerText = 'X';
            turnO = true;
        }
        box.disabled= true;

        checkWinner();
    });
}
);

let winnerFound = false;

const showWinner = (winner, winnerFinder) => {
    if (winnerFinder) {
        msg.innerText = `Winner is ${winner}`;
        msgContainer.classList.remove('hide');
        resetBtn.innerText = "New Game";

        winnerSound.play();

        confetti({
            particleCount: 1000,
            spread: 500,
            origin: { y: 0.6 }
        });
    }
};

const checkWinner = () => {

    for ( let patterns of winPatterns) {
        let pos1Val = boxes[patterns[0]].innerText;
        let pos2Val = boxes[patterns[1]].innerText;
        let pos3Val = boxes[patterns[2]].innerText;
        
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log('Winner is', pos1Val);
                boxes.forEach( box => box.disabled = true );
                winnerFound = true;
                showWinner(pos1Val, winnerFound);
                break;
            }   
        }
    }

    if (!winnerFound) {
        const isDraw = Array.from(boxes).every(box => box.innerText !== "");
        if (isDraw) {
            console.log("Draw!");
            msg.innerText = "Draw!";
            msgContainer.classList.remove('hide');
            msgContainer.style.backgroundColor = "red";

            loserSound.play();
        }
    }
};
