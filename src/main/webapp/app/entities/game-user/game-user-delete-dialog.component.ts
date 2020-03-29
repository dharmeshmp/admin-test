import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGameUser } from 'app/shared/model/game-user.model';
import { GameUserService } from './game-user.service';

@Component({
  templateUrl: './game-user-delete-dialog.component.html'
})
export class GameUserDeleteDialogComponent {
  gameUser?: IGameUser;

  constructor(protected gameUserService: GameUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gameUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gameUserListModification');
      this.activeModal.close();
    });
  }
}
