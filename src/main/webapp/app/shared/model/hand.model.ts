import { IBet } from 'app/shared/model/bet.model';
import { IGame } from 'app/shared/model/game.model';
import { IGameUser } from 'app/shared/model/game-user.model';
import { HandStatus } from 'app/shared/model/enumerations/hand-status.model';

export interface IHand {
  id?: number;
  status?: HandStatus;
  winningChips?: number;
  bets?: IBet[];
  game?: IGame;
  winner?: IGameUser;
}

export class Hand implements IHand {
  constructor(
    public id?: number,
    public status?: HandStatus,
    public winningChips?: number,
    public bets?: IBet[],
    public game?: IGame,
    public winner?: IGameUser
  ) {}
}
