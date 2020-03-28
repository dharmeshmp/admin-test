import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGameUser } from 'app/shared/model/game-user.model';

type EntityResponseType = HttpResponse<IGameUser>;
type EntityArrayResponseType = HttpResponse<IGameUser[]>;

@Injectable({ providedIn: 'root' })
export class GameUserService {
  public resourceUrl = SERVER_API_URL + 'api/game-users';

  constructor(protected http: HttpClient) {}

  create(gameUser: IGameUser): Observable<EntityResponseType> {
    return this.http.post<IGameUser>(this.resourceUrl, gameUser, { observe: 'response' });
  }

  update(gameUser: IGameUser): Observable<EntityResponseType> {
    return this.http.put<IGameUser>(this.resourceUrl, gameUser, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGameUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGameUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
