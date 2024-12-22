import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { PreviewPopupComponent } from './preview-popup.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('PreviewPopupComponent', () => {
  let component: PreviewPopupComponent;
  let fixture: ComponentFixture<PreviewPopupComponent>;

  const mockData = {
    urls: {
      regular: 'test-url.jpg'
    },
    alt_description: 'Test image'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewPopupComponent, MatDialogModule, MatButtonModule, MatIconModule],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: mockData }]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image with correct url', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.src).toContain('test-url.jpg');
  });

  it('should display alt text', () => {
    const img = fixture.nativeElement.querySelector('img');
    expect(img.alt).toBe('Test image');
  });

  it('should display default alt text when none provided', () => {
    component.data.alt_description = undefined;
    fixture.detectChanges();
    const img = fixture.nativeElement.querySelector('img');
    expect(img.alt).toBe('Preview image');
  });
});
