import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBet, Bet } from 'app/shared/model/bet.model';
import { BetService } from './bet.service';
import { BetComponent } from './bet.component';
import { BetDetailComponent } from './bet-detail.component';
import { BetUpdateComponent } from './bet-update.component';

@Injectable({ providedIn: 'root' })
export class BetResolve implements Resolve<IBet> {
  constructor(private service: BetService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBet> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((bet: HttpResponse<Bet>) => {
          if (bet.body) {
            return of(bet.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Bet());
  }
}

export const betRoute: Routes = [
  {
    path: '',
    component: BetComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BetDetailComponent,
    resolve: {
      bet: BetResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BetUpdateComponent,
    resolve: {
      bet: BetResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bets'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BetUpdateComponent,
    resolve: {
      bet: BetResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Bets'
    },
    canActivate: [UserRouteAccessService]
  }
];
