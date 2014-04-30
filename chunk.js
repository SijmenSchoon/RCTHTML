function Chunk(map, x, y)
{
	this.map = map;
	this.height = 16;
	this.width = 16;
	this.x = x;
	this.y = y;

	this.preCanvas = document.createElement('canvas');
	this.preContext = this.preCanvas.getContext('2d');

	this.dirty = true;

}

Chunk.prototype.prerender = function()
{
	console.log('Prerendering chunk (' + this.x + ',' + this.y + ')');

	this.preCanvas.width = this.width * 128 + 32;
	this.preCanvas.height = this.height * 128 + 256 + 16;

	var zerotile = new Tile(-8, 0, 0);
	for (var i = this.x * this.width; i < (this.x + 1) * this.width; i++)
		for (var j = this.y * this.height; j < (this.y + 1) * this.height; j++)
		{
			var south = (j+1 == terrain.map.length) ? zerotile : terrain.map[j+1][i];
			var east = (i+1 == terrain.map.length) ? zerotile : terrain.map[j][i+1];
			map[j][i].draw(this.preContext, 16 * 32, 128, south, east);
		}

	this.dirty = false;
};

Chunk.prototype.draw = function(context, x, y)
{
	//if (map[this.y * this.height + (this.height - 1)][this.x * this.width].y * 64 + y > context.canvas.height) return;

	tile = map[this.y * this.height + 15][this.x * this.width];
	if (tile.x * 32 + x > context.canvas.width) return;
	if (this.dirty) this.prerender();

	// var screenX = originX - (y * this.tileWidth / 2) + (x * this.tileWidth / 2) - (this.tileWidth / 2);
	var screenX = x - (this.y * 16 * 32) + (this.x * 16 * 32);// - (16 * 32);
	// var screenY = originY + (y * this.tileHeight / 2) + (x * this.tileHeight / 2) - (this.height * 16);
	var screenY = y + (this.y * 16 * 16) + (this.x * 16 * 16);
	context.drawImage(this.preCanvas, screenX, screenY + 128);
};