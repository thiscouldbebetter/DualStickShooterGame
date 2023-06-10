
class Visual
{
	constructor(name, colorName, size)
	{
		this.name = name;
		this.colorName = colorName;
		this.size = size;
	}

	static byName(name)
	{
		return Visual.Instances().byName(name);
	}

	static Instances()
	{
		if (Visual._instances == null)
		{
			Visual._instances = new Visual_Instances();
		}
		return Visual._instances;
	}

	color()
	{
		return Color.byName(this.colorName);
	}

	drawToDisplayAtPos(display, pos)
	{
		display.drawRectangleWithCenterSizeAndColor
		(
			pos, this.size, this.color()
		);
	}
}

class Visual_Instances
{
	constructor()
	{
		this.EnemyBoss = new Visual
		(
			"EnemyBoss",
			"Red",
			new Coords(48, 48) // size
		);

		this.EnemyCharger = new Visual
		(
			"EnemyCharger",
			"Red",
			new Coords(16, 16) // size
		);

		this.Player = new Visual
		(
			"Player",
			"Gray",
			new Coords(16, 16) // size
		);

		this.Projectile = new Visual
		(
			"Projectile",
			"Yellow",
			new Coords(2, 2) // size
		);

		this._All =
		[
			this.EnemyBoss,
			this.EnemyCharger,
			this.Player,
			this.Projectile
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
