/* Sleep function **/
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function randint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Flags the canvas
let cnv;

/* Centers the canvas */
function centerCanvas() {
	// Centers the canvas
	cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}

/* Recenters the canvas on window re-size */
function windowResized() {
	centerCanvas();
}

/* p5 preload func */
let gs0, gs1, gs2;
function preload() {
    gs0 = loadImage('assets/gs0.png');
    gs1 = loadImage('assets/gs1.png');
    gs2 = loadImage('assets/gs2.png');
}

/* p5 Setup function */
let my_grid;
function setup() {
	// Create the canvas
	cnv = createCanvas(windowWidth, windowHeight);
	// Center the Canvas
	centerCanvas();
    background(color(0, 42, 25));
    image(gs0, windowWidth-980, 0);
    image(gs1, 0, windowHeight-311);
    image(gs2, 0, 0);
}

/* p5 draw function */
function draw() {
}
