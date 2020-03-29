import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBet } from 'app/shared/model/bet.model';

@Component({
  selector: 'jhi-bet-detail',
  templateUrl: './bet-detail.component.html'
})
export class BetDetailComponent implements OnInit {
  bet: IBet | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bet }) => (this.bet = bet));
  }

  previousState(): void {
    window.history.back();
  }
}
