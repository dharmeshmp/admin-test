import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHand, Hand } from 'app/shared/model/hand.model';
import { HandService } from './hand.service';
import { HandComponent } from './hand.component';
import { HandDetailComponent } from './hand-detail.component';
import { HandUpdateComponent } from './hand-update.component';

@Injectable({ providedIn: 'root' })
export class HandResolve implements Resolve<IHand> {
  constructor(private service: HandService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHand> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((hand: HttpResponse<Hand>) => {
          if (hand.body) {
            return of(hand.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Hand());
  }
}

export const handRoute: Routes = [
  {
    path: '',
    component: HandComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Hands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HandDetailComponent,
    resolve: {
      hand: HandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Hands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HandUpdateComponent,
    resolve: {
      hand: HandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Hands'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HandUpdateComponent,
    resolve: {
      hand: HandResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Hands'
    },
    canActivate: [UserRouteAccessService]
  }
];
