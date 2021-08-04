export default class User {
    constructor(id, ctx, canvas){
        this.id = id;
        this.ctx = ctx;
        this.canvas = canvas;
        this.pos = {'x':32,'y':500};
        this.size = {'w':200,'h':25};
        this.speed = 3;
    }


    draw(){
        drawManager.drawSquare(this.pos.x, this.pos.y, this.size.w, this.size.h, 'black', 1.0, this.ctx);
    }


    // update(){

        // if (!clickHold){
        // if (this.pos.x > this.canvas.width - this.size.w){
        //     this.speed = -this.speed;
        // }
        // if (this.pos.x < 0){
        //     this.speed = 5;
        // }
        // }
        

    //     if (clickHold && this.pos.x > this.canvas.width - this.size.w){
    //         this.pos.x = this.canvas.width - this.size.w;
    //         // _ob.pos.y = _ob.canvas.height/2 - _ob.pHeight/2;
    //     } else {
    //         this.pos.x += this.speed;
    //     }
    // }


}
