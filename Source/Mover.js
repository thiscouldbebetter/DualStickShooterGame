
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
			var defn = this.defn();
			this._bounds = Sphere.fromCenterAndRadius
			(
				this.disp.pos, defn.collider.radius
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
		visual.draw(display, this);
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
