import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartnerFormComponent } from './partner-form.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PartnerFormComponent', () => {
  let component: PartnerFormComponent;
  let fixture: ComponentFixture<PartnerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PartnerFormComponent,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
