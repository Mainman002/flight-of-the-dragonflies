export default class FPS_Manager{
    constructor(){
    }
    init(){
        globalThis.drawManager.console_log("Loaded:", "FPS Manager");
    }


    update(_draw){
        // FPS Calculation Debug
        window.requestAnimationFrame(() => {
            const now = performance.now();
            while (globalThis.times.length > 0 && globalThis.times[0] <= now - 1000) {
                globalThis.times.shift();
            }
            globalThis.times.push(now);
            globalThis.fps = globalThis.times.length;
        });
        requestAnimationFrame(_draw);
    }


  }

