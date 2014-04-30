function Terrain(map, chunks)
{
	this.map = map;
	this.chunks = chunks;
	this.height = map.length;
	this.width = map[0].length;

	this.preCanvas = document.createElement('canvas');
	this.preContext = this.preCanvas.getContext('2d');
}

/*Terrain.prototype.prerender = function()
{
	this.preCanvas.width = this.width * 64 + 32;
	this.preCanvas.height = this.height * 32 + 128 + 16;

	var zerotile = new Tile(-8, 0, 0);
	for (var i = 0; i < map.length; i++)
		for (var j = 0; j < map[i].length; j++)
		{
			var south = (j+1 == terrain.map.length) ? zerotile : terrain.map[j+1][i];
			var east = (i+1 == terrain.map.length) ? zerotile : terrain.map[j][i+1];
			map[j][i].draw(this.preContext, width * 32, 0, south, east);
		}
};*/

Terrain.prototype.draw = function(context, x, y)
{
	for (var i = 0; i < this.width / 16; i++)
	{
		for (var j = 0; j < this.height / 16; j++)
		{
			//if (x1 < -512 || x1 > context.canvas.width) continue;
			//if (y1 < -256 || y1 > context.canvas.height) continue;
			this.chunks[j][i].draw(context, x, y);
		}
	}
};
