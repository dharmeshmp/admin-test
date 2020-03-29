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
        path: 'role',
        loadChildren: () => import('./role/role.module').then(m => m.AdminRoleModule)
      },
      {
        path: 'game-commission',
        loadChildren: () => import('./game-commission/game-commission.module').then(m => m.AdminGameCommissionModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.AdminGameModule)
      },
      {
        path: 'bet',
        loadChildren: () => import('./bet/bet.module').then(m => m.AdminBetModule)
      },
      {
        path: 'hand',
        loadChildren: () => import('./hand/hand.module').then(m => m.AdminHandModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class AdminEntityModule {}
