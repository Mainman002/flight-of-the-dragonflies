
const { ipcRenderer } = require('electron');

const dataDefault = {
    "highscore":0,
    "insaneMode":false,
    "autoInsaneMode":true,
    "ShowParticles":true,
    "allowSaving":true,
    "allowSound":true
};

let gData = dataDefault;

// let highscore = 0;

// Load Data
ipcRenderer.send('requestJSON');

ipcRenderer.on('responseJSON', (event, args)  => {
    if (args){
        gData = args;
        gData.highscore = gData.highscore;
        gData.insaneMode = gData.insaneMode;
        gData.autoInsaneMode = gData.autoInsaneMode;
        gData.ShowParticles = gData.ShowParticles;
        gData.allowSaving = gData.allowSaving;
        gData.allowSound = gData.allowSound;
    }
    // console.log("recievedD: ", data.gData.highscore);
});


// Store Data 
// ipcRenderer.send('getState');

// ipcRenderer.on('sendState', (event, args)  => {
//     args.gData.highscore++;
//     console.log(`Sent data: ${args}`);
// });


// Save data
// ipcRenderer.send('pushJSON', ("", data));




// Game Canvas and Context Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Collision Canvas and Context Variables
const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

// Button Canvas and Context Variables
const buttonCanvas = document.getElementById('buttonCanvas');
const buttonCtx = buttonCanvas.getContext('2d');
buttonCanvas.width = window.innerWidth;
buttonCanvas.height = window.innerHeight;

// Update Variables
let timeToNextSpawn = 0;
let spawnInterval = 600;
let lastTime = 0;

// Debug Variables
globalThis.showButtons = false;
globalThis.godMode = false;
// globalThis.insaneMode = gData.insaneMode;
// globalThis.autoInsaneMode = gData.autoInsaneMode;
// globalThis.ShowParticles = gData.ShowParticles;
// globalThis.allowSaving = gData.allowSaving;
// globalThis.allowSound = gData.allowSound;

// Input Variables
globalThis.MousePos = {'x':0, 'y':0};

// Game Variables
globalThis.gameState = "MainMenu";
// globalThis.gameOver = false;
let score = 0;
// gData.highscore = gData.highscore;
// console.log("TempData: ", gData.highscore)
let canSave = false;

// Graphics Variables
let fontSize = 50;
fontSize = 10+canvas.width/20;
ctx.font = `${fontSize}px Impact`;


const btnVars = [godMode, gData.autoInsaneMode, gData.insaneMode, showButtons, gData.ShowParticles, gData.allowSaving, gData.allowSound];
let buttons = [];
class Button {
    constructor(pos={'x':0, 'y':0}, size=64, text='', variable, panelButton, icon){
        this.icon = icon;
        this.variable = variable;
        this.checked = btnVars[this.variable];
        this.text = text;
        this.pos = pos;
        this.size = size;
        this.frame = 0;
        this.image = new Image();
        this.image.src = 'src/Images/Checkbox_01.png';
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`;
        this.markedForDeletion = false;
        this.panelButton = panelButton;
    }

    // Button update function
    update(){

        switch(this.variable){
            case ' ':
                break;

            case 0:
                this.checked = godMode;
                break;

            case 1:
                this.checked = gData.insaneMode;
                break;

            case 2:
                this.checked = gData.autoInsaneMode;
                break;

            case 3:
                this.checked = showButtons;
                break;

            case 4:
                this.checked = gData.ShowParticles;
                break;

            case 5:
                this.checked = gData.allowSaving;
                break; 
            
            case 6:
                this.checked = gData.allowSound;
                break;
        }

        // console.log(this.pos.x);
        if (MousePos.x > this.pos.x && MousePos.x < this.pos.x+this.size && MousePos.y > this.pos.y && MousePos.y < this.pos.y+this.size){
            if (this.checked){
                this.frame = 3;
            } else {
                this.frame = 1;
            }
        } else {
            if (this.checked){
                this.frame = 2;
            } else {
                this.frame = 0;
            }
        }

        // if (MousePos.y > this.pos.y && MousePos.y < this.pos.y+this.size){
        //     this.frame = 2;
        // } else {
        //     this.frame = 0;
        // }
    }

    // Button click function
    clicked(){
        this.checked = !this.checked;
        switch(this.variable){
            case ' ':
                break;

            case 0:
                godMode = this.checked;
                break;

            case 1:
                gData.insaneMode = this.checked;
                break;

            case 2:
                gData.autoInsaneMode = this.checked;
                break;

            case 3:
                showButtons = this.checked;
                break;

            case 4:
                gData.ShowParticles = this.checked;
                break;
            
            case 5:
                gData.allowSaving = this.checked;
                break;
            
            case 6:
                gData.allowSound = this.checked;
                break;
        }

        // console.log(`value: ${godMode}`)
        if (this.checked){
            this.frame = 2;
        } else {
            this.frame = 0;
        }

        ipcRenderer.send('pushJSON', ("", gData));
        console.log(`gData: ${JSON.stringify(gData)}`);

        // console.log('Clicked: ', this.checked);
    }

    // Button draw function
    draw(){
        if (this.icon){
            if (this.panelButton){
                collisionCtx.fillStyle = this.color;
                collisionCtx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
                ctx.drawImage(this.image, this.frame*64, 0, 64, 64, this.pos.x, this.pos.y, this.size, this.size);
                drawLabel(`${this.text}`, 'white', this.pos.x+45, this.pos.y+this.size/2+7, 'left', 2+canvas.width/this.size/2, 'Verdana', false);
            } else if (showButtons){
                collisionCtx.fillStyle = this.color;
                collisionCtx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
                ctx.drawImage(this.image, this.frame*64, 0, 64, 64, this.pos.x, this.pos.y, this.size, this.size);
                drawLabel(`${this.text}`, 'white', this.pos.x+45, this.pos.y+this.size/2+7, 'left', 2+canvas.width/this.size/2, 'Verdana', false);
            }
        } else {
            if (this.panelButton){
                // collisionCtx.fillStyle = this.color;
                // collisionCtx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
                // ctx.drawImage(this.image, this.frame*64, 0, 64, 64, this.pos.x, this.pos.y, this.size, this.size);
                drawLabel(`${this.text}`, 'white', this.pos.x+45, this.pos.y+this.size/2+7, 'left', 2+canvas.width/this.size/2, 'Verdana', false);
            } else if (showButtons){
                // collisionCtx.fillStyle = this.color;
                // collisionCtx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
                // ctx.drawImage(this.image, this.frame*64, 0, 64, 64, this.pos.x, this.pos.y, this.size, this.size);
                drawLabel(`${this.text}`, 'white', this.pos.x+45, this.pos.y+this.size/2+7, 'left', 2+canvas.width/this.size/2, 'Verdana', false);
            }
        }
    }
}

const btnOffset = 40;
let btnPos = {'x':20, 'y':-20};

let btnID = 1;

// Create Buttons
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset}, 32, '', 3, true, true)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Cheats_______', ' ', false, false)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'God Mode', 0, false, true)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Settings______', ' ', false, false)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Save HighScore', 5, false, true)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Audio', 6, false, true)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Auto Difficulty', 2, false, true)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Insane Difficulty', 1, false, true)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Graphics______', ' ', false, false)
add_btn({'x':btnPos.x, 'y':btnPos.y+btnOffset*btnID}, 32, 'Particles', 4, false, true)

function add_btn(pos={'x':0, 'y':0}, size, text, id, shown, icon){
    buttons.push(new Button({'x':pos.x, 'y':pos.y}, size, text, id, shown, icon));
    btnID++;
    return btnID;
}



let objects = [];
class Object {
    constructor(){
        this.sizeMod = Math.random() * 0.6 + 0.4;
        this.size = {'w':256 * this.sizeMod, 'h':256 * this.sizeMod};
        this.sprite = {'w':256, 'h':256};
        this.pos = {'x':canvas.width, 'y':Math.random() * (canvas.height - this.size.h)};
        this.direction = {'v':Math.random() * 4, 'h':Math.random() * 0.2 + 0.08 + 1};
        this.images = ['src/Images/Cartoon_Dragonfly_01.png', 'src/Images/Cartoon_Dragonfly_02.png'];
        this.image = new Image();
        this.image.src = this.images[Math.floor(Math.random() * this.images.length)];
        this.maxFrame = 10;
        this.frame = Math.floor(Math.random() * this.maxFrame);
        this.timeSinceLastFrame = 0;
        this.frameInterval = Math.random() * 30 + 18;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`;
        this.hasTrail = Math.random() > 0.5;
        this.markedForDeletion = false;
    }

    // Object update function
    update(deltatime){

        if (this.pos.y < 0 - this.size.h/2){this.direction.v = -this.direction.v}
        if (this.pos.y > canvas.height - this.size.h*0.7){this.direction.v = -this.direction.v}

        if (gData.insaneMode){this.direction.h += 0.1;}
        this.pos.x -= this.direction.h;
        this.pos.y += this.direction.v;

        if (this.pos.x < 0 - this.size.w){this.markedForDeletion = true;}

        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval){
            if (this.frame > this.maxFrame){ this.frame = 0;}
            else this.frame++;
            this.timeSinceLastFrame = 0;
            // console.log(deltatime);
            if (gData.ShowParticles && this.hasTrail){
                for (let i = 0; i < 3; i++){
                    particles.push(new Particle(this.pos.x,this.pos.y, this.size, this.color));
                }
            }
        } 
        
        // Game Over

        if (!godMode && this.pos.x < 0 - this.size.w) {
            // gameOver = true;
            gameState = "GameOver";
            canSave = true;
        }
    }

    // Object draw function
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.pos.x, this.pos.y, this.size.w, this.size.h);
        ctx.drawImage(this.image, this.frame*this.sprite.w, 0, this.sprite.w, this.sprite.h, this.pos.x, this.pos.y, this.size.w, this.size.h);
    }
}

let explosions = [];
class Explosion {
    constructor(pos, size) {
        this.image = new Image();
        this.image.src = 'src/Images/Explosion_01.png';
        this.size = {'w':size.w, 'h': size.h};
        this.sprite = {'w':256, 'h':256};
        this.pos = {'x':pos.x, 'y': pos.y};
        this.frame = 0;
        this.maxFrame = 3;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 50;
        this.randomSound = ['src/Sounds/Explosion_01.wav', 'src/Sounds/Hit_01.wav'];
        this.sound = new Audio();
        this.sound.src = this.randomSound[Math.floor(Math.random() * this.randomSound.length)];
        // console.log(Math.floor(Math.random() * this.randomSound.length));
        this.markedForDeletion = false;
   } 

   update(deltatime){
        if (gData.allowSound && this.frame === 0){this.sound.play()};
            this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > this.maxFrame) this.markedForDeletion = true;
        }
   }

   draw(){
        ctx.drawImage(this.image, this.frame*this.sprite.w, 0, this.sprite.w, this.sprite.h, this.pos.x, this.pos.y, this.size.w, this.size.h);
    }
}


let particles = [];
class Particle {
    constructor(x,y, size, color) {
        this.size = size;
        this.x = x + this.size.w/2 + Math.random() * 50 - 25;
        this.y = y + this.size.h/2 + Math.random() * 50 - 25;
        this.radius = Math.random() * this.size.w/10;
        this.maxRadius = Math.random() * 4 + 20;
        this.speedX = Math.random() * 1 + 0.5;
        this.color = color;
        this.markedForDeletion = false;
   } 

   update(){
        this.x += this.speedX;
        this.radius += 0.3;
        if (this.radius > this.maxRadius-5) this.markedForDeletion = true;
   }

   draw(){
       ctx.save();
       ctx.globalAlpha = 1 - this.radius/this.maxRadius;
       ctx.beginPath();
       ctx.fillStyle = this.color;
       ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
       ctx.fill();
       ctx.restore();
   }
}


function drawLabel(_text, _color, _x, _y, _align, _size, _font, _shadow){
    let temp_fontSize = _size;
    ctx.font = `${temp_fontSize}px ${_font}`;

    ctx.textAlign = _align;

    if (_shadow){
        // Shadow
        ctx.fillStyle = 'black';
        ctx.fillText(`${_text}`, _x+3, _y+3);
    }
    

    // Text
    ctx.fillStyle = _color;
    ctx.fillText(`${_text}`, _x, _y);
}


function drawMainMenu(){
    drawLabel(`Flight of the Dragonflies`, 'white', canvas.width/2, canvas.height/2-40, 'center', 10+canvas.height/15, 'Impact', true);
    drawLabel(`Click Mouse to Play`, 'white', canvas.width/2, canvas.height/2+80, 'center', 1+canvas.height/25, 'Impact', true);
    drawLabel(`HighScore: ${gData.highscore}`, 'white', 40, canvas.height-30, 'left', 10+canvas.height/15, 'Impact', true);
}


function drawScore(){
    // fontSize = 10+canvas.width/20;
    // ctx.font = `${fontSize}px Impact`;
    drawLabel(`Score: ${score}`, 'white', 40, canvas.height-30, 'left', 10+canvas.height/15, 'Impact', true);
    if (score < gData.highscore){
        drawLabel(`HighScore: ${gData.highscore}`, 'white', canvas.width-40, canvas.height-30, 'right', 10+canvas.height/15, 'Impact', true);
    } else {
        drawLabel(`!New! HighScore: ${score}`, 'white', canvas.width-40, canvas.height-30, 'right', 10+canvas.height/15, 'Impact', true);
    }
}


function drawGameOver(){
    ctx.textAlign = 'center';

    drawLabel(`GAME OVER your Score: ${score}`, 'white', canvas.width/2, canvas.height/2-70, 'center', 10+canvas.height/15, 'Impact', true);

    if (score > 0 && score > gData.highscore){
        drawLabel(`your !NEW! High Score: ${score}`, 'white', canvas.width/2, canvas.height/2+70, 'center', 10+canvas.height/15, 'Impact', true);

    } else if (gData.highscore > 0) {
        drawLabel(`High Score: ${gData.highscore}`, 'white', canvas.width/2, canvas.height/2+70, 'center', 10+canvas.height/15, 'Impact', true);
    }
}


window.addEventListener('mousemove', function(e){
    MousePos.x = e.x;
    MousePos.y = e.y;
});


window.addEventListener('mousedown', function(e){
    if (gameState === "GameOver"){
        reset_game();
    }

    if (gameState === "MainMenu"){
        start_game();
    }

    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    objects.forEach(ob => {
        if (ob.randomColors[0] === pc[0] && ob.randomColors[1] === pc[1] && ob.randomColors[2] === pc[2]){
            ob.markedForDeletion = true;
            score++;
            if (gData.autoInsaneMode && score > 20){gData.insaneMode = true};
            explosions.push(new Explosion(ob.pos, ob.size));
        }
    });

    buttons.forEach(btn => {
        if (btn.randomColors[0] === pc[0] && btn.randomColors[1] === pc[1] && btn.randomColors[2] === pc[2]){
            btn.clicked();
        }
    });
});


window.addEventListener('keydown', (e) => {
    if (e.key === "Enter" && !e.repeat || e.key === " " && !e.repeat){
        if (gameState === "GameOver"){
            reset_game();
        }

        if (gameState === "MainMenu"){
            start_game();
        }
    }
});


function start_game(){

    canSave = false;
    score = 0;
    console.log('highscore: ', JSON.stringify(gData));
    if (gData.autoInsaneMode){gData.insaneMode = false};
    objects = [];
    explosions = [];
    particles = [];
    update_window();
    gameState = "Playing";
}


function reset_game(){

    if (score > 0 && score > gData.highscore){
        gData.highscore = score;
    }

    // data = gData;
        // Save data
    ipcRenderer.send('pushJSON', ("", gData));
    // console.log(`gData: ${JSON.stringify(gData)}`);
    // }

    canSave = false;
    score = 0;
    // console.log('highscore: ', gData.highscore);
    if (gData.autoInsaneMode){gData.insaneMode = false};
    objects = [];
    explosions = [];
    particles = [];
    update_window();
    gameState = "Playing";
}


function update_window(){

    // Canvas size refresh
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Collision Canvas size refresh
    collisionCanvas.height = canvas.height;
    collisionCanvas.width = canvas.width;

    // Button Canvas size refresh
    buttonCanvas.height = canvas.height;
    buttonCanvas.width = canvas.width;

    // Text size refresh
    // ctx.textAlign = 'center';
    fontSize = 10+canvas.width/20;
    ctx.font = `${fontSize}px Impact`;

}


function update(timestamp){
    // Adjust Canvas to match Window Dymensions
    if (canvas.width != window.innerWidth){
        update_window();
    }

    // Set window height when window height dimension changes
    if (canvas.height != window.innerHeight){
        update_window();
    }


    if (gameState === "Playing") {
        buttonCtx.clearRect(0, 0, canvas.width, canvas.height);
        collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let deltatime = timestamp - lastTime;
        lastTime = timestamp;
        timeToNextSpawn += deltatime;
        if (timeToNextSpawn > spawnInterval){
            objects.push(new Object());
            timeToNextSpawn = 0;
            objects.sort(function(a,b){
                return a.size.w - b.size.w;
            });
        }

        [...particles, ...objects, ...explosions, ...buttons].forEach(ob => ob.update(deltatime));
        [...particles, ...objects, ...explosions, ...buttons].forEach(ob => ob.draw());
        buttons = buttons.filter(object => !object.markedForDeletion);
        objects = objects.filter(object => !object.markedForDeletion);
        explosions = explosions.filter(object => !object.markedForDeletion);
        particles = particles.filter(object => !object.markedForDeletion);
        drawScore();
    }
    if (gameState === "GameOver") {
        buttonCtx.clearRect(0, 0, canvas.width, canvas.height);
        collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawGameOver();
    }

    if (gameState === "MainMenu"){
        drawMainMenu();
    }

    requestAnimationFrame(update);
}

update(0);
