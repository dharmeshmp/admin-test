import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHand } from 'app/shared/model/hand.model';

@Component({
  selector: 'jhi-hand-detail',
  templateUrl: './hand-detail.component.html'
})
export class HandDetailComponent implements OnInit {
  hand: IHand | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hand }) => (this.hand = hand));
  }

  previousState(): void {
    window.history.back();
  }
}
