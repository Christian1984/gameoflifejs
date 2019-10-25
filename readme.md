# The Plan

Build a nice and clean implementation of Conway's Game of Life using

- TypeScript
- Nodejs
- SCSS

To add somewhat of a QoL feature the app should start the server automatically and then open the default browser and navigate to the website... Possible node modules are:

- express (seems a bit overpowered, maybe node itself can perform this simple task)
- open

# Notes

Compile SASS:

- run `npx sass --watch gameoflife/src:gameoflife/build`
- TODO: automate through build script!

Compile TypeScript:

- run `npx tsc -w`
- TODO: automate through build script!