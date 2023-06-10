
class Visual
{
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
}

class Visual_Instances
{
	constructor()
	{
		var colors = Color.Instances();

		var radiusPlayer = 8;

		var enemyBoss = VisualBuilder.faceOfColorWithRadius
		(
			colors.Red, radiusPlayer * 3
		);

		this.EnemyBoss = new VisualNamed
		(
			"EnemyBoss", enemyBoss
		);

		var enemyCharger = VisualBuilder.faceOfColorWithRadius
		(
			colors.Red, radiusPlayer
		);

		this.EnemyCharger = new VisualNamed
		(
			"EnemyCharger", enemyCharger
		);

		var player = VisualBuilder.faceOfColorWithRadius(colors.Gray, 8);

		this.Player = new VisualNamed
		(
			"Player", player
		);

		this.Projectile = new VisualNamed
		(
			"Projectile",
			new VisualCircle
			(
				"Yellow",
				1 // radius
			)
		);

		this._All =
		[
			this.EnemyBoss,
			this.EnemyCharger,
			this.Player,
			this.Projectile
		];

		this._AllByName = new Map(this._All.map(x => [x.name, x] ) );
	}

	byName(name)
	{
		return this._AllByName.get(name);
	}
}
