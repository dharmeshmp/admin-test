import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGame, Game } from 'app/shared/model/game.model';
import { GameService } from './game.service';
import { IGameCommission } from 'app/shared/model/game-commission.model';
import { GameCommissionService } from 'app/entities/game-commission/game-commission.service';

@Component({
  selector: 'jhi-game-update',
  templateUrl: './game-update.component.html'
})
export class GameUpdateComponent implements OnInit {
  isSaving = false;
  gamecommissions: IGameCommission[] = [];

  editForm = this.fb.group({
    id: [],
    name: [],
    gameCommission: []
  });

  constructor(
    protected gameService: GameService,
    protected gameCommissionService: GameCommissionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ game }) => {
      this.updateForm(game);

      this.gameCommissionService.query().subscribe((res: HttpResponse<IGameCommission[]>) => (this.gamecommissions = res.body || []));
    });
  }

  updateForm(game: IGame): void {
    this.editForm.patchValue({
      id: game.id,
      name: game.name,
      gameCommission: game.gameCommission
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const game = this.createFromForm();
    if (game.id !== undefined) {
      this.subscribeToSaveResponse(this.gameService.update(game));
    } else {
      this.subscribeToSaveResponse(this.gameService.create(game));
    }
  }

  private createFromForm(): IGame {
    return {
      ...new Game(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      gameCommission: this.editForm.get(['gameCommission'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGame>>): void {
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

  trackById(index: number, item: IGameCommission): any {
    return item.id;
  }
}
