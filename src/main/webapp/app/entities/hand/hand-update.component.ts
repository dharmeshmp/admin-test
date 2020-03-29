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
import { IGameUser } from 'app/shared/model/game-user.model';
import { GameUserService } from 'app/entities/game-user/game-user.service';

type SelectableEntity = IGame | IGameUser;

@Component({
  selector: 'jhi-hand-update',
  templateUrl: './hand-update.component.html'
})
export class HandUpdateComponent implements OnInit {
  isSaving = false;
  games: IGame[] = [];
  gameusers: IGameUser[] = [];

  editForm = this.fb.group({
    id: [],
    status: [],
    winningChips: [],
    game: [],
    winner: []
  });

  constructor(
    protected handService: HandService,
    protected gameService: GameService,
    protected gameUserService: GameUserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ hand }) => {
      this.updateForm(hand);

      this.gameService.query().subscribe((res: HttpResponse<IGame[]>) => (this.games = res.body || []));

      this.gameUserService.query().subscribe((res: HttpResponse<IGameUser[]>) => (this.gameusers = res.body || []));
    });
  }

  updateForm(hand: IHand): void {
    this.editForm.patchValue({
      id: hand.id,
      status: hand.status,
      winningChips: hand.winningChips,
      game: hand.game,
      winner: hand.winner
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
      winningChips: this.editForm.get(['winningChips'])!.value,
      game: this.editForm.get(['game'])!.value,
      winner: this.editForm.get(['winner'])!.value
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
