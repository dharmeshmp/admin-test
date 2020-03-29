import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminSharedModule } from 'app/shared/shared.module';
import { GameCommissionComponent } from './game-commission.component';
import { GameCommissionDetailComponent } from './game-commission-detail.component';
import { GameCommissionUpdateComponent } from './game-commission-update.component';
import { GameCommissionDeleteDialogComponent } from './game-commission-delete-dialog.component';
import { gameCommissionRoute } from './game-commission.route';

@NgModule({
  imports: [AdminSharedModule, RouterModule.forChild(gameCommissionRoute)],
  declarations: [
    GameCommissionComponent,
    GameCommissionDetailComponent,
    GameCommissionUpdateComponent,
    GameCommissionDeleteDialogComponent
  ],
  entryComponents: [GameCommissionDeleteDialogComponent]
})
export class AdminGameCommissionModule {}
