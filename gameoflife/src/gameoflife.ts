import { GameOfLifeView } from "./gameoflife-view.js";
export class GameOfLife
{
    step: number = 0;
    size: { x: number, y: number };
    board: boolean[][];
    views: GameOfLifeView[];

    //stats
    private timestampLastTick: number = 0;
    private frameRate: number = 0;
    private avgFrameRate: number = 0
    private minFrameRate: number = Number.MAX_VALUE;
    private maxFrameRate: number = 0;

    constructor(x: number, y: number) {
        this.size = {x, y};
        this.board = [];
        this.views = [];

        for (let r = 0; r < this.size.y; r++) {
            this.board.push([]);

            for (let c = 0; c < this.size.x; c++) {
                this.board[r].push(false);
            }
        }

        this.updateTimestamp();
    }

    public addView(view: GameOfLifeView): void {
        this.views.push(view);
    }

    public update(): void {
       //demo
        this.board[this.step % this.size.y][this.step % this.size.x] = 
        !this.board[this.step % this.size.y][this.step % this.size.x];
        
        //TODO

        this.step++;

        for (let i = 0; i < this.views.length; i++) {
            this.views[i].draw(this);
        }

        this.calcFramerate();
        this.updateTimestamp();
    }
    
    public updateTimestamp(): void {
        this.timestampLastTick = Date.now();
    }

    public getFramerates(): { current: number, avg: number, min: number, max: number } {
        return { 
            current: this.frameRate,
            avg: this.avgFrameRate,
            min: this.minFrameRate,
            max: this.maxFrameRate
        };
    }

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