import { GameOfLife } from "./gameoflife.js";

export interface GameOfLifeView {
    draw(game: GameOfLife): void;
}

export class GameOfLifeStatsView implements GameOfLifeView {
    framerateDisplay: HTMLElement | null;

    constructor() {
        this.framerateDisplay = document.getElementById("stats-framerate");
    }

    public draw(game: GameOfLife): void {
        if (this.framerateDisplay)
        {
            this.framerateDisplay.innerText = Number(game.getFramerate()).toFixed(2);
        }
    }
}

export class GameOfLifeBoardView implements GameOfLifeView {
    width: number;
    height: number;
    boardDiv: HTMLElement | null;
    //tdMap: HTMLElement[][];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.boardDiv = document.getElementById("board");
    }

    public draw(game: GameOfLife): void {
        if (!this.boardDiv) return;

        let b = document.createElement("table");

        let ropen = document.createElement("td");
        ropen.innerText = "[";
        let rclose = document.createElement("td");
        rclose.innerText = "]";
        
        for (let r = 0; r < this.height; r++) {
            let row = document.createElement("tr");

            if (r == 0) { 
                row.appendChild(ropen.cloneNode(true)); 
            }
            else
            {
                row.appendChild(document.createElement("td"));
            }

            row.appendChild(ropen.cloneNode(true));
            
            for (let c = 0; c < this.width; c++) {
                let col = document.createElement("td");
                col.textContent = game.board[r][c] ? "x" : "o";
                row.appendChild(col);
            }
            
            row.appendChild(rclose.cloneNode(true));

            if (r == this.height - 1) { 
                row.appendChild(rclose.cloneNode(true)); 
            }
            else
            {
                row.appendChild(document.createElement("td"));
            }

            b.appendChild(row);
        }

        this.boardDiv.innerHTML = "";
        this.boardDiv.appendChild(b);
    }
}