import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-rank-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './rank-input.component.html',
  styleUrls: ['./rank-input.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RankInputComponent),
      multi: true,
    },
  ],
})
export class RankInputComponent implements ControlValueAccessor {
  @Input() label = 'Rang';
  @Input() placeholder = '';
  @Input() hint = 'Valeur entre 0 et 999';

  value: string = '';

  private onChange = (value: any) => {};
  private onTouched = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  onInput(event: any) {
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/\D/g, '');

    if (inputValue.length > 3) {
      inputValue = inputValue.slice(0, 3);
    }

    if (inputValue.length > 1) {
      inputValue = parseInt(inputValue, 10).toString();
    }
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue > 999) {
      inputValue = '999';
    }

    this.value = inputValue;
    event.target.value = inputValue;
    this.onChange(inputValue ? parseInt(inputValue, 10) : null);
    this.cdr.markForCheck();
  }

  onKeyDown(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
      'Home',
      'End',
      'Enter',
    ];
    const isNumber = /^[0-9]$/.test(event.key);
    if (!isNumber && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasteData = event.clipboardData?.getData('text') || '';
    let cleanData = pasteData.replace(/\D/g, '');

    if (cleanData.length > 3) {
      cleanData = cleanData.slice(0, 3);
    }

    if (cleanData.length > 1) {
      cleanData = parseInt(cleanData, 10).toString();
    }
    const numValue = parseInt(cleanData, 10);
    if (!isNaN(numValue) && numValue > 999) {
      cleanData = '999';
    }

    this.value = cleanData;
    const inputElement = event.target as HTMLInputElement;
    inputElement.value = cleanData;
    this.onChange(cleanData ? parseInt(cleanData, 10) : null);
    this.cdr.markForCheck();
  }

  onBlur() {
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value != null ? value.toString() : '';
    this.cdr.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
