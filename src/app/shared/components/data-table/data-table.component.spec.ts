import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DataTableComponent } from './data-table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        DataTableComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
