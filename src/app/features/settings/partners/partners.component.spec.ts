import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersComponent } from './partners.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PartnersComponent', () => {
  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        NoopAnimationsModule,
        PartnersComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
