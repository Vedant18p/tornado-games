import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TornadoTableComponent } from './tornado-table.component';

describe('TornadoTableComponent', () => {
  let component: TornadoTableComponent;
  let fixture: ComponentFixture<TornadoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TornadoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TornadoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
