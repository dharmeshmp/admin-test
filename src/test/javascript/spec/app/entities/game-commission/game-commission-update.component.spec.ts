import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AdminTestModule } from '../../../test.module';
import { GameCommissionUpdateComponent } from 'app/entities/game-commission/game-commission-update.component';
import { GameCommissionService } from 'app/entities/game-commission/game-commission.service';
import { GameCommission } from 'app/shared/model/game-commission.model';

describe('Component Tests', () => {
  describe('GameCommission Management Update Component', () => {
    let comp: GameCommissionUpdateComponent;
    let fixture: ComponentFixture<GameCommissionUpdateComponent>;
    let service: GameCommissionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdminTestModule],
        declarations: [GameCommissionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GameCommissionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GameCommissionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GameCommissionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GameCommission(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GameCommission();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
