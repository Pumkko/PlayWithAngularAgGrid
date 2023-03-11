import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid-header',
  templateUrl: './grid-header.component.html',
})
export class GridHeaderComponent {
  @Input()
  gridName!: string;
}
