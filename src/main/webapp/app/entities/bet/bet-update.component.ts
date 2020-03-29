import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IBet, Bet } from 'app/shared/model/bet.model';
import { BetService } from './bet.service';

@Component({
  selector: 'jhi-bet-update',
  templateUrl: './bet-update.component.html'
})
export class BetUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    chips: []
  });

  constructor(protected betService: BetService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ bet }) => {
      this.updateForm(bet);
    });
  }

  updateForm(bet: IBet): void {
    this.editForm.patchValue({
      id: bet.id,
      chips: bet.chips
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
      chips: this.editForm.get(['chips'])!.value
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
}
