function Tile(height, x, y)
{
	this.height = height;
	this.x = x;
	this.y = y;
	this.tileWidth = 64;
	this.tileHeight = 32;

	this.preCanvas = document.createElement('canvas')
	this.preContext = this.preCanvas.getContext('2d');
	this.preCanvas.width = 66;
}

Tile.prototype.draw = function(context, originX, originY, south, east)
{
	var x = this.x % 16;
	var y = this.y % 16;
	var screenX = originX - (y * this.tileWidth / 2) + (x * this.tileWidth / 2) - (this.tileWidth / 2);
	var screenY = originY + (y * this.tileHeight / 2) + (x * this.tileHeight / 2) - (this.height * 16);
	context.drawImage(ResourceManager.images['img/grass64.png'], screenX, screenY);
	context.fillText('(' + this.x + ',' + this.y + ')', screenX+20, screenY+19)

	for (var i = 0; i > south.height - this.height; i--)
		context.drawImage(ResourceManager.images['img/wall64s.png'], 0 + screenX, 19 - (i * 16) + screenY);
	for (var i = 0; i > east.height - this.height; i--)
		context.drawImage(ResourceManager.images['img/wall64e.png'], 33 + screenX, 19 - (i * 16) + screenY);
};
