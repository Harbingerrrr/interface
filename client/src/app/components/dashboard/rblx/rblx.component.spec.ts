import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RblxComponent } from './rblx.component';

describe('RblxComponent', () => {
  let component: RblxComponent;
  let fixture: ComponentFixture<RblxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RblxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RblxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
