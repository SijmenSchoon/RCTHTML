var context = document.getElementById('theCanvas').getContext('2d');
var lastTime;

var width = (window.location.hash == '') ? 64 : +window.location.hash.substring(1);
var height = width;
console.log('Size: ' + width + 'x' + height);

var stats = new Stats();
stats.setMode(1);

stats.domElement.style.position = 'absolute';
stats.domElement.style.left = 0;
stats.domElement.style.top = 0;
document.body.appendChild(stats.domElement);

// Load the necessary images
ResourceManager.onReady = init;
ResourceManager.loadImages([
	'img/grass64.png', 'img/wall64.png'
]);

map = new Array(width);
for (var i = 0; i < map.length; i++)
	map[i] = new Array(height);
terrain = new Terrain(map)

function init()
{
	console.log('Done loading images');

	// Create a world
	Simplex.init(Math.random() * (2 << 31 - 1));
	for (var i = 0; i < map.length; i++)
	{
		for (var j = 0; j < map[i].length; j++)
		{
			terrain.map[j][i] = new Tile(Math.floor(Simplex.noise2d(i / 32, j / 32) * 4), i, j);
			terrain.map[j][i].prerender()
		}
	}
	terrain.prerender()
	console.log('World created');

	console.log('Starting main loop');
	mainLoop();
}

function mainLoop()
{
	stats.begin();

	// Calculate the passed time (dt)
	var now = Date.now();
	var dt = (now - lastTime) / 1000.0;

	// Make the context fullscreen
	context.canvas.width = document.body.clientWidth;
	context.canvas.height = document.body.clientHeight;

	update(dt);
	render();

	lastTime = now;

	stats.end();

	window.requestAnimationFrame(mainLoop);
}

function update(dt)
{
}

function render()
{
	/*for (var i = 0; i < map.length; i++)
		for (var j = 0; j < map[i].length; j++)
			terrain.map[j][i].draw(context, width * 32, 0);*/
	terrain.draw(context, 0, -height*Math.sqrt(height));
}