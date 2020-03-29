import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminSharedModule } from 'app/shared/shared.module';
import { BetComponent } from './bet.component';
import { BetDetailComponent } from './bet-detail.component';
import { BetUpdateComponent } from './bet-update.component';
import { BetDeleteDialogComponent } from './bet-delete-dialog.component';
import { betRoute } from './bet.route';

@NgModule({
  imports: [AdminSharedModule, RouterModule.forChild(betRoute)],
  declarations: [BetComponent, BetDetailComponent, BetUpdateComponent, BetDeleteDialogComponent],
  entryComponents: [BetDeleteDialogComponent]
})
export class AdminBetModule {}
