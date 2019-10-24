class GameOfLife
{
    step: number = 0;
    size: {x: number, y: number};
    board: boolean[][];
    boardDiv: HTMLElement | null;

    constructor(x: number = 31, y: number = 13) {
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

    draw() {
        if (!this.boardDiv) return;

        let b = document.createElement("table");

        let ropen = document.createElement("td");
        ropen.innerText = "[";
        let rclose = document.createElement("td");
        rclose.innerText = "]";
        
        for (let r = 0; r < this.size.y; r++) {
            let row = document.createElement("tr");

            if (r == 0) { 
                row.appendChild(ropen.cloneNode(true)); 
            }
            else
            {
                row.appendChild(document.createElement("td"));
            }

            row.appendChild(ropen.cloneNode(true));
            
            for (let c = 0; c < this.size.x; c++) {
                let col = document.createElement("td");
                col.textContent = this.board[r][c] ? "x" : "o";
                row.appendChild(col);
            }
            
            row.appendChild(rclose.cloneNode(true));

            if (r == this.size.y - 1) { 
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

(function() {
    const g = new GameOfLife();
    setInterval(() => {
        g.update(); 
        g.draw();
    }, 100);
})();