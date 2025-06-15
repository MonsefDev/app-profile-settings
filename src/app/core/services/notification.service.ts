import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  showSuccess(message: string, params?: any) {
    const translatedMessage = this.translate.instant(message, params);
    this.snackBar.open(translatedMessage, '✕', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  showError(message: string, params?: any) {
    const translatedMessage = this.translate.instant(message, params);
    this.snackBar.open(translatedMessage, '✕', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }

  showWarning(message: string, params?: any) {
    const translatedMessage = this.translate.instant(message, params);
    this.snackBar.open(translatedMessage, '✕', {
      duration: 4000,
      panelClass: ['warning-snackbar'],
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });
  }
}