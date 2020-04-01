import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGameUser, GameUser } from 'app/shared/model/game-user.model';
import { GameUserService } from './game-user.service';
import { IRole } from 'app/shared/model/role.model';
import { RoleService } from 'app/entities/role/role.service';

type SelectableEntity = IRole | IGameUser;

@Component({
  selector: 'jhi-game-user-update',
  templateUrl: './game-user-update.component.html'
})
export class GameUserUpdateComponent implements OnInit {
  isSaving = false;
  roles: IRole[] = [];
  gameusers: IGameUser[] = [];

  editForm = this.fb.group({
    id: [],
    username: [],
    password: [],
    chips: [],
    role: [],
    parent: []
  });

  constructor(
    protected gameUserService: GameUserService,
    protected roleService: RoleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ gameUser }) => {
      this.updateForm(gameUser);

      this.roleService.query().subscribe((res: HttpResponse<IRole[]>) => (this.roles = res.body || []));

      this.gameUserService.query().subscribe((res: HttpResponse<IGameUser[]>) => (this.gameusers = res.body || []));
    });
  }

  updateForm(gameUser: IGameUser): void {
    this.editForm.patchValue({
      id: gameUser.id,
      username: gameUser.username,
      password: gameUser.password,
      chips: gameUser.chips,
      role: gameUser.role,
      parent: gameUser.parent
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const gameUser = this.createFromForm();
    if (gameUser.id !== undefined) {
      this.subscribeToSaveResponse(this.gameUserService.update(gameUser));
    } else {
      this.subscribeToSaveResponse(this.gameUserService.create(gameUser));
    }
  }

  private createFromForm(): IGameUser {
    return {
      ...new GameUser(),
      id: this.editForm.get(['id'])!.value,
      username: this.editForm.get(['username'])!.value,
      password: this.editForm.get(['password'])!.value,
      chips: this.editForm.get(['chips'])!.value,
      role: this.editForm.get(['role'])!.value,
      parent: this.editForm.get(['parent'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGameUser>>): void {
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
