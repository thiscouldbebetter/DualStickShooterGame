
class VisualCircle
{
	constructor(colorName, radius)
	{
		this.colorName = colorName;
		this.radius = radius;
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(display, mover)
	{
		var pos = mover.disp.pos;
		display.drawCircleWithCenterRadiusAndColor
		(
			pos, this.radius, this.color()
		);
	}
}
