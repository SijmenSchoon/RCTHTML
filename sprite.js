function Sprite(context, width, height, image)
{
	this.context = context;
	this.width = width;
	this.height = height;
	this.image = image;
}

Sprite.prototype.draw = function(x, y, frame = 0)
{
	this.context.drawImage(this.image, x + (frame * width), y, width, height);
}