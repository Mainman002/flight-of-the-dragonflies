export default class Player {
    constructor(x, y, w, h, sX, sY, ctx, canvas, id){
        this.canvas = canvas;
        this.ctx = ctx
        this.pos = {'x':x,'y':y};
        this.pWidth = 100;
        this.pHeight = 100;
        this.xSpeed = 5;
        this.ySpeed = 5;
        this.bounces = 0;
        this.id = id;
        // this.colliding = [];
    }


    init(_img, x, y, xS, yS, ctx, canvas, id){
        this.canvas = canvas;
        this.ctx = ctx
        this.pos = {'x':x,'y':y};
        this.xSpeed = xS;
        this.ySpeed = yS;
        this._img = _img;
        this.id = id;
        globalThis.drawManager.console_log("Loaded:", "Player Entity");
    }


    draw(ctx, canvas){
        globalThis.drawManager.drawImage(document.getElementById(this._img), this.pos.x, this.pos.y, this.pWidth, this.pHeight, this.ctx);
        // this.dM.drawSquare(this.xPos, this.yPos, this.pWidth, this.pHeight, this._color);
    }


    getDistance(x1, y1, x2, y2){
        let xDistance = x2 - x1;
        let yDistance = y2 - y1;
    
        return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
    }


    update(){

        // this.colliding;

        // collList.forEach(ob => {
        //     drawManager.console_log('ColList:', JSON.stringify(ob));
                // return ob['id'];
        // });

        // collList.forEach(ob => {
        //     if (this.getDistance(this.pos.x, this.pos.y, ob['pos']['x'], ob['pos']['y']) < this.pWidth/2 + this.pWidth/2){
        //         this._img = 'img_redBall';
        //         this.xSpeed = -this.xSpeed;
        //         this.ySpeed = -this.ySpeed;
        //     } else {
        //         this._img = 'img_blueBall';
        //     }
        // });
        

        // Bouncing Rect Width 
        if (this.pos.x > this.canvas.width - this.pWidth){
            this.xSpeed = -this.xSpeed;
            this.bounces ++;
            globalThis.bounces ++;
        }else if (this.pos.x < 0){
            this.xSpeed = -this.xSpeed;
            this.bounces ++;
            globalThis.bounces ++;
        }

        // Bouncing Rect Height 
        if (this.pos.y > this.canvas.height - this.pHeight){
            this.ySpeed = -this.ySpeed;
            this.bounces ++;
            globalThis.bounces ++;
        }else if (this.pos.y < 0){
            this.ySpeed = -this.ySpeed;
            this.bounces ++;
            globalThis.bounces ++;
        }

        // Bouncing Rect Motion Speed
        this.pos.x += this.xSpeed;
        this.pos.y += this.ySpeed;

        if (clickHold){
            this.pos.x = this.canvas.width/2 - this.pWidth/2;
            // _ob.pos.y = _ob.canvas.height/2 - _ob.pHeight/2;
        }
    }
}



