import { GameOfLife } from "./gameoflife.js";

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

        let startButton = document.getElementById("controls-flow-start");
        if (startButton) {
            startButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.start();
            });
        }

        let stopButton = document.getElementById("controls-flow-stop");
        if (stopButton) {
            stopButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.stop();
            });
        }

        let stepButton = document.getElementById("controls-flow-step");
        if (stepButton) {
            stepButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.gameOfLife.update();
            });
        }

        let resetButton = document.getElementById("controls-flow-reset");
        if (resetButton) {
            resetButton.addEventListener("click", (e) => {
                e.preventDefault();
                this.gameOfLife.reset();
                this.stop();
            });
        }
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