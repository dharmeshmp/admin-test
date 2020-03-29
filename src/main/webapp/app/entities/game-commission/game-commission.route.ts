import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGameCommission, GameCommission } from 'app/shared/model/game-commission.model';
import { GameCommissionService } from './game-commission.service';
import { GameCommissionComponent } from './game-commission.component';
import { GameCommissionDetailComponent } from './game-commission-detail.component';
import { GameCommissionUpdateComponent } from './game-commission-update.component';

@Injectable({ providedIn: 'root' })
export class GameCommissionResolve implements Resolve<IGameCommission> {
  constructor(private service: GameCommissionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGameCommission> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gameCommission: HttpResponse<GameCommission>) => {
          if (gameCommission.body) {
            return of(gameCommission.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GameCommission());
  }
}

export const gameCommissionRoute: Routes = [
  {
    path: '',
    component: GameCommissionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameCommissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GameCommissionDetailComponent,
    resolve: {
      gameCommission: GameCommissionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameCommissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GameCommissionUpdateComponent,
    resolve: {
      gameCommission: GameCommissionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameCommissions'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GameCommissionUpdateComponent,
    resolve: {
      gameCommission: GameCommissionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameCommissions'
    },
    canActivate: [UserRouteAccessService]
  }
];
