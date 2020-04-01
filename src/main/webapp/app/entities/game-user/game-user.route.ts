import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGameUser, GameUser } from 'app/shared/model/game-user.model';
import { GameUserService } from './game-user.service';
import { GameUserComponent } from './game-user.component';
import { GameUserDetailComponent } from './game-user-detail.component';
import { GameUserUpdateComponent } from './game-user-update.component';

@Injectable({ providedIn: 'root' })
export class GameUserResolve implements Resolve<IGameUser> {
  constructor(private service: GameUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGameUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((gameUser: HttpResponse<GameUser>) => {
          if (gameUser.body) {
            return of(gameUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GameUser());
  }
}

export const gameUserRoute: Routes = [
  {
    path: '',
    component: GameUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GameUserDetailComponent,
    resolve: {
      gameUser: GameUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GameUserUpdateComponent,
    resolve: {
      gameUser: GameUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameUsers'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GameUserUpdateComponent,
    resolve: {
      gameUser: GameUserResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'GameUsers'
    },
    canActivate: [UserRouteAccessService]
  }
];
