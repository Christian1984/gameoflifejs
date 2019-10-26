import { GameOfLifeView } from "./gameoflife-view.js";
export class GameOfLife
{
    step: number = 0;
    width: number;
    height: number;
    board: boolean[][];
    backup: boolean[][] = [];
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

        this.board = this.emptyBoard();

        this.updateTimestamp();
    }

    //public methods
    public addView(view: GameOfLifeView): void {
        this.views.push(view);
        this.notifyViews();
    }

    public notifyViews(): void {
        for (let i = 0; i < this.views.length; i++) {
            this.views[i].draw(this);
        }
    }

    public update(): void {
        if (this.step === 0) {
            this.backupBoard();
        }
        let board = this.emptyBoard();

        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                let neighbors = this.neighbors(c, r);

                //if(c == 1 &&  r == 1) 
                //    console.log("col", c, "row", r, "neightbors", neighbors);

                if (this.board[r][c]) {
                    if (neighbors < 2 || neighbors > 3) {
                        board[r][c] = false;
                    }
                    else{
                        board[r][c] = true;
                    }
                }
                else {
                    if (neighbors === 3) {
                        board[r][c] = true;
                    }
                }
            }
        }

        this.board = board;

        this.step++;

        this.calcFramerate();
        this.updateTimestamp();

        this.notifyViews();
    }

    public toggle(x: number, y: number): void {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return;
        }

        this.board[y][x] = !this.board[y][x];

        this.notifyViews();
    }

    public reset(): void {
        this.restoreBackup();
        this.step = 0;
        this.notifyViews();
    }

    public clear(): void {
        this.board = this.emptyBoard();
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

    private emptyBoard(): boolean[][] {
        let board: boolean[][] = [];

        for (let r = 0; r < this.height; r++) {
            board.push([]);

            for (let c = 0; c < this.width; c++) {
                board[r].push(false);
            }
        }

        return board;
    }

    private backupBoard(): void {
        this.backup = JSON.parse(JSON.stringify(this.board));
    }

    private restoreBackup(): void {
        this.board = JSON.parse(JSON.stringify(this.backup));
    }

    private neighbors(x: number, y: number): number {
        let count = 0;

        for (let r = y - 1; r <= y + 1; r++) {
            for (let c = x - 1; c <= x + 1; c++) {
                if (c < 0 || c >= this.width || r < 0 || r >= this.height || (r == y && c == x)) {
                    continue;
                }

                if (this.board[r][c]) {
                    count++;
                }
            }
        }

        return count;
    }
}