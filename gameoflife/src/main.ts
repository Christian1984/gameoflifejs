import { GameOfLife } from "./gameoflife.js";
import { GameOfLifeBoardViewController, GameOfLifeStatsView } from "./gameoflife-view.js";
import { GameOfLifeController } from "./gameoflife-controller.js";

(function() {
    const width = 31;
    const height = 13;

    const g = new GameOfLife(width, height);
    const bv = new GameOfLifeBoardViewController(g);
    const sv = new GameOfLifeStatsView();

    g.addView(bv);
    g.addView(sv);

    const c = new GameOfLifeController(g, 100);
})();