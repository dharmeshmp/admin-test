import { IGameCommission } from 'app/shared/model/game-commission.model';

export interface IGameUser {
  id?: number;
  username?: string;
  password?: string;
  commissions?: IGameCommission[];
}

export class GameUser implements IGameUser {
  constructor(public id?: number, public username?: string, public password?: string, public commissions?: IGameCommission[]) {}
}
