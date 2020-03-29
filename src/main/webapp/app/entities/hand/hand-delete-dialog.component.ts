import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHand } from 'app/shared/model/hand.model';
import { HandService } from './hand.service';

@Component({
  templateUrl: './hand-delete-dialog.component.html'
})
export class HandDeleteDialogComponent {
  hand?: IHand;

  constructor(protected handService: HandService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.handService.delete(id).subscribe(() => {
      this.eventManager.broadcast('handListModification');
      this.activeModal.close();
    });
  }
}
