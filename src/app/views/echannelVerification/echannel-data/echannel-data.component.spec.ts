import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchannelDataComponent } from './echannel-data.component';

describe('EchannelDataComponent', () => {
  let component: EchannelDataComponent;
  let fixture: ComponentFixture<EchannelDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchannelDataComponent]
    });
    fixture = TestBed.createComponent(EchannelDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
