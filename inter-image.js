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
let txt, cnfg, imgs = new Array();
function preload() {
    txt = loadStrings('assets/text.txt');
    cnfg = loadJSON('cnfg/config.json', callback=load_images);
}

function load_images() {
    for (var i = 0; i < cnfg["images"].length; i++) {
        imgs.push(loadImage(cnfg["images"][i]["path"]));
    }
}

function render_images() {
    centerCanvas();
    background(color(cnfg["bg_color"]));
    for (var img in imgs) {
        eval(cnfg["images"][img]["func"]);
    }
    textSize(32);
    fill(color("#B9D784"));
    text("Logan Haug", windowWidth-200, windowHeight-50);
    textSize(40);
    text("My Representation Project :)", windowWidth/3, windowHeight/2);
    textSize(16);
    text("All images")
}

function render_text(t, x, y, w, h, s) {
    noStroke();
    render_images();
    textSize(s);
    fill(color(255, 255, 255));
    text(t, x, y, w, h);
}

function get_boarders() {
    // x0, y0, x1, y1
    rv = {};
    for (img in cnfg["images"]) {
        rv[img] = [];
        rv[img].push(eval(cnfg["images"][img]["x"]));
        rv[img].push(eval(cnfg["images"][img]["y"]));
        rv[img].push(rv[img][0] + imgs[img].width);
        rv[img].push(rv[img][1] + imgs[img].height);
    }
    return rv;
}

let curr_img
function checkMouse(x, y, boarders) {
    for (var b in boarders) {
        // horizontal check
        curr_img = boarders[b]
        if ((x >= curr_img[0] && x <= curr_img[2]) && (y >= curr_img[1] && y <= curr_img[3])) {
            return b;
        }
    }
    return false;
}

/* p5 Setup function */
let my_grid, boarders;
function setup() {
	// Create the canvas
	cnv = createCanvas(windowWidth, windowHeight);
	// Center the Canvas
    render_images();
    boarders = get_boarders();
    frameRate(20);
}

/* p5 draw function */
let curr_tb;
function draw() {
    console.log(checkMouse(mouseX, mouseY, boarders))
    switch (checkMouse(mouseX, mouseY, boarders)) {
        case "0":
            render_text(txt, windowWidth/3.1, windowHeight/20, windowWidth/3, windowHeight/4, 16);
            break;
        case "1":
            render_text(txt, windowWidth/3*2, windowHeight/20*10, windowWidth/3, windowHeight/4, 16);
            break;
        case "2":
            render_text(txt, windowWidth/60, windowHeight/2, windowWidth/4.2, windowHeight/2.1, 16);
            break;
        default:
            render_images();
            break;
    }
}

