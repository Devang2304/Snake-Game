// defining the required data to do further code
let inputDir={x:0,y:0};
const foodSound= new Audio('foodSound.mp3');
const moveSound=new Audio('moveSound.mp3');
const musicSound=new Audio('');
let speed=prompt("Enter the speed of the snake !");
// let speed=10;
let score=0;
let lastPaintTime=0;
//declared the default position of the snake and the food
let snakeArray=[
    {x:13,y:15}
];
food={x:6,y:7};

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime-lastPaintTime)/1000<1/speed) {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
}

//writing collision part:
function isCollide(snake) {
    for (let i = 1; i < snakeArray.length; i++) {
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
        
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!!");
        snakeArray=[{x:13 , y:15}];
        
        score=0;
    }
    //updating the score and creating food on random location
    if(snakeArray[0].y===food.y && snakeArray[0].x===food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreVal){
            hiscoreVal=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreVal));
            highscore.innerHTML="High Score: "+ hiscoreVal;
        }
        scoreBox.innerHTML="Score :" +score;
        snakeArray.unshift({x: snakeArray[0].x +inputDir.x,y: snakeArray[0].y +inputDir.y});
        let a=2;
        let b=16;
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
    //moving the snake
    for (let i =snakeArray.length-2;i>=0; i--) {
        snakeArray[i+1]={...snakeArray[i]};  
    }
    snakeArray[0].x+=inputDir.x;
    snakeArray[0].y+=inputDir.y;
 
    
    // part 2: showing the snake and food
    //showing the snake
    board.innerHTML="";
    snakeArray.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        
        if (index==0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    //showing the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
        board.appendChild(foodElement);
}
musicSound.play();
let hiscore=localStorage.getItem("hiscore");
if (hiscore===null) {
    hiscoreVal=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreVal));
} else {
    hiscoreVal=JSON.parse(hiscore);
    highscore.innerHTML="High Score: " +hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;

    
        default:
            break;
    }
});