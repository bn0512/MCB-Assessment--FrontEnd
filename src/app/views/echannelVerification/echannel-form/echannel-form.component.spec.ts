import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchannelFormComponent } from './echannel-form.component';

describe('EchannelFormComponent', () => {
  let component: EchannelFormComponent;
  let fixture: ComponentFixture<EchannelFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchannelFormComponent]
    });
    fixture = TestBed.createComponent(EchannelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
