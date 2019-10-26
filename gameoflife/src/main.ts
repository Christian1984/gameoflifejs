import { GameOfLife } from "./gameoflife.js";
import { GameOfLifeBoardView, GameOfLifeStatsView } from "./gameoflife-view.js";
import { GameOfLifeController } from "./gameoflife-controller.js";

(function() {
    const width = 31;
    const height = 13;

    const g = new GameOfLife(width, height);
    const bv = new GameOfLifeBoardView(width, height);
    const sv = new GameOfLifeStatsView();

    g.addView(bv);
    g.addView(sv);

    const c = new GameOfLifeController(g, 1);
    c.start();

    //setTimeout(() => c.stop(), 1000);
    //setTimeout(() => c.setTickDelay(1000), 1000);
})();