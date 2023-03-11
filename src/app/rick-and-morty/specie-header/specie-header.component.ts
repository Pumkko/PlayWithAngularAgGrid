import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';
import { TotalAlienService } from '../total-alien.service';

@Component({
  selector: 'app-specie-header',
  templateUrl: './specie-header.component.html',
})
export class SpecieHeaderComponent implements IHeaderAngularComp {
  params!: IHeaderParams;

  totalAlien = this.totalAlienService.totalAlien$;
  constructor(private totalAlienService: TotalAlienService) {}

  agInit(params: IHeaderParams<any>): void {
    this.params = params;
  }

  refresh(params: IHeaderParams<any>): boolean {
    return false;
  }
}
