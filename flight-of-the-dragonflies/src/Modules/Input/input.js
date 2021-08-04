export default class Input_Manager {
  constructor() {
    // this.canvas = canvas;


    onmousemove = function(e){
      MouseX = e.clientX;
      MouseY = e.clientY;
      // console.log("mouse location:", MouseX, MouseY)

      if (MouseX < window.innerWidth){
        if (MouseX < parseInt(String(canvas.style.paddingLeft))){
          activeCanvas = sideLCanvas;
          // drawManager.console_log('Canvas:', parseInt(String(canvas.style.paddingLeft)));
        }
  
        if (MouseX > parseInt(String(canvas.style.paddingLeft))){
          activeCanvas = canvas;
          // drawManager.console_log('CanvasL:', parseInt(String(sideLCanvas.style.paddingLeft)));
        }
      }
      

      if (clickHold == true && MouseX > 100 && MouseX < window.innerWidth-100){
        sideLCanvas.width = String(MouseX, 'px');
        canvas.style.paddingLeft = String(MouseX + 'px');
      }
    }


    // window.onclick = (e) => {
    //   if (e.button == 0){
    //     if (hoveredButton){
    //       console.log('clicked');
    //       clickHold = !clickHold;
    //     }
        

    //   //   clickHold = !clickHold;

    //   // } else {
    //   //   clickHold = false;
    //   };
    // }


    // window.onmousedown = (e) => {
    //   if (e.button == 0 && hoveredButton){
    //     console.log('clicked');
    //     clickHold = true;
        // Btn.Btn.click();
    //   }
    // }


    // window.onmouseup = (e) => {
    //   if (e.button == 0 && hoveredButton){
    //     console.log('clicked');
    //     hoveredButton = false;
    //     clickHold = false;
        // Btn.click();
    //   }
    // }


    window.addEventListener('keydown', (e) => {
      if (e.key === "ArrowLeft" && !e.repeat || e.key === "a" && !e.repeat){
        console.log("move left");
        this.c2.width -= String(32, 'px');

        let new_offset = parseFloat(this.c1.style.paddingLeft) - 32;
        this.c1.style.paddingLeft = String(new_offset + 'px');
        // this.c2.width += String(32, 'px');
      }

      if (e.key === "ArrowRight" && !e.repeat || e.key === "d" && !e.repeat){
        console.log("move right");
        // console.log("testMove: ", this.c1)
        // console.log("testMove: ", this.c2)

        // this.c1.style.paddingLeft = String(this.c1.x + 'px');
        // this.c2.width += String(this.c1.style.paddingLeft, 'px');
        // this.c1.style.paddingLeft = String(this.c2.width + 'px');

        let new_offset = parseFloat(this.c1.style.paddingLeft) + 32;
        this.c2.width = String(new_offset, 'px');
        // console.log("Padd: ", new_offset);
        this.c1.style.paddingLeft = String(new_offset + 'px');

        // this.c2.width -= String(32, 'px');
      }
    });

    // window.addEventListener('keyup', (e) => {
    //   // console.log(`Key "${e.key}" released  [event: keyup]`);
    //   if (e.key === "ArrowLeft" && !e.repeat || e.key === "a" && !e.repeat){
    //     if (ui.speed < 0) {
    //       console.log("stop");
    //       ui.stop();
    //     }
    //   }

      // if (e.key === "ArrowRight" && !e.repeat || e.key === "d" && !e.repeat){
      //   if (player.speed > 0) {
      //     console.log("stop");
      //     ui.stop();
      //   }
      // }
    // });

    // window.addEventListener('click', (e) => {
    //   console.log(e)
    // });
  }

  init(_x, _y, _w, _h, _c1, _c2){
    this.c1 = _c1;
    this.c2 = _c2;
    this.x = _x;
    this.y = _y;
    this.w = _w;
    this.h = _h;
  }

}
