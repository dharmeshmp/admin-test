import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGameCommission } from 'app/shared/model/game-commission.model';
import { GameCommissionService } from './game-commission.service';
import { GameCommissionDeleteDialogComponent } from './game-commission-delete-dialog.component';

@Component({
  selector: 'jhi-game-commission',
  templateUrl: './game-commission.component.html'
})
export class GameCommissionComponent implements OnInit, OnDestroy {
  gameCommissions?: IGameCommission[];
  eventSubscriber?: Subscription;

  constructor(
    protected gameCommissionService: GameCommissionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.gameCommissionService.query().subscribe((res: HttpResponse<IGameCommission[]>) => (this.gameCommissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGameCommissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGameCommission): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGameCommissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('gameCommissionListModification', () => this.loadAll());
  }

  delete(gameCommission: IGameCommission): void {
    const modalRef = this.modalService.open(GameCommissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gameCommission = gameCommission;
  }
}
