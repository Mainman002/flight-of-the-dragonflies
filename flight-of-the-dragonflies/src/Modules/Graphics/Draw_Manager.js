export default class Draw_Manager{
  constructor(buttons){
  }


  init(gX, gY){
    this.ctx = globalThis.ctx;
    this.gX = gX;
    this.gY = gY;
    this.console_log("Loaded:", "Draw Manager");

    this.rectX = 50;
    this.rectY = 50;
    this.rectWidth = 100;
    this.rectHeight = 100;
    this.cornerRadius = 20;

    this.hovered = false;

  }


  drawImage(img, x, y, w, h, _ctx){
    if (_ctx){
      _ctx.globalAlpha = 1.0;
      _ctx.drawImage(
      img,
      x,
      y,
      w,
      h
      );
      _ctx.globalAlpha = 1.0;
    }
  }


  drawSquare(_x, _y, _w, _h, _color, _a, _ctx){
    if (_ctx){
      this.ctx = _ctx;
      this.ctx.globalAlpha = 1.0;
      this.ctx.beginPath();
      this.ctx.fillStyle = _color;
      this.ctx.globalAlpha = _a;
      this.ctx.fillRect(_x, _y, _w, _h);
      this.ctx.closePath();
    } else {
      this.console_log("Error!:", "drawImage no Context");
    }
    this.ctx.globalAlpha = 1.0;
  }


  drawButton(_x, _y, _w, _h, _text, _colorText, _colorBase, _colorOver, _a, _bevel, _canvas, _ctx){
    this.canvas = _canvas;
    this.ctx = _ctx;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.text = _text;
    this.colorText = _colorText;
    this.colorBase = _colorBase;
    this.colorOver = _colorOver;
    this.a = _a;
    this.b = _bevel;
    this.hovering = false;

    // hovering = false;

    if (_ctx){

      let lineHeight = this.ctx.measureText(_text).width;

      if (MouseX >= parseFloat(_canvas.style.paddingLeft)+this.x && MouseY >= parseFloat(_canvas.style.paddingTop)+this.y && MouseX <= parseFloat(_canvas.style.paddingLeft)+this.x+this.w && MouseY <= parseFloat(_canvas.style.paddingTop)+this.y+this.h){
        this.roundRect(this.x, this.y, this.w, this.h, this.bevel, this.colorOver, this.a, this.ctx);
        this.drawSquare(this.x, this.y, this.w, this.h, "Red", this.a, this.ctx);
        // this.drawBevelOutline(this.x, this.y, this.w, this.h, 8, "Green", this.a);

        
        // this.hovering = true;
        // hoveredButton = this.hovering;
        
        // window.addEventListener("click", Respond);
        // console.log(this.hovering);

      } else {

        // if (this.hovering = true){
        //   this.hovering = false;
        //   hoveredButton = this.hovering;
        // }
        
        // console.log(this.hovering);
        // window.removeEventListener("click", Respond);

        this.roundRect(this.x, this.y, this.w, this.h, this.bevel, this.colorBase, this.a, this.ctx);
        // this.drawBevelOutline(this.x, this.y, this.w, this.h, 8, "Teal", this.a);
        this.drawSquare(this.x, this.y, this.w, this.h, "Black", this.a, this.ctx);
      }
      this.draw_text(this.x+this.w/2-lineHeight/2, this.y+this.h-this.h/2.5, this.text, this.colorText, this.a, this.ctx);
    } else {
      this.console_log("Error!:", "drawImage no Context");
    }


    // function Respond(e) {
    //   console.log('clicked');
    // }

    // const x = document.getElementById(_canvas);
  
    // window.addEventListener("click", Respond);

      // window.onclick = (e) => { {
      //   if (e.button == 0 && this.hovering == true){
      //     console.log('clicked');
      //   };
      // }

        // The click event is only one time triggered
        // by clicking the "click here" button.
    // }





    // if (this.hovering){
    //   window.onclick = (event) => {
    //     console.log('clicked');
    //   };
    // }

    this.ctx.globalAlpha = 1.0;
  }


  drawOutline(_x, _y, _w, _h, _lW, _color, _a, _ctx){
    if (_ctx){
      this.ctx = _ctx;
      this.ctx.beginPath();
      this.ctx.strokeStyle = _color;
      this.ctx.fillStyle = _color;
      this.ctx.globalAlpha = _a;

      // Set faux rounded corners
      this.ctx.lineJoin = "round";
      this.ctx.lineWidth = _lW;

      // Stroke Outline
      this.ctx.strokeRect(_x, _y, _w, _h);

      // Fill Rect If Needed
      // this.ctx.fillRect(_x+(_r/2), _y+(_r/2), _w-_r, _h-_r);
      
      this.ctx.closePath();
      this.ctx.globalAlpha = 1.0;
      this.ctx = globalThis.ctx;
    // } else {
      // this.ctx = globalThis.ctx;
      // this.console_log("Error!:", 'No Context in drawOutline');
    }
  }


  drawBevelOutline(_x, _y, _w, _h, _r, _color, _a){
    this.ctx.beginPath();

    this.ctx.strokeStyle = _color;
    this.ctx.globalAlpha = _a;

    // Set faux rounded corners
    this.ctx.lineJoin = "round";
    this.ctx.lineWidth = _r;

    // Stroke Outline
    this.ctx.strokeRect(_x+(_r/2), _y+(_r/2), _w-_r, _h-_r);

    // Fill Rect If Needed
    // this.ctx.fillRect(_x+(_r/2), _y+(_r/2), _w-_r, _h-_r);

    // this.ctx.fillStyle = _color;
    
    this.ctx.closePath();
    this.ctx.globalAlpha = 1.0;

  }

  roundRect(_x, _y, _w, _h, _b, _color, _a, _ctx) {
    this.ctx = _ctx
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.color = _color;
    this.a = _a;
    this.b = _b;

    if (this.w < 2 * this.b) this.b = this.w / 2;
    if (this.h < 2 * this.b) this.b = this.h / 2;
    this.ctx.beginPath();

    this.ctx.fillStyle = this.color;
    this.ctx.globalAlpha = this.a;

    this.ctx.moveTo(this.x + this.b, this.y);
    this.ctx.arcTo(this.x + this.w, this.y, this.x + this.w, this.y + this.h, this.b);
    this.ctx.arcTo(this.x + this.w, this.y + this.h, this.x, this.y + this.h, this.b);
    this.ctx.arcTo(this.x, this.y + this.h, this.x, this.y, this.b);
    this.ctx.arcTo(this.x, this.y, this.x + this.w, this.y, this.b);
    this.ctx.closePath();

    this.ctx.fill();
    this.ctx.globalAlpha = 1.0;

    return this;
  }


  drawGrid(_x, _y, _w, _h, _color){
    for (let _x = 0; _x <= this.gX-1; _x++){
        for (let _y = 0; _y <= this.gY-1; _y++){
            this.drawSquare(_w*_x,_h*_y,_w-2,_h-2, _color, 1, ctx);
          }
      }
  }


  draw_label(_x, _y, _text, _value, _color, _bevel, _a, _ctx){
    if (_ctx){
      this.ctx = _ctx;
      let lineHeight = this.ctx.measureText(_text + " " + _value).width;
      
      // Draw Beveled Corner Shape
      this.roundRect(_x-10, _y-28, lineHeight+19, 40, _bevel, "Black", _a, this.ctx);

      this.ctx.font = "24px Arial";
      this.ctx.fillStyle = _color;
      this.ctx.globalAlpha = _a;
      this.ctx.fillText(_text + " " + _value, _x, _y);
      this.ctx = globalThis.ctx;
    } else {
      this.ctx = globalThis.ctx;
    }
  }


  draw_text(_x, _y, _text, _color, _a, _ctx){
    let lineHeight = _ctx.measureText(_text).width;

    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = _color;
    this.ctx.globalAlpha = _a;
    this.ctx.fillText(_text, _x, _y);
  }


  console_log(_string, _value){
    console.log(_string + " " + _value);
  }


}

