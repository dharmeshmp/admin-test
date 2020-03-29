import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBet } from 'app/shared/model/bet.model';

type EntityResponseType = HttpResponse<IBet>;
type EntityArrayResponseType = HttpResponse<IBet[]>;

@Injectable({ providedIn: 'root' })
export class BetService {
  public resourceUrl = SERVER_API_URL + 'api/bets';

  constructor(protected http: HttpClient) {}

  create(bet: IBet): Observable<EntityResponseType> {
    return this.http.post<IBet>(this.resourceUrl, bet, { observe: 'response' });
  }

  update(bet: IBet): Observable<EntityResponseType> {
    return this.http.put<IBet>(this.resourceUrl, bet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
