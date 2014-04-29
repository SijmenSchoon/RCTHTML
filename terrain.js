function Terrain(map)
{
	this.map = map;
	this.height = map.length;
	this.width = map[0].length;

	this.preCanvas = document.createElement('canvas')
	this.preContext = this.preCanvas.getContext('2d');
}

Terrain.prototype.prerender = function()
{
	this.preCanvas.width = this.width * 64 + 32;
	this.preCanvas.height = this.height * 32 + 128 + 16;

	for (var i = 0; i < map.length; i++)
		for (var j = 0; j < map[i].length; j++)
			map[j][i].draw(this.preContext, width * 32, 0);
};

Terrain.prototype.draw = function(context, x, y)
{
	context.drawImage(this.preCanvas, x, y);
};