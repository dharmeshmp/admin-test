import { IGameCommission } from 'app/shared/model/game-commission.model';
import { IRole } from 'app/shared/model/role.model';

export interface IGameUser {
  id?: number;
  username?: string;
  password?: string;
  chips?: number;
  commissions?: IGameCommission[];
  role?: IRole;
}

export class GameUser implements IGameUser {
  constructor(
    public id?: number,
    public username?: string,
    public password?: string,
    public chips?: number,
    public commissions?: IGameCommission[],
    public role?: IRole
  ) {}
}
