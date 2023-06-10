
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

	drawRectangleAtPosWithSizeAndColor(pos, size, color)
	{
		this.graphics.fillStyle = color.systemColor;
		this.graphics.fillRect
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
