import { GameOfLifeController } from "./gameoflife-controller.js";

(function() {
    const c = new GameOfLifeController(200);
    c.start();

    //setTimeout(() => c.stop(), 1000);
    //setTimeout(() => c.setTickDelay(1000), 1000);
})();