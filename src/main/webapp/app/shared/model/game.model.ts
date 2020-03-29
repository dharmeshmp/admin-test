export interface IGame {
  id?: number;
  name?: string;
}

export class Game implements IGame {
  constructor(public id?: number, public name?: string) {}
}
