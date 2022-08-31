// defining the required data to do further code
let inputDir={x:0,y:0};
const foodSound= new Audio('');
const gameOverSound=new Audio('');
const moveSound=new Audio('');
const musicSound=new Audio('');
let speed=5;
let score=0;
let lastPaintTime=0;
//declared the default position of the snake and the food
let snakeArray=[
    {x:13,y:15}
];
food={x:6,y:7};

//writing collision part:
function isCollide(snake) {
    for (let i = 0; i < snakeArray.length; i++) {
        //if the snake collide to its body
        if (snake[i].x===snake[0].x && snake[i].y==snake[0].y) {
            return true;
        }
    }
    //if the snake collide with wall 
    if (snake[0].x>=18 || snake[0].y>=18 || snake[0].x<=0 || snake[0].y<=0) {
        return true;
    }
    return false;
}

function gameEngine() {
    // if the snake collide with wall or body then all score and size will get reset
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!!");
        snakeArray=[{x:13 , y:15}];
        musicSound.play();
        score=0;
    }
    //updating the score and creating food on random location
    if(snakeArray[0].y===food.y && snakeArray[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>ScoreVal){
            ScoreVal=score;
            localStorage.setItem("ScoreVal",JSON.stringify(score));
            highscore.innerHTML="High Score: "+ ScoreVal;
        }
        scoreBox.innerHTML="Score :" +score;
        //dont know how to add direction change as the direction changes
        // and how to generate food on random places.

        // continue code here once you get the logic of the further code
    }
}