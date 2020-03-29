import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGameCommission } from 'app/shared/model/game-commission.model';

@Component({
  selector: 'jhi-game-commission-detail',
  templateUrl: './game-commission-detail.component.html'
})
export class GameCommissionDetailComponent implements OnInit {
  gameCommission: IGameCommission | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gameCommission }) => (this.gameCommission = gameCommission));
  }

  previousState(): void {
    window.history.back();
  }
}
