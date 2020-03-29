import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AdminTestModule } from '../../../test.module';
import { GameUserComponent } from 'app/entities/game-user/game-user.component';
import { GameUserService } from 'app/entities/game-user/game-user.service';
import { GameUser } from 'app/shared/model/game-user.model';

describe('Component Tests', () => {
  describe('GameUser Management Component', () => {
    let comp: GameUserComponent;
    let fixture: ComponentFixture<GameUserComponent>;
    let service: GameUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdminTestModule],
        declarations: [GameUserComponent]
      })
        .overrideTemplate(GameUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GameUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GameUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GameUser(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.gameUsers && comp.gameUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
