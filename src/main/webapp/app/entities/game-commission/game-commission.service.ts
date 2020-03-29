import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGameCommission } from 'app/shared/model/game-commission.model';

type EntityResponseType = HttpResponse<IGameCommission>;
type EntityArrayResponseType = HttpResponse<IGameCommission[]>;

@Injectable({ providedIn: 'root' })
export class GameCommissionService {
  public resourceUrl = SERVER_API_URL + 'api/game-commissions';

  constructor(protected http: HttpClient) {}

  create(gameCommission: IGameCommission): Observable<EntityResponseType> {
    return this.http.post<IGameCommission>(this.resourceUrl, gameCommission, { observe: 'response' });
  }

  update(gameCommission: IGameCommission): Observable<EntityResponseType> {
    return this.http.put<IGameCommission>(this.resourceUrl, gameCommission, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGameCommission>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGameCommission[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
