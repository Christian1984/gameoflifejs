class GameOfLife
{
    step: number = 0;
    size: {x: number, y: number};
    board: boolean[][];
    boardDiv: HTMLElement | null;

    constructor(x: number = 25, y: number = 15) {
        this.size = {x, y};
        this.board = [];

        for (let r = 0; r < this.size.y; r++) {
            this.board.push([]);

            for (let c = 0; c < this.size.x; c++) {
                this.board[r].push(false);
            }
        }

        this.boardDiv = document.getElementById("board");
    }

    update() {
        this.board[this.step % this.size.y][this.step % this.size.x] = true;
        this.step++;
    }
}