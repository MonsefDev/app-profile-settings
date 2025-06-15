import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RankInputComponent } from './rank-input.component';

describe('RankInputComponent', () => {
  let component: RankInputComponent;
  let fixture: ComponentFixture<RankInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RankInputComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RankInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
