
class VisualOffset
{
	constructor(offset, child)
	{
		this.offset = offset;
		this.child = child;
	}

	draw(display, mover)
	{
		var pos = mover.disp.pos;
		pos.add(this.offset);
		this.child.draw(display, mover);
		pos.subtract(this.offset);
	}
}
