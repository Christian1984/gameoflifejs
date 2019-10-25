import { GameOfLife } from "./gameoflife.js";
import { GameOfLifeBoardView } from "./gameoflife-view.js";

export class GameOfLifeController
{
    // game model
    private gameOfLife: GameOfLife;

    // ticks
    private tickDelay: number;
    private tickInterval: number | null = null;

    constructor(game: GameOfLife, tickDelay: number = 100) {
        this.gameOfLife = game;
        this.tickDelay = tickDelay;
    }

    public start(): void {
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }

        this.gameOfLife.updateTimestamp();

        this.tickInterval = setInterval(() => {
            this.gameOfLife.update();
        }, this.tickDelay);
    }

    public stop(): void {
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }
    }

    public setTickDelay(tickDelay: number): void {
        this.stop();
        this.tickDelay = tickDelay;
        this.start();
    }
}