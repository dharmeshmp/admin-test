import { IHand } from 'app/shared/model/hand.model';

export interface IBet {
  id?: number;
  chips?: number;
  hand?: IHand;
}

export class Bet implements IBet {
  constructor(public id?: number, public chips?: number, public hand?: IHand) {}
}
