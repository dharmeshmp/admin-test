import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdminTestModule } from '../../../test.module';
import { GameUserDetailComponent } from 'app/entities/game-user/game-user-detail.component';
import { GameUser } from 'app/shared/model/game-user.model';

describe('Component Tests', () => {
  describe('GameUser Management Detail Component', () => {
    let comp: GameUserDetailComponent;
    let fixture: ComponentFixture<GameUserDetailComponent>;
    const route = ({ data: of({ gameUser: new GameUser(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdminTestModule],
        declarations: [GameUserDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GameUserDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GameUserDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load gameUser on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.gameUser).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
