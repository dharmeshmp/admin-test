import { IGameUser } from 'app/shared/model/game-user.model';
import { IHand } from 'app/shared/model/hand.model';
import { BetStatus } from 'app/shared/model/enumerations/bet-status.model';

export interface IBet {
  id?: number;
  chips?: number;
  status?: BetStatus;
  user?: IGameUser;
  hand?: IHand;
}

export class Bet implements IBet {
  constructor(public id?: number, public chips?: number, public status?: BetStatus, public user?: IGameUser, public hand?: IHand) {}
}
