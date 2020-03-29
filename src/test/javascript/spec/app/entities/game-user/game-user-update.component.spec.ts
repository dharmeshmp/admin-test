import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AdminTestModule } from '../../../test.module';
import { GameUserUpdateComponent } from 'app/entities/game-user/game-user-update.component';
import { GameUserService } from 'app/entities/game-user/game-user.service';
import { GameUser } from 'app/shared/model/game-user.model';

describe('Component Tests', () => {
  describe('GameUser Management Update Component', () => {
    let comp: GameUserUpdateComponent;
    let fixture: ComponentFixture<GameUserUpdateComponent>;
    let service: GameUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdminTestModule],
        declarations: [GameUserUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GameUserUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GameUserUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GameUserService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GameUser(123);
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
        const entity = new GameUser();
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
