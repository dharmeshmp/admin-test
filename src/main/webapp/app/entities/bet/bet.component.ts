import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBet } from 'app/shared/model/bet.model';
import { BetService } from './bet.service';
import { BetDeleteDialogComponent } from './bet-delete-dialog.component';

@Component({
  selector: 'jhi-bet',
  templateUrl: './bet.component.html'
})
export class BetComponent implements OnInit, OnDestroy {
  bets?: IBet[];
  eventSubscriber?: Subscription;

  constructor(protected betService: BetService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.betService.query().subscribe((res: HttpResponse<IBet[]>) => (this.bets = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInBets();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBet): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBets(): void {
    this.eventSubscriber = this.eventManager.subscribe('betListModification', () => this.loadAll());
  }

  delete(bet: IBet): void {
    const modalRef = this.modalService.open(BetDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.bet = bet;
  }
}
