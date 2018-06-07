export class Vector {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  plus(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y)
  }

  minus(v: Vector) {
    return new Vector(this.x - v.x, this.y - v.y)
  }

  scale(n: number) {
    return new Vector(this.x * n, this.y * n)
  }

  magnitude() {
    return Math.sqrt(this.x ** 2 + this.y ** 2)
  }

  normalize() {
    const mag = this.magnitude()
    return new Vector(this.x / mag, this.y / mag)
  }
}
