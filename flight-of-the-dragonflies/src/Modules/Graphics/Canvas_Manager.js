export default class Canvas_Manager{
    constructor(){
    }
  
  
    init(_z, _x, _y, _w, _h, _canvas){
        this.z = _z;
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;

        let canvas = document.createElement(_canvas);

        canvas.id = _canvas;
        canvas.width = _w;
        canvas.height = _h;
        canvas.style.zIndex = _z;
        canvas.style.position = "absolute";
        // canvas.style.border = "1px solid";

        document.body.appendChild(canvas);

        this.canvas = document.getElementById(_canvas);

        this.ctx = this.canvas.getContext("2d");

        this.canvas.width = this.w;
        this.canvas.height = this.h;

        this.canvas.style.paddingLeft = String(this.x + 'px');
        this.canvas.style.paddingTop = String(this.y + 'px');

        // drawManager.ctx = this.ctx;
        // drawManager.drawSquare(0, 0, this.w, this.h, "Red", 1.0, this.ctx);
        
    }


    change_rect(_x, _y, _w, _h, _ctx){

    }


  }