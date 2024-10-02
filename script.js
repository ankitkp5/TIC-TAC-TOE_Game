let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newgamebtn = document.querySelector("#new-btn");
let msgC = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; // true means player "O", false means player "X"
let count = 0; // This will count the number of clicks (moves)

const winsPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add click event listener to all boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Increment the move count each time a box is clicked
        count++;
        
        if (turnO) {
            box.innerText = "O"; // Change to "O" instead of "0"
            box.style.color="blue";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color="red";
            turnO = true;
        }
        
        box.disabled = true; // Disable the clicked box
        checkWinner();
    });
});

// Function to reset the game
const resetGame = () => {
    turnO = true;
    count = 0; // Reset the move counter
    enableBoxes();
    msgC.classList.add("hide"); // Hide the message container
    msg.innerText = ""; // Clear the message
};

// Function to enable all boxes after reset
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

// Function to display the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgC.classList.remove("hide"); // Show the message container
};

// Function to display draw message
const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgC.classList.remove("hide"); // Show the message container
};

// Function to check if there is a winner
const checkWinner = () => {
    for (let pattern of winsPattern) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        // Check if the current pattern has all identical and non-empty values
        if (pos1val !== "" && pos2val !== "" && pos3val !== "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                showWinner(pos1val);
                disableAllBoxes(); // Disable all boxes after the game is won
                return;
            }
        }
    }

    // If the move count reaches 9 and no winner, it's a draw
    if (count === 9) {
        showDraw();
        disableAllBoxes(); // Disable all boxes after the game is drawn
    }
};

// Function to disable all boxes after a win or draw
const disableAllBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Event listeners for new game and reset buttons
newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
