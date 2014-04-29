var ResourceManager = new function()
{
	this.imagesLoading = 0;
	this.images = {};

	this.loadImages = function(urls)
	{
		console.log('Loading images ' + urls);
		urls.forEach(function(url)
		{
			ResourceManager.imagesLoading++;
			var img = new Image();
			console.log('Number of images loading: ' + ResourceManager.imagesLoading);
			img.onload = function()
			{
				ResourceManager.images[url] = img;
				ResourceManager.imagesLoading--;
				console.log('Number of images loading: ' + ResourceManager.imagesLoading);
				if (ResourceManager.imagesLoading == 0)
					ResourceManager.onReady();
			}
			img.src = url;
			ResourceManager.images[url] = null;
		});
	}
}