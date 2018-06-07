import {Vector} from './vector'

export class SpaceObject {
  static readonly G = .01

  mass: number
  radius: number
  color: string

  position: Vector
  force: Vector

  positionHistory: Vector[] = []

  constructor(mass: number,
              radius: number,
              color: string,
              position: Vector,
              force = new Vector(0, 0)) {
    this.mass = mass
    this.radius = radius
    this.color = color

    this.position = position
    this.force = force
  }

  attractTo(other: SpaceObject) {
    const r = this.position.minus(other.position).magnitude()

    const m1 = this.mass
    const m2 = other.mass

    const F = (SpaceObject.G * m1 * m2) /  (r ** 2) / m1

    const dir = other.position.minus(this.position).normalize()
    this.force = this.force.plus(dir.scale(F))
  }

  render(ctx: CanvasRenderingContext2D) {
    this.positionHistory.push(this.position)
    if (this.positionHistory.length > 1000) {
      this.positionHistory = this.positionHistory.slice(1, 1001)
    }

    ctx.strokeStyle = 'white'
    ctx.beginPath()
    ctx.moveTo(this.positionHistory[0].x, this.positionHistory[0].y)
    this.positionHistory.forEach(p => {
      ctx.lineTo(p.x, p.y)
      ctx.moveTo(p.x, p.y)
    })
    ctx.stroke()
    ctx.closePath()

    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  }
}
