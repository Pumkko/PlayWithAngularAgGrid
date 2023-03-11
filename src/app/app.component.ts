import { Component } from '@angular/core';
import { ChangeService } from './services/change.service';
import { NetworkService } from './services/network.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tryStuff';

  changeWaitingToBeSync = 0;

  get isOnline$() {
    return this.networkService.healthCheck$;
  }

  constructor(
    private changeService: ChangeService,
    private networkService: NetworkService
  ) {
    this.changeService.changeToSync$.subscribe(
      (v) => (this.changeWaitingToBeSync = v.length)
    );
  }

  async onSynchronize() {
    await this.changeService.synchronizeChange();
  }
}
