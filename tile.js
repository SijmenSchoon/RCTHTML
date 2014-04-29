function Tile(context, height, x, y)
{
	this.context = context;
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
	this.preContext.fillText(this.height, 28, 20)
	for (var i = (this.height * 16) + 128; i > 0; i -= 16)
		this.preContext.drawImage(ResourceManager.images['img/wall64.png'], 0, i + 3);
}

Tile.prototype.draw = function(originX, originY)
{
	var screenX = originX - (this.y * this.tileWidth / 2) + (this.x * this.tileWidth / 2) - (this.tileWidth / 2);
	var screenY = originY + (this.y * this.tileHeight / 2) + (this.x * this.tileHeight / 2) - (this.height * 16);
	if (screenX < -this.tileWidth || screenX > context.canvas.width) return;
	if (screenY < -this.tileHeight || screenY > context.canvas.height) return;
	this.context.drawImage(this.preCanvas, screenX, screenY);
};