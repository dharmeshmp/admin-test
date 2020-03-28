import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AdminTestModule } from '../../../test.module';
import { GameCommissionComponent } from 'app/entities/game-commission/game-commission.component';
import { GameCommissionService } from 'app/entities/game-commission/game-commission.service';
import { GameCommission } from 'app/shared/model/game-commission.model';

describe('Component Tests', () => {
  describe('GameCommission Management Component', () => {
    let comp: GameCommissionComponent;
    let fixture: ComponentFixture<GameCommissionComponent>;
    let service: GameCommissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdminTestModule],
        declarations: [GameCommissionComponent]
      })
        .overrideTemplate(GameCommissionComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GameCommissionComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GameCommissionService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GameCommission(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gameCommissions && comp.gameCommissions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
