import { GameOfLife } from "./gameoflife.js";

export interface GameOfLifeView {
    draw(game: GameOfLife): void;
}

export class GameOfLifeStatsView implements GameOfLifeView {
    framerateDisplay: HTMLElement | null;
    framerateAvgDisplay: HTMLElement | null;
    framerateMinDisplay: HTMLElement | null;
    framerateMaxDisplay: HTMLElement | null;

    constructor() {
        this.framerateDisplay = document.getElementById("stats-framerate");
        this.framerateAvgDisplay = document.getElementById("stats-framerate-avg");
        this.framerateMinDisplay = document.getElementById("stats-framerate-min");
        this.framerateMaxDisplay = document.getElementById("stats-framerate-max");
    }

    public draw(game: GameOfLife): void {
        let fr = game.getFramerates();
        
        if (this.framerateDisplay)
        {
            this.framerateDisplay.innerText = Number(fr.current).toFixed(2);
        }

        if (this.framerateAvgDisplay)
        {
            this.framerateAvgDisplay.innerText = Number(fr.avg).toFixed(2);
        }

        if (this.framerateMinDisplay)
        {
            this.framerateMinDisplay.innerText = Number(fr.min).toFixed(2);
        }

        if (this.framerateMaxDisplay)
        {
            this.framerateMaxDisplay.innerText = Number(fr.max).toFixed(2);
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