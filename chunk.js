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

	var screenX = x - (this.y * 16 * 32) + (this.x * 16 * 32);// - (16 * 32);
	var screenY = y + (this.y * 16 * 16) + (this.x * 16 * 16);

	if (screenX < -1024 || screenX > context.canvas.width) return;
	if (screenY < -1024 || screenY > context.canvas.height) return;

	if (this.dirty) this.prerender();

	context.drawImage(this.preCanvas, screenX, screenY + 128);
};