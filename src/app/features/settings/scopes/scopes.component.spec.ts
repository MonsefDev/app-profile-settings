import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopesComponent } from './scopes.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ScopesComponent', () => {
  let component: ScopesComponent;
  let fixture: ComponentFixture<ScopesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        ScopesComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScopesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
