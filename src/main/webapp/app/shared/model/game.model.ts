import { IGameCommission } from 'app/shared/model/game-commission.model';

export interface IGame {
  id?: number;
  name?: string;
  gameCommission?: IGameCommission;
}

export class Game implements IGame {
  constructor(public id?: number, public name?: string, public gameCommission?: IGameCommission) {}
}
