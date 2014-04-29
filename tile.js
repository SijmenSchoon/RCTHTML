function Tile(context, height, x, y)
{
	this.context = context;
	this.height = height;
	this.x = x;
	this.y = y;
	this.tileWidth = 64;
	this.tileHeight = 32;
}

Tile.prototype.draw = function(originX, originY)
{
	var screenX = originX - (this.y * this.tileWidth / 2) + (this.x * this.tileWidth / 2) - (this.tileWidth / 2);
	var screenY = originY + (this.y * this.tileHeight / 2) + (this.x * this.tileHeight / 2) - (this.height * 16);
	this.context.drawImage(ResourceManager.images['img/grass64.png'], screenX, screenY);
	this.context.fillText(this.height, screenX + 28, screenY + 20)

	for (var i = screenY + (this.height * 16) + 128; i > screenY; i -= 16)
	{
		this.context.drawImage(ResourceManager.images['img/wall64e.png'], screenX + 33, i + 3);
		this.context.drawImage(ResourceManager.images['img/wall64s.png'], screenX, i + 3);
	}
};