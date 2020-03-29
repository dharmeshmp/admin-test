import { IGameUser } from 'app/shared/model/game-user.model';
import { IGame } from 'app/shared/model/game.model';

export interface IGameCommission {
  id?: number;
  commission?: number;
  gameUser?: IGameUser;
  game?: IGame;
}

export class GameCommission implements IGameCommission {
  constructor(public id?: number, public commission?: number, public gameUser?: IGameUser, public game?: IGame) {}
}
