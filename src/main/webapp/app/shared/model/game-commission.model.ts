import { IGame } from 'app/shared/model/game.model';
import { IGameUser } from 'app/shared/model/game-user.model';

export interface IGameCommission {
  id?: number;
  commission?: number;
  games?: IGame[];
  gameUser?: IGameUser;
}

export class GameCommission implements IGameCommission {
  constructor(public id?: number, public commission?: number, public games?: IGame[], public gameUser?: IGameUser) {}
}
