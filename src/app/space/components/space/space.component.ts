import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {SpaceObject} from '../../types/spaceObject'
import {Vector} from '../../types/vector'

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.scss']
})
export class SpaceComponent implements OnInit, OnDestroy {

  @ViewChild('space') space: ElementRef

  objects: SpaceObject[] = [
    new SpaceObject(400, 20, 'yellow', new Vector(600, 600)),
    new SpaceObject(9, 3, 'blue', new Vector(800, 600), new Vector(0, .1)),
    new SpaceObject(4, 2, 'orange', new Vector(1000, 600), new Vector(0, -.1))
  ]

  ctx: CanvasRenderingContext2D
  timer: any

  constructor() { }

  ngOnInit() {
    this.space.nativeElement.width = window.innerWidth
    this.space.nativeElement.height = window.innerHeight

    this.ctx = this.space.nativeElement.getContext('2d') as CanvasRenderingContext2D

    this.timer = setInterval(() => {
      this.physics()
      this.render()
    }, 10)
  }

  ngOnDestroy() {
    clearTimeout(this.timer)
  }

  physics() {
    this.objects.forEach(o => {
      this.objects.forEach(_o => {
        if (o === _o) {
          return
        }
        o.attractTo(_o)
      })

      o.position = o.position.plus(o.force)
    })
  }

  render() {
    this.ctx.clearRect(0, 0, this.space.nativeElement.width, this.space.nativeElement.height)
    this.ctx.fillStyle = '#000'
    this.ctx.fillRect(0, 0, this.space.nativeElement.width, this.space.nativeElement.width)

    this.objects.forEach(o => {
      o.render(this.ctx)
    })
  }

}
