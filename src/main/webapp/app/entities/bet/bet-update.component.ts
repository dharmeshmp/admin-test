import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBet, Bet } from 'app/shared/model/bet.model';
import { BetService } from './bet.service';
import { IHand } from 'app/shared/model/hand.model';
import { HandService } from 'app/entities/hand/hand.service';

@Component({
  selector: 'jhi-bet-update',
  templateUrl: './bet-update.component.html'
})
export class BetUpdateComponent implements OnInit {
  isSaving = false;
  hands: IHand[] = [];

  editForm = this.fb.group({
    id: [],
    chips: [],
    hand: []
  });

  constructor(
    protected betService: BetService,
    protected handService: HandService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bet }) => {
      this.updateForm(bet);

      this.handService.query().subscribe((res: HttpResponse<IHand[]>) => (this.hands = res.body || []));
    });
  }

  updateForm(bet: IBet): void {
    this.editForm.patchValue({
      id: bet.id,
      chips: bet.chips,
      hand: bet.hand
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const bet = this.createFromForm();
    if (bet.id !== undefined) {
      this.subscribeToSaveResponse(this.betService.update(bet));
    } else {
      this.subscribeToSaveResponse(this.betService.create(bet));
    }
  }

  private createFromForm(): IBet {
    return {
      ...new Bet(),
      id: this.editForm.get(['id'])!.value,
      chips: this.editForm.get(['chips'])!.value,
      hand: this.editForm.get(['hand'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBet>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IHand): any {
    return item.id;
  }
}
