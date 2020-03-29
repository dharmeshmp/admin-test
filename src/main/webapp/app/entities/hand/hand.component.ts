import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHand } from 'app/shared/model/hand.model';
import { HandService } from './hand.service';
import { HandDeleteDialogComponent } from './hand-delete-dialog.component';

@Component({
  selector: 'jhi-hand',
  templateUrl: './hand.component.html'
})
export class HandComponent implements OnInit, OnDestroy {
  hands?: IHand[];
  eventSubscriber?: Subscription;

  constructor(protected handService: HandService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.handService.query().subscribe((res: HttpResponse<IHand[]>) => (this.hands = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHands();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHand): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHands(): void {
    this.eventSubscriber = this.eventManager.subscribe('handListModification', () => this.loadAll());
  }

  delete(hand: IHand): void {
    const modalRef = this.modalService.open(HandDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.hand = hand;
  }
}
