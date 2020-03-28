import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminSharedModule } from 'app/shared/shared.module';
import { GameUserComponent } from './game-user.component';
import { GameUserDetailComponent } from './game-user-detail.component';
import { GameUserUpdateComponent } from './game-user-update.component';
import { GameUserDeleteDialogComponent } from './game-user-delete-dialog.component';
import { gameUserRoute } from './game-user.route';

@NgModule({
  imports: [AdminSharedModule, RouterModule.forChild(gameUserRoute)],
  declarations: [GameUserComponent, GameUserDetailComponent, GameUserUpdateComponent, GameUserDeleteDialogComponent],
  entryComponents: [GameUserDeleteDialogComponent]
})
export class AdminGameUserModule {}
