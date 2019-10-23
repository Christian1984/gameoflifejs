class GameOfLife
{
    sayHello(): void {
        console.log("Hello World!");
    }
}

(function() {
    const g = new GameOfLife();
    g.sayHello();
})();