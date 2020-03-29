import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdminTestModule } from '../../../test.module';
import { GameCommissionDetailComponent } from 'app/entities/game-commission/game-commission-detail.component';
import { GameCommission } from 'app/shared/model/game-commission.model';

describe('Component Tests', () => {
  describe('GameCommission Management Detail Component', () => {
    let comp: GameCommissionDetailComponent;
    let fixture: ComponentFixture<GameCommissionDetailComponent>;
    const route = ({ data: of({ gameCommission: new GameCommission(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdminTestModule],
        declarations: [GameCommissionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GameCommissionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GameCommissionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load gameCommission on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gameCommission).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
