
class VisualDynamic
{
	constructor(visualGetForMover)
	{
		this._visualGetForMover = visualGetForMover;
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	draw(display, mover)
	{
		var visual =
			this.visualGetForMover(display, mover);
		visual.draw(display, mover);
	}

	visualGetForMover(mover)
	{
		return this._visualGetForMover(mover);
	}
}
