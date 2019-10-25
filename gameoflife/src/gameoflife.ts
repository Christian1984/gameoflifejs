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
    private frameRateSampleSize: number = 100;

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
        this.board[this.step % this.size.y][this.step % this.size.x] = true;
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

    public getFramerate(): number {
        return this.frameRate;
    }

    private calcFramerate(): void {
        let currentFramerate = 1000 / (Date.now() - this.timestampLastTick);
        
        if (this.frameRate === 0) {
            this.frameRate = currentFramerate;
            return;
        }

        this.frameRate = 
            (((this.frameRateSampleSize - 1) * this.frameRate) + currentFramerate) / this.frameRateSampleSize;
    }
}