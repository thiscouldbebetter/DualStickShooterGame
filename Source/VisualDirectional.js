
class VisualDirectional
{
	constructor(childrenForDirections)
	{
		this.childrenForDirections = childrenForDirections;
	}

	draw(display, mover)
	{
		var headingInTurns = mover.disp.headingInTurns;
		var childIndex = Math.floor(headingInTurns / .25);
		var childForDirection =
			this.childrenForDirections[childIndex];
		childForDirection.draw(display, mover);
	}
}
