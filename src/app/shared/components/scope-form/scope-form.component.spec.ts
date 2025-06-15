import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScopeFormComponent } from './scope-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScopeFormComponent', () => {
  let component: ScopeFormComponent;
  let fixture: ComponentFixture<ScopeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ScopeFormComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScopeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
