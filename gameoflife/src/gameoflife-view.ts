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
    tds: HTMLElement[][] = [];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.boardDiv = document.getElementById("board");

        if (this.boardDiv) {
            let table = document.createElement("table");
    
            let ropen = document.createElement("td");
            ropen.innerText = "[";
            let rclose = document.createElement("td");
            rclose.innerText = "]";
            let comma = document.createElement("td");
            comma.textContent = ",";
            
            for (let r = 0; r < this.height; r++) {
                let tdRow = [];
                let row = document.createElement("tr");
    
                //add opening braces for the entire array of arrays
                if (r == 0) { 
                    row.appendChild(ropen.cloneNode(true)); 
                }
                else
                {
                    row.appendChild(document.createElement("td"));
                }
    
                //add opening braces for the current row array
                row.appendChild(ropen.cloneNode(true));
                
                for (let c = 0; c < this.width; c++) {
                    let col = document.createElement("td");
                    row.appendChild(col);

                    if (c < this.width - 1) {
                        row.appendChild(comma.cloneNode(true));
                    }

                    tdRow.push(col);
                }
                
                //add closing braces for the current row array
                row.appendChild(rclose.cloneNode(true));
    
                //add closing braces for the entire array of arrays
                if (r == this.height - 1) { 
                    row.appendChild(rclose.cloneNode(true)); 
                }
                else
                {
                    row.appendChild(comma.cloneNode(true));
                }
    
                table.appendChild(row);



                this.tds.push(tdRow);
    
                this.boardDiv.appendChild(table);
            }
        }
    }

    public draw(game: GameOfLife): void {
        if (!this.boardDiv) return;

        for (let r = 0; r < this.height; r++) {
            for (let c = 0; c < this.width; c++) {
                if (game.board[r][c]) {
                    this.tds[r][c].textContent = "1";
                    this.tds[r][c].classList.add("alive");
                }
                else {
                    this.tds[r][c].textContent = "0";
                    this.tds[r][c].classList.remove("alive");
                }
            }
        }
    }
}