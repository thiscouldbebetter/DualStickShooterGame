
class Display
{
	constructor(sizeInPixels)
	{
		this.sizeInPixels = sizeInPixels;

		this._drawPos = Coords.zeroes();
		this._zeroes = Coords.zeroes();
	}

	initialize()
	{
		var d = document;
		var canvas = d.createElement("canvas");
		canvas.width = this.sizeInPixels.x;
		canvas.height = this.sizeInPixels.y;

		this.graphics = canvas.getContext("2d");

		var divDisplay = d.getElementById("divDisplay");
		divDisplay.appendChild(canvas);
	}

	// Draw.

	clear()
	{
		this.drawRectangleAtPosWithSizeAndColor
		(
			this._zeroes, this.sizeInPixels, Color.Instances().Black
		);
	}

	drawCircleWithCenterRadiusAndColor(center, radius, color)
	{
		var g = this.graphics;
		g.fillStyle = color.systemColor;
		g.beginPath();
		g.arc
		(
			center.x, center.y, radius, 0, Math.PI * 2
		);
		g.fill();
	}

	drawRectangleAtPosWithSizeAndColor(pos, size, color)
	{
		var g = this.graphics;
		g.fillStyle = color.systemColor;
		g.fillRect
		(
			pos.x, pos.y, size.x, size.y
		);
	}

	drawRectangleWithCenterSizeAndColor(center, size, color)
	{
		var drawPos =
			this._drawPos.overwriteWith(size).half().invert().add(center);

		this.drawRectangleAtPosWithSizeAndColor(drawPos, size, color);
	}
}
