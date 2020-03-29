import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGameCommission } from 'app/shared/model/game-commission.model';
import { GameCommissionService } from './game-commission.service';

@Component({
  templateUrl: './game-commission-delete-dialog.component.html'
})
export class GameCommissionDeleteDialogComponent {
  gameCommission?: IGameCommission;

  constructor(
    protected gameCommissionService: GameCommissionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.gameCommissionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('gameCommissionListModification');
      this.activeModal.close();
    });
  }
}
