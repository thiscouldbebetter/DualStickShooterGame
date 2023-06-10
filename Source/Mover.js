
class Mover
{
	constructor(id, defnName, disp)
	{
		this.id = id;
		this.defnName = defnName;
		this.disp = disp;
	}

	activityDefn()
	{
		var defn = this.defn();
		var activityDefn = defn.activityDefn();
		return activityDefn;
	}

	bounds()
	{
		if (this._bounds == null)
		{
			this._bounds = Box.fromCenterAndSize
			(
				this.disp.pos, this.defn().size
			);
		}

		return this._bounds;
	}

	defn()
	{
		return MoverDefn.byName(this.defnName);
	}

	drawToDisplay(display)
	{
		var defn = this.defn();
		var visual = defn.visual();
		visual.drawToDisplayAtPos(display, this.disp.pos);
	}

	initialize()
	{
		this.integrity = this.defn().integrityMax;
	}

	updateForTimerTick(universe, world, place)
	{
		var activityDefn = this.activityDefn();
		activityDefn.perform(universe, world, place, this);
	}
}
