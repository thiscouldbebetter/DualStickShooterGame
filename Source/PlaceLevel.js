
class PlaceLevel
{
	constructor(name, size, moverSpawnings)
	{
		this.name = name;
		this.size = size;
		this.moverSpawnings = moverSpawnings;

		this.ticksSoFar = 0;
		this.moverIdMaxSoFar = 0;

		var moverForPlayer = new Mover
		(
			0, // id
			"Player",
			new Disposition
			(
				.75, // heading
				new Coords(.5, .8).multiply(this.size)
			)
		);
		this.movers = [ moverForPlayer ];
	}

	static demo()
	{
		var placeSize = new Coords(400, 300);

		var place = PlaceLevel.fromNameSizeAndSpawningCount
		(
			"Place0",
			placeSize,
			5 // spawnCount
		);

		var spawnings = place.moverSpawnings;
		var spawningFinal = spawnings[spawnings.length - 1];
		var spawningDisp =
			new Disposition(.25, new Coords(.5, 0).multiply(place.size) );

		var spawningBoss = new MoverSpawning
		(
			spawningFinal.secondToSpawnAt + 3,
			MoverDefn.Instances().EnemyBoss.name,
			spawningDisp
		);

		spawnings.push(spawningBoss);

		return place
	}

	static fromNameSizeAndSpawningCount(name, size, spawningCount)
	{
		var spawnings = [];

		var moverDefn = MoverDefn.Instances().EnemyCharger;

		var spawnDispRandom = () => new Disposition
		(
			.25,
			new Coords
			(
				Math.random(), 0
			).multiply(size)
		);

		var spawnings = [];

		for (var i = 0; i < spawningCount; i++)
		{
			var spawning = new MoverSpawning
			(
				i + 1,
				moverDefn.name,
				spawnDispRandom()
			);

			spawnings.push(spawning);
		}

		return new PlaceLevel
		(
			name, size, spawnings
		);

	}

	drawToDisplay(display)
	{
		display.clear();
		this.movers.forEach(x => x.drawToDisplay(display) );
	}

	initialize(universe, world)
	{
		this.movers.forEach(x => x.initialize(universe, world, this) );
	}

	moverRemove(mover)
	{
		this.movers.splice(this.movers.indexOf(mover), 1);
	}

	secondsSoFar(universe)
	{
		return universe.timerHelper.secondsForTicks(this.ticksSoFar);
	}

	updateForTimerTick(universe, world)
	{
		var secondsSoFar = this.secondsSoFar(universe);

		var spawningsThisTick = this.moverSpawnings.filter
		(
			x => x.secondToSpawnAt < secondsSoFar
		);

		spawningsThisTick.forEach
		(
			x =>
			{
				x.spawn(universe, world, this);
				this.moverSpawnings.splice
				(
					this.moverSpawnings.indexOf(x), 1
				);
			}
		);

		this.movers.forEach
		(
			x => x.updateForTimerTick(universe, world, this, x)
		);

		var moversProjectile = this.movers.filter(x => x.defnName == "Projectile");
		var moversNonProjectile = this.movers.filter(x => x.defnName != "Projectile");

		moversProjectile.forEach
		(
			moverProjectile =>
			{
				moversNonProjectile.forEach
				(
					moverNonProjectile =>
					{
						var moverNonProjectileBounds = moverNonProjectile.bounds();
						var doMoversCollide = moverNonProjectileBounds.containsPoint
						(
							moverProjectile.disp.pos
						);
						if (doMoversCollide)
						{
							this.moverRemove(moverProjectile);

							moverNonProjectile.integrity -= 1;
							if (moverNonProjectile.integrity <= 0)
							{
								this.moverRemove(moverNonProjectile);
							}
						}
					}
				)
			}
		);

		var moverPlayer = this.movers.find(x => x.defnName == "Player");
		if (moverPlayer != null)
		{
			var moverPlayerBounds = moverPlayer.bounds();
			var moversEnemy = this.movers.filter(x => x.defnName.startsWith("Enemy") );

			moversEnemy.forEach
			(
				moverEnemy =>
				{
					var moverEnemyBounds = moverEnemy.bounds();
					var doMoversCollide = moverEnemyBounds.overlapWith
					(
						moverPlayerBounds
					);
					if (doMoversCollide)
					{
						// todo - Integrity.
						this.moverRemove(moverPlayer);
						this.moverRemove(moverEnemy);
					}

				}
			);
		}

		this.ticksSoFar++;

		this.drawToDisplay(universe.display);
	}
}
