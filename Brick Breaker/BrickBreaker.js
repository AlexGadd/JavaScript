//canvas variables
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var gx = x
var gy = y
var colour = "#0095DD"

//ball variables
var dx = 2;
var dy = -2;
var ballRadius = 10;
var ballCollision = ballRadius -2;

//Ghost ball variables
var ghostRadius = 10;


//paddle variables
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;

//brick variables
var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = []
for(var c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++){
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}
//game variables
var score =0
var lives = 3

//adding event listeners and functions for key presses as well as mouse movement
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup", keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = true;
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = true;
    };
};

function keyUpHandler(e){
    if(e.key == 'Right' || e.key == 'ArrowRight'){
        rightPressed = false;
    }
    else if(e.key == 'Left' || e.key == 'ArrowLeft'){
        leftPressed = false;
    };
}
function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2
    }
}

function colourRandomiser(){
    var lst = ["#9B59B6", "#45B39D", "#F5B041", "#0095DD", "#E74C3C", "#99A3A4"]
    var num = Math.floor(Math.random() * lst.length)
    colour = lst[num]
}

//collision detection
function collisionDetection(){
    for(var c=0; c < brickColumnCount; c++){
        for(var r=0; r < brickRowCount; r++){
            var b = bricks[c][r];
            if(b.status == 1){
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight){
                    dy = -dy
                    b.status = 0
                    score++;
                    colourRandomiser()
                    if(score == brickColumnCount*brickRowCount){
                        alert("YOU WIN, CONGRATULATIONS!!!");
                        document.location.reload();
                    }
            }
            }
        }
    }
}

//ball drawing function
function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballRadius,0,Math.PI*2);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath();
};
//ghost ball drawing function
function drawGhostBall(){
    ctx.beginPath();
    ctx.arc(gx,gy,ballRadius,0,Math.PI*2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    ctx.closePath();
};

//paddle drawing function
function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    ctx.fillStyle = colour;
    ctx.fill();
    ctx.closePath()
};

//brick drawing function
function drawBricks(){
    for(var c=0; c<brickColumnCount; c++){
        for(var r=0; r<brickRowCount; r++){
            if(bricks[c][r].status == 1){
                var brickX = (c*(brickWidth + brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight + brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX
                bricks[c][r].y = brickY
                ctx.beginPath()
                ctx.rect(brickX, brickY ,brickWidth, brickHeight);
                ctx.fillStyle = colour;
                ctx.fill()
                ctx.closePath();
            }
        }


    }
}
//score function
function drawScore(){
    ctx.font = "16px Arial"
    ctx.fillStyle = colour
    ctx.fillText("Score: "+score,8,20)
}

//lives function
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = colour;
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

//drawing the game
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawGhostBall();
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection()
    drawScore()
    drawLives()

    if(x + dx > canvas.width - ballCollision || x + dx < ballCollision) {
        dx = -dx;
    };

    if(y + dy < ballCollision) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballCollision) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--
            if(!lives){
                alert("GAME OVER");
                document.location.reload();
            }
            else{
                x = canvas.width/2;
                y= canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }

    }
    gx = x
    gy = y
    x += dx;
    y += dy;

    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    requestAnimationFrame(draw)
};

draw();
