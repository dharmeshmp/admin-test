import { IGame } from 'app/shared/model/game.model';

export interface IHand {
  id?: number;
  game?: IGame;
}

export class Hand implements IHand {
  constructor(public id?: number, public game?: IGame) {}
}
