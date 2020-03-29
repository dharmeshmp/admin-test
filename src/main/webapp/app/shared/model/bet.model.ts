export interface IBet {
  id?: number;
  chips?: number;
}

export class Bet implements IBet {
  constructor(public id?: number, public chips?: number) {}
}
