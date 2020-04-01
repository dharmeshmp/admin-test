import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AdminTestModule } from '../../../test.module';
import { HandDetailComponent } from 'app/entities/hand/hand-detail.component';
import { Hand } from 'app/shared/model/hand.model';

describe('Component Tests', () => {
  describe('Hand Management Detail Component', () => {
    let comp: HandDetailComponent;
    let fixture: ComponentFixture<HandDetailComponent>;
    const route = ({ data: of({ hand: new Hand(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AdminTestModule],
        declarations: [HandDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HandDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HandDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load hand on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.hand).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
