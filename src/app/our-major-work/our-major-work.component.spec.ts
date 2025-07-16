import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurMajorWorkComponent } from './our-major-work.component';

describe('OurMajorWorkComponent', () => {
  let component: OurMajorWorkComponent;
  let fixture: ComponentFixture<OurMajorWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurMajorWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurMajorWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
