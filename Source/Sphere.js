
class Sphere
{
	constructor(center, radius)
	{
		this.center = center;
		this.radius = radius;

		this._displacement = new Coords();
	}

	static fromCenterAndRadius(center, radius)
	{
		return new Sphere(center, radius);
	}

	containsPoint(pointToCheck)
	{
		var distanceOfPointFromCenter =
			this._displacement.overwriteWith
			(
				pointToCheck
			).subtract
			(
				this.center
			).magnitude();

		var doesContainPoint =
			(distanceOfPointFromCenter < this.radius);

		return doesContainPoint;
	}

	overlapsWith(other)
	{
		var distanceBetweenCenters =
			this._displacement.overwriteWith
			(
				other.center
			).subtract
			(
				this.center
			).magnitude();
		var sumOfRadii = this.radius + other.radius;

		var doOverlap =
			(distanceBetweenCenters < sumOfRadii);

		return doOverlap;
	}

	// Clonable.

	clone()
	{
		return new Sphere(this.center.clone(), this.radius);
	}

	overwriteWith(other)
	{
		this.center.overwriteWith(other.center);
		this.radius = other.radius;
		return this;
	}
}