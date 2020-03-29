import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IBet } from 'app/shared/model/bet.model';
import { BetService } from './bet.service';

@Component({
  templateUrl: './bet-delete-dialog.component.html'
})
export class BetDeleteDialogComponent {
  bet?: IBet;

  constructor(protected betService: BetService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.betService.delete(id).subscribe(() => {
      this.eventManager.broadcast('betListModification');
      this.activeModal.close();
    });
  }
}
