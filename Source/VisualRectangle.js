
class VisualRectangle
{
	constructor(colorName, size)
	{
		this.colorName = colorName;
		this.size = size;
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(display, mover)
	{
		var pos = mover.disp.pos;
		display.drawRectangleWithCenterSizeAndColor
		(
			pos, this.size, this.color()
		);
	}
}
