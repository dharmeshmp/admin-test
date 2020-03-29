import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGameUser } from 'app/shared/model/game-user.model';
import { GameUserService } from './game-user.service';
import { GameUserDeleteDialogComponent } from './game-user-delete-dialog.component';

@Component({
  selector: 'jhi-game-user',
  templateUrl: './game-user.component.html'
})
export class GameUserComponent implements OnInit, OnDestroy {
  gameUsers?: IGameUser[];
  eventSubscriber?: Subscription;

  constructor(protected gameUserService: GameUserService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.gameUserService.query().subscribe((res: HttpResponse<IGameUser[]>) => (this.gameUsers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGameUsers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGameUser): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGameUsers(): void {
    this.eventSubscriber = this.eventManager.subscribe('gameUserListModification', () => this.loadAll());
  }

  delete(gameUser: IGameUser): void {
    const modalRef = this.modalService.open(GameUserDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.gameUser = gameUser;
  }
}
