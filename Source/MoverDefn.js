
class MoverDefn
{
	constructor
	(
		name,
		integrityMax,
		speed,
		collider,
		visualName,
		activityDefnName
	)
	{
		this.name = name;
		this.speed = speed;
		this.collider = collider;
		this.integrityMax = integrityMax;
		this.visualName = visualName;
		this.activityDefnName = activityDefnName;
	}

	static byName(name)
	{
		return MoverDefn.Instances().byName(name);
	}

	static Instances()
	{
		if (MoverDefn._instances == null)
		{
			MoverDefn._instances = new MoverDefn_Instances();
		}
		return MoverDefn._instances;
	}

	activityDefn()
	{
		return ActivityDefn.byName(this.activityDefnName);
	}

	visual()
	{
		return Visual.byName(this.visualName);
	}
}

class MoverDefn_Instances
{
	constructor()
	{
		var activityDefns = ActivityDefn.Instances();
		var visuals = Visual.Instances();

		var colliderBoss = new Sphere
		(
			new Coords(), 16
		);

		var colliderProjectile = new Sphere
		(
			new Coords(), 1
		);

		var colliderShip = new Sphere
		(
			new Coords(), 8
		);

		this.EnemyBoss = new MoverDefn
		(
			"EnemyBoss",
			20, // integrityMax
			1, // speed
			colliderBoss,
			visuals.EnemyBoss.name, // visualName
			activityDefns.StayAtTopCenterShooting.name
		);

		this.EnemyCharger = new MoverDefn
		(
			"EnemyCharger",
			1, // integrityMax
			4, // speed
			colliderShip,
			visuals.EnemyCharger.name,
			activityDefns.MoveForward.name
		);

		this.Player = new MoverDefn
		(
			"Player",
			1, // integrityMax
			4, // speed
			colliderShip,
			visuals.Player.name,
			activityDefns.UserInputAccept.name
		);

		this.Projectile = new MoverDefn
		(
			"Projectile",
			1, // integrityMax
			8, // speed,
			colliderProjectile,
			visuals.Projectile.name,
			activityDefns.MoveForward.name
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
