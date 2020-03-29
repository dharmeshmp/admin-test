import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGameUser } from 'app/shared/model/game-user.model';

@Component({
  selector: 'jhi-game-user-detail',
  templateUrl: './game-user-detail.component.html'
})
export class GameUserDetailComponent implements OnInit {
  gameUser: IGameUser | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gameUser }) => (this.gameUser = gameUser));
  }

  previousState(): void {
    window.history.back();
  }
}
