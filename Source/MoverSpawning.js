
class MoverSpawning
{
	constructor
	(
		secondToSpawnAt,
		moverDefnName,
		disp
	)
	{
		this.secondToSpawnAt = secondToSpawnAt;
		this.moverDefnName = moverDefnName;
		this.disp = disp;
	}

	spawn(universe, world, place)
	{
		var mover = new Mover
		(
			place.moverIdMaxSoFar++, // id
			this.moverDefnName,
			this.disp.clone()
		);

		mover.initialize(universe, world, place);

		place.movers.push(mover);
	}
}
