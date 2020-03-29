import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGameCommission, GameCommission } from 'app/shared/model/game-commission.model';
import { GameCommissionService } from './game-commission.service';
import { IGameUser } from 'app/shared/model/game-user.model';
import { GameUserService } from 'app/entities/game-user/game-user.service';
import { IGame } from 'app/shared/model/game.model';
import { GameService } from 'app/entities/game/game.service';

type SelectableEntity = IGameUser | IGame;

@Component({
  selector: 'jhi-game-commission-update',
  templateUrl: './game-commission-update.component.html'
})
export class GameCommissionUpdateComponent implements OnInit {
  isSaving = false;
  gameusers: IGameUser[] = [];
  games: IGame[] = [];

  editForm = this.fb.group({
    id: [],
    commission: [],
    gameUser: [],
    game: []
  });

  constructor(
    protected gameCommissionService: GameCommissionService,
    protected gameUserService: GameUserService,
    protected gameService: GameService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gameCommission }) => {
      this.updateForm(gameCommission);

      this.gameUserService.query().subscribe((res: HttpResponse<IGameUser[]>) => (this.gameusers = res.body || []));

      this.gameService.query().subscribe((res: HttpResponse<IGame[]>) => (this.games = res.body || []));
    });
  }

  updateForm(gameCommission: IGameCommission): void {
    this.editForm.patchValue({
      id: gameCommission.id,
      commission: gameCommission.commission,
      gameUser: gameCommission.gameUser,
      game: gameCommission.game
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gameCommission = this.createFromForm();
    if (gameCommission.id !== undefined) {
      this.subscribeToSaveResponse(this.gameCommissionService.update(gameCommission));
    } else {
      this.subscribeToSaveResponse(this.gameCommissionService.create(gameCommission));
    }
  }

  private createFromForm(): IGameCommission {
    return {
      ...new GameCommission(),
      id: this.editForm.get(['id'])!.value,
      commission: this.editForm.get(['commission'])!.value,
      gameUser: this.editForm.get(['gameUser'])!.value,
      game: this.editForm.get(['game'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGameCommission>>): void {
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
