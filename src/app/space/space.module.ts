import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceComponent } from './components/space/space.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpaceComponent
  ],
  exports: [
    SpaceComponent
  ]
})
export class SpaceModule { }
