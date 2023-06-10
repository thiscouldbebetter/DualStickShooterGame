
class VisualNamed
{
	constructor(name, child)
	{
		this.name = name;
		this.child = child;
	}

	draw(display, mover)
	{
		this.child.draw(display, mover);
	}
}
