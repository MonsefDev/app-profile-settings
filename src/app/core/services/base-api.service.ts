import { Observable, of, delay, throwError } from 'rxjs';
import { ApiResponse } from '../models/base.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService<T, CreateT, UpdateT> {
  protected abstract entityName: string;
  protected simulateDelay = 1500;

  protected simulateApiCall<R>(data: R, shouldFail = false): Observable<ApiResponse<R>> {
    const willFail = shouldFail || Math.random() < 0.05;

    return of({
      success: !willFail,
      data: willFail ? null as any : data,
      message: willFail
        ? `Erreur lors de l'opération sur ${this.entityName}`
        : `${this.entityName} traité avec succès`
    }).pipe(delay(this.simulateDelay));
  }

  abstract getAll(): Observable<ApiResponse<T[]>>;
  abstract create(entity: CreateT): Observable<ApiResponse<T>>;
  abstract update(entity: UpdateT): Observable<ApiResponse<T>>;
  abstract delete(id: string): Observable<ApiResponse<boolean>>;
}
