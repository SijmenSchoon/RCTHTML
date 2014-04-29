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

Tile.prototype.prerender = function()
{
	this.preCanvas.height = (this.height * 16) + 174;
	this.preContext.drawImage(ResourceManager.images['img/grass64.png'], 0, 0);
	//this.preContext.fillText(this.height, 28, 20)
	for (var i = this.height + 8; i > 0; i--)
		this.preContext.drawImage(ResourceManager.images['img/wall64.png'], 0, i * 16 + 3);
}

Tile.prototype.draw = function(context, originX, originY)
{
	var screenX = originX - (this.y * this.tileWidth / 2) + (this.x * this.tileWidth / 2) - (this.tileWidth / 2);
	var screenY = originY + (this.y * this.tileHeight / 2) + (this.x * this.tileHeight / 2) - (this.height * 16);
	context.drawImage(this.preCanvas, screenX, screenY);
};