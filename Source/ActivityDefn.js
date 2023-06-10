
class ActivityDefn
{
	constructor(name, perform)
	{
		this.name = name;
		this._perform = perform;
	}

	static byName(name)
	{
		return ActivityDefn.Instances().byName(name);
	}

	static Instances()
	{
		if (ActivityDefn._instances == null)
		{
			ActivityDefn._instances = new ActivityDefn_Instances();
		}
		return ActivityDefn._instances;
	}

	perform(universe, world, place, entityActing)
	{
		this._perform(universe, world, place, entityActing);
	}
}

class ActivityDefn_Instances
{
	constructor()
	{
		this.DoNothing = new ActivityDefn
		(
			"DoNothing",
			(u, w, p, e) => {}
		);

		this.MoveForward = new ActivityDefn
		(
			"MoveForward",
			(u, w, p, e) =>
			{
				var defn = e.defn();
				var vel = e.disp.headingAsCoords();
				vel.multiplyScalar(defn.speed);
				e.disp.pos.add(vel);
			}
		);

		this.StayAtTopCenterShooting = new ActivityDefn
		(
			"StayAtTopCenterShooting",
			(u, w, p, e) =>
			{
				var posMover = e.disp.pos;
				var posTarget = new Coords(.5, .2).multiply(p.size);
				var displacementToTarget = posTarget.clone().subtract(posMover);
				var distanceToTarget = displacementToTarget.magnitude();
				var speed = e.defn().speed;
				if (distanceToTarget < speed)
				{
					posMover.overwriteWith(posTarget);
					var ticksPerShot = 10;
					var tick = p.ticksSoFar;
					var canFire = (tick % ticksPerShot) == 0;
					if (canFire)
					{
						var projectileDisp = e.disp.clone();
						var headingInTurns = e.disp.headingInTurns;
						var headingOffset = (Math.random() * 2 - 1) / 8;
						projectileDisp.headingInTurns += headingOffset;
						projectileDisp.pos.add
						(
							e.disp.headingAsCoords().multiplyScalar
							(
								e.defn().size.y
							)
						);
						var moverProjectile = new Mover
						(
							p.moverIdMaxSoFar++,
							MoverDefn.Instances().Projectile.name,
							projectileDisp
						);
						p.movers.push(moverProjectile);
					}
				}
				else
				{
					var vel = displacementToTarget.normalize().multiplyScalar(speed);
					posMover.add(vel);
				}
			}
		);

		this.UserInputAccept = new ActivityDefn
		(
			"UserInputAccept",
			(u, w, p, e) =>
			{
				var inputTracker = u.inputTracker;
				var keysPressed = inputTracker.keysPressed;

				var keysForFiring = [ "a", "d", "s", "w" ];

				keysPressed.forEach
				(
					key =>
					{
						if (key.startsWith("Arrow") )
						{
							var pos = e.disp.pos;
							var speed = e.defn().speed;

							if (key.endsWith("Down") )
							{
								pos.addXY(0, speed);
							}
							else if (key.endsWith("Left") )
							{
								pos.addXY(-speed, 0);
							}
							else if (key.endsWith("Right") )
							{
								pos.addXY(speed, 0);
							}
							else if (key.endsWith("Up") )
							{
								pos.addXY(0, 0 - speed);
							}
						}
						else if (keysForFiring.indexOf(key) >= 0)
						{
							inputTracker.keyRelease(key);
							var headingToFireIn = null;

							if (key == "a")
							{
								headingToFireIn = .5;
							}
							else if (key == "d")
							{
								headingToFireIn = 0;
							}
							else if (key == "s")
							{
								headingToFireIn = .25;
							}
							else if (key == "w")
							{
								headingToFireIn = .75;
							}

							var projectileDisp = e.disp.clone();

							projectileDisp.headingInTurns = headingToFireIn;

							var projectileSpawnDistance = 10;

							var directionToFireIn  =
								Coords.fromHeadingInTurns(headingToFireIn);

							var projectileOffset =
								directionToFireIn.multiplyScalar
								(
									projectileSpawnDistance
								);

							projectileDisp.pos.add
							(
								projectileOffset
							);

							var moverProjectile = new Mover
							(
								p.moverIdMaxSoFar++,
								MoverDefn.Instances().Projectile.name,
								projectileDisp
							);

							p.movers.push(moverProjectile);
						}
					}
				);
			}
		);

		this._All =
		[
			this.DoNothing,
			this.MoveForward,
			this.StayAtTopCenterShooting,
			this.UserInputAccept
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x]) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
