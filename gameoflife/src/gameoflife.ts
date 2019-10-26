import { GameOfLifeView } from "./gameoflife-view.js";
export class GameOfLife
{
    step: number = 0;
    width: number;
    height: number;
    board: boolean[][];
    views: GameOfLifeView[];

    //stats
    private timestampLastTick: number = 0;
    private frameRate: number = 0;
    private avgFrameRate: number = 0
    private minFrameRate: number = Number.MAX_VALUE;
    private maxFrameRate: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.board = [];
        this.views = [];

        for (let r = 0; r < this.height; r++) {
            this.board.push([]);

            for (let c = 0; c < this.width; c++) {
                this.board[r].push(false);
            }
        }

        this.updateTimestamp();
    }

    //public methods
    public addView(view: GameOfLifeView): void {
        this.views.push(view);
    }

    public notifyViews(): void {
        for (let i = 0; i < this.views.length; i++) {
            this.views[i].draw(this);
        }
    }

    public update(): void {
       //demo
        this.board[this.step % this.height][this.step % this.width] = 
        !this.board[this.step % this.height][this.step % this.width];
        
        //TODO

        this.step++;

        this.calcFramerate();
        this.updateTimestamp();

        this.notifyViews();
    }

    public toggle(x: number, y: number): void {
        if (x < 0 || x >= this.width || y < 0 || y > this.height) {
            return;
        }

        this.board[y][x] = !this.board[y][x];

        this.notifyViews();
    }

    public reset(): void {
        for (let r = 0; r < this.height; r++) {
            this.board.push([]);

            for (let c = 0; c < this.width; c++) {
                this.board[r][c] = false;
            }
        }

        this.step = 0;

        this.notifyViews();
    }

    public getFramerates(): { current: number, avg: number, min: number, max: number } {
        return { 
            current: this.frameRate,
            avg: this.avgFrameRate,
            min: this.minFrameRate,
            max: this.maxFrameRate
        };
    }

    public updateTimestamp(): void {
        this.timestampLastTick = Date.now();
    }

    // private methods
    private calcFramerate(): void {
        let currentFramerate = 1000 / (Date.now() - this.timestampLastTick);
        this.frameRate = currentFramerate;

        this.avgFrameRate = ((this.avgFrameRate * (this.step - 1)) + currentFramerate) / this.step;
 
        if (currentFramerate > this.maxFrameRate) {
            this.maxFrameRate = currentFramerate;
        }
        
        if (currentFramerate < this.minFrameRate) {
            this.minFrameRate = currentFramerate;
        }
    }
}