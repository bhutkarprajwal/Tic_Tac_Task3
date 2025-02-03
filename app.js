let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msg = document.querySelector("#win");
let hide = document.querySelector(".hide");
let newgamebtn = document.querySelector("#newgamebtn")
let main = document.querySelector("main");
let turn = document.querySelector("#turn");
let clicks;

var turnO;
const resetGame = () => {
    turnO = false; //playerX or playerO
    enableBoxes();
    hide.classList.add("hide");
    main.classList.remove("hide");
    clicks = null;
    turn.innerText = "Turn:";
};

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) { //plyrO
            turn.innerText = "Turn of X";
            box.innerText = "O";
            turnO = false;
           
        }
        else { //plyrX
            turn.innerText = "Turn of O";
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;  //to prevent further clicks
        clicks++;
        chkWinner();  //function call to winner check
    });
});

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false; //to enable buttons   disabled property
        box.innerText = "";
    }
};


const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true; //to disable buttons after winner has been found
    }
};

const showWinner = (winner) => { //displays winner message
    msg.innerText = "Congratulations,Winner is "+winner;
    hide.classList.remove("hide");
    disableBoxes();
    main.classList.add("hide");
};

const chkWinner = () => {
    for(let pattern of winPatterns) {  //pattern is a array variable that will return all the the winPattern;eg: 1,2,3 
        //boxes[pattern[0].innerText] ; this is the first value of pattern arry.eg: 1,2,3...here 1 is pointed
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){//to make sure that 3 position are filled
            if(pos1Val == pos2Val && pos2Val == pos3Val){
                console.log("winner", pos1Val);
                showWinner(pos1Val);
            }
        }
    }
    if(clicks >= 9){
        turn.innerText="Draw";
    }
};

newgamebtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);
