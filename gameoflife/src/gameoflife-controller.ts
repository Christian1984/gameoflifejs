class GameOfLifeController
{
    // game model
    private gameOfLife: GameOfLife;

    // ticks
    private tickDelay: number;
    private tickInterval: number | null = null;

    //stats
    private timestampLastTick: number;
    private frameRate: number = 0;
    private frameRateSampleSize: number = 100;

    constructor(tickDelay = 100) {
        this.tickDelay = tickDelay;
        this.gameOfLife = new GameOfLife(31, 13);

        this.timestampLastTick = Date.now();
    }

    public start(): void {
        if (this.tickInterval) {
            clearInterval(this.tickInterval);
        }

        this.updateTimestamp();

        this.tickInterval = setInterval(() => {
            this.gameOfLife.update(); 
            this.draw();
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

    private updateTimestamp(): void {
        this.timestampLastTick = Date.now();
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

    private draw(): void {
        if (!this.gameOfLife.boardDiv) return;

        let b = document.createElement("table");

        let ropen = document.createElement("td");
        ropen.innerText = "[";
        let rclose = document.createElement("td");
        rclose.innerText = "]";
        
        for (let r = 0; r < this.gameOfLife.size.y; r++) {
            let row = document.createElement("tr");

            if (r == 0) { 
                row.appendChild(ropen.cloneNode(true)); 
            }
            else
            {
                row.appendChild(document.createElement("td"));
            }

            row.appendChild(ropen.cloneNode(true));
            
            for (let c = 0; c < this.gameOfLife.size.x; c++) {
                let col = document.createElement("td");
                col.textContent = this.gameOfLife.board[r][c] ? "x" : "o";
                row.appendChild(col);
            }
            
            row.appendChild(rclose.cloneNode(true));

            if (r == this.gameOfLife.size.y - 1) { 
                row.appendChild(rclose.cloneNode(true)); 
            }
            else
            {
                row.appendChild(document.createElement("td"));
            }

            b.appendChild(row);
        }

        this.gameOfLife.boardDiv.innerHTML = "";
        this.gameOfLife.boardDiv.appendChild(b);

        this.calcFramerate();
        this.updateTimestamp();
        
        let fr_display = document.getElementById("stats-framerate");
        if (fr_display)
        {
            fr_display.innerText = Number(this.frameRate).toFixed(2);
        }
    }
}

(function() {
    const c = new GameOfLifeController(10);
    c.start();

    //setTimeout(() => c.stop(), 1000);
    //setTimeout(() => c.setTickDelay(1000), 1000);
})();