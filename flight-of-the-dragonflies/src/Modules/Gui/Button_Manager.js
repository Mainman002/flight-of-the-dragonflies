export default class Button {
  constructor(_x, _y, _w, _h, _text, _colorText, _colorBase, _colorOver, _a, _bevel, _canvas, _ctx, id) {
      this.canvas = _canvas;
      this.ctx = _ctx;
      this.text = _text;
      this.lineHeight = this.ctx.measureText(this.text).width;
      this.pos = {'x':_x,'y':_y};
      this.x = _x;
      this.y = _y;
      this.w = _w;
      this.h = _h;
      this.colorText = _colorText;
      this.colorBase = _colorBase;
      this.colorOver = _colorOver;
      this.a = _a;
      this.b = _bevel;
      this.id = id;
      this.hovering = false;

      // window.addEventListener('click');

      // window.onmousedown = (e) => {
      //   if (e.button == 0 && this.hovering){
      //     // console.log('clicked');
      //     // clickHold = true;
      //     this.click();
      //   } // else {
      //     // clickHold = false;
      //   //};
      // }
  
      // window.onmouseup = (e) => {
      //   if (e.button == 0 && this.hovering){
      //     // console.log('clicked');
      //     clickHold = false;
      //     this.click();
      //   } else {
      //     clickHold = false;
      //   };
      // }
  }

  init(_x, _y, _w, _h, _text, _colorText, _colorBase, _colorOver, _a, _bevel, _canvas, _ctx, id){
    this.canvas = _canvas;
    this.ctx = _ctx;
    this.text = _text;
    this.lineHeight = this.ctx.measureText(this.text).width;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
    this.colorText = _colorText;
    this.colorBase = _colorBase;
    this.colorOver = _colorOver;
    this.a = _a;
    this.b = _bevel;
    this.id = id;
    this.hovering = false;
    this.id = id;
    globalThis.drawManager.console_log("Loaded:", id);
  }


  draw(ctx, canvas){

    if (MouseX >= this.x && MouseY >= parseFloat(this.canvas.style.paddingTop)+this.y && MouseX <= parseFloat(this.canvas.style.paddingLeft)+this.x+this.w && MouseY <= parseFloat(this.canvas.style.paddingTop)+this.y+this.h){
      this.draw_label(this.x, this.y+labelH+labelOffset, 32, 32, this.text, "White", this.b, this.a, this.ctx);
      this.color = this.colorOver;

      this.hovering = true;
      // hoveredButton = true;
      
    } else {
      this.draw_label(this.x, this.y+labelH+labelOffset, this.w, this.h, this.text, "White", this.b, this.a, this.ctx);
      this.color = this.colorBase;
      if (this.hovering){
        this.hovering = false;
        // hoveredButton = false;
      }
      
    }
  }

  // update(ctx, canvas){
    // window.onmousedown = (e) => {
    //   if (e.button == 0 && this.hovering){
    //     this.click();
    //   }
    // }
  // }


  draw_label(_x, _y, _w, _h, _text, _color, _bevel, _a, _ctx){
    // this.ctx = _ctx;
    let lineHeight = this.ctx.measureText(_text).width;
  
    // Draw Beveled Corner Shape
    drawManager.roundRect(this.x, this.y, this.w, this.h, this.b, this.color, this.a, this.ctx);
    this.ctx.font = "24px Arial";
    this.ctx.fillStyle = _color;
    this.ctx.globalAlpha = _a;
    this.ctx.fillText(this.text, _x, _y);
  }

  click() {
      drawManager.console_log('Btn:', `${this.text} is id: ${this.id}`);
      // return `The ${this.text} is color ${this.colorText}`;
  }


}


