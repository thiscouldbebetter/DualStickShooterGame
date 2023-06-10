
class VisualMultiple
{
	constructor(children)
	{
		this.children = children;
	}

	draw(display, mover)
	{
		this.children.forEach
		(
			x => x.draw(display, mover)
		);
	}
}
