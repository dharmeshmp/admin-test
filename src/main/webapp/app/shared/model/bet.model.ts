import { IGameUser } from 'app/shared/model/game-user.model';
import { IHand } from 'app/shared/model/hand.model';

export interface IBet {
  id?: number;
  chips?: number;
  user?: IGameUser;
  hand?: IHand;
}

export class Bet implements IBet {
  constructor(public id?: number, public chips?: number, public user?: IGameUser, public hand?: IHand) {}
}
