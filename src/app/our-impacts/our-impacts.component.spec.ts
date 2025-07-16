import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurImpactsComponent } from './our-impacts.component';

describe('OurImpactsComponent', () => {
  let component: OurImpactsComponent;
  let fixture: ComponentFixture<OurImpactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurImpactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
