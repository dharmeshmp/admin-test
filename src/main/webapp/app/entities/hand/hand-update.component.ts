import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IHand, Hand } from 'app/shared/model/hand.model';
import { HandService } from './hand.service';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game/game.service';

@Component({
  selector: 'jhi-hand-update',
  templateUrl: './hand-update.component.html'
})
export class HandUpdateComponent implements OnInit {
  isSaving = false;
  games: IGame[] = [];

  editForm = this.fb.group({
    id: [],
    status: [],
    game: []
  });

  constructor(
    protected handService: HandService,
    protected gameService: GameService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hand }) => {
      this.updateForm(hand);

      this.gameService.query().subscribe((res: HttpResponse<IGame[]>) => (this.games = res.body || []));
    });
  }

  updateForm(hand: IHand): void {
    this.editForm.patchValue({
      id: hand.id,
      status: hand.status,
      game: hand.game
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const hand = this.createFromForm();
    if (hand.id !== undefined) {
      this.subscribeToSaveResponse(this.handService.update(hand));
    } else {
      this.subscribeToSaveResponse(this.handService.create(hand));
    }
  }

  private createFromForm(): IHand {
    return {
      ...new Hand(),
      id: this.editForm.get(['id'])!.value,
      status: this.editForm.get(['status'])!.value,
      game: this.editForm.get(['game'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHand>>): void {
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

  trackById(index: number, item: IGame): any {
    return item.id;
  }
}
