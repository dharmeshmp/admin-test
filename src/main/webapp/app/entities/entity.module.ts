import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'game-user',
        loadChildren: () => import('./game-user/game-user.module').then(m => m.AdminGameUserModule)
      },
      {
        path: 'game-commission',
        loadChildren: () => import('./game-commission/game-commission.module').then(m => m.AdminGameCommissionModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.AdminGameModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AdminEntityModule {}
