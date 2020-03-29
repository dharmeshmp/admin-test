import { IBet } from 'app/shared/model/bet.model';
import { IGame } from 'app/shared/model/game.model';
import { HandStatus } from 'app/shared/model/enumerations/hand-status.model';

export interface IHand {
  id?: number;
  status?: HandStatus;
  bets?: IBet[];
  game?: IGame;
}

export class Hand implements IHand {
  constructor(public id?: number, public status?: HandStatus, public bets?: IBet[], public game?: IGame) {}
}
