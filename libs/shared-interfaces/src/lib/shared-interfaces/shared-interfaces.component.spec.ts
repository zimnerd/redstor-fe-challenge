import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedInterfacesComponent } from './shared-interfaces.component';

describe('SharedInterfacesComponent', () => {
  let component: SharedInterfacesComponent;
  let fixture: ComponentFixture<SharedInterfacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedInterfacesComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SharedInterfacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
