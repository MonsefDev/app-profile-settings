import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil, finalize } from 'rxjs';

import { DataTableComponent } from '../../shared/components/data-table/data-table.component';
import { ProfileFormComponent, ProfileFormData } from '../../shared/components/profile-form/profile-form.component';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { ProfileService } from '../../core/services/profile.service';
import { ScopeService } from '../../core/services/scope.service';
import { Profile, CreateProfileRequest, UpdateProfileRequest } from '../../core/models/profile.model';
import { TableColumn, TableAction } from '../../core/models/table.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule,
    DataTableComponent
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  profiles: Profile[] = [];
  displayedProfiles: Profile[] = [];

  availableScopes: string[] = [];
  isLoading = false;
  currentSearchTerm = '';
  private destroy$ = new Subject<void>();

  tableColumns: TableColumn[] = [
    { key: 'code', label: 'profile.code', sortable: true, type: 'text' },
    { key: 'description', label: 'profile.description', sortable: true, type: 'text' },
    { key: 'scopes', label: 'profile.scopes', sortable: false, type: 'array' },
    { key: 'createdAt', label: 'profile.created_at', sortable: true, type: 'date' },
    { key: 'lastModifiedBy', label: 'profile.last_modified_by', sortable: true, type: 'text' }
  ];

  tableActions: TableAction[] = [
    {
      icon: 'edit',
      label: 'common.edit',
      color: 'primary',
      action: (profile: Profile) => this.openEditDialog(profile)
    },
    {
      icon: 'delete',
      label: 'common.delete',
      color: 'warn',
      action: (profile: Profile) => this.confirmDeleteProfile(profile),
      visible: (profile: Profile) => profile.code !== 'ADMIN'
    }
  ];

  constructor(
    private profileService: ProfileService,
    private scopeService: ScopeService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProfiles();
    this.loadAvailableScopes();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProfiles() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.cdr.markForCheck();

    this.profileService.getAll()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.profiles = [...response.data];
            this.displayedProfiles = [...this.profiles];
            this.applyCurrentFilter();
            this.cdr.markForCheck();
          } else {
            this.profiles = [];
            this.displayedProfiles = [];
            this.notificationService.showError('common.error');
          }
        },
        error: (error) => {
          this.profiles = [];
          this.displayedProfiles = [];
          this.notificationService.showError('common.error');
          this.cdr.markForCheck();
        }
      });
  }

  loadAvailableScopes() {
    this.scopeService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.availableScopes = response.data.map(scope => scope.name);
            this.cdr.markForCheck();
          }
        },
        error: (error) => {
        }
      });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      width: '500px',
      disableClose: true,
      data: {
        mode: 'create',
        availableScopes: this.availableScopes
      } as ProfileFormData
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.createProfile(result);
        }
      });
  }

  openEditDialog(profile: Profile) {
    const dialogRef = this.dialog.open(ProfileFormComponent, {
      width: '500px',
      disableClose: true,
      data: {
        mode: 'edit',
        profile: { ...profile },
        availableScopes: this.availableScopes
      } as ProfileFormData
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.updateProfile(result);
        }
      });
  }

  confirmDeleteProfile(profile: Profile) {
    const dialogData: ConfirmationDialogData = {
      title: 'Confirmer la suppression',
      message: `Êtes-vous sûr de vouloir supprimer le profil "${profile.code}" ?`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      type: 'danger'
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        if (result) {
          this.deleteProfile(profile);
        }
      });
  }

  createProfile(profileData: CreateProfileRequest) {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.profileService.create(profileData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess('common.success');
            this.loadProfiles();
          } else {
            this.notificationService.showError(response.success || 'common.error');
          }
        },
        error: (error) => {
          this.notificationService.showError('common.error');
        }
      });
  }

  updateProfile(profileData: UpdateProfileRequest) {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.profileService.update(profileData)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess('common.success');
            this.loadProfiles();
          } else {
            this.notificationService.showError(response.success || 'common.error');
          }
        },
        error: (error) => {
          this.notificationService.showError('common.error');
        }
      });
  }

  private deleteProfile(profile: Profile) {
    this.isLoading = true;
    this.cdr.markForCheck();

    this.profileService.delete(profile.id)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => {
          this.isLoading = false;
          this.cdr.markForCheck();
        })
      )
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.notificationService.showSuccess('common.success');
            this.loadProfiles();
          } else {
            this.notificationService.showError(response.success || 'common.error');
          }
        },
        error: (error) => {
          this.notificationService.showError('common.error');
        }
      });
  }

  onSearch(searchTerm: string) {
    const newSearchTerm = searchTerm?.trim() || '';

    if (this.currentSearchTerm !== newSearchTerm) {
      this.currentSearchTerm = newSearchTerm;
      this.applyCurrentFilter();
      this.cdr.markForCheck();
    }
  }

  private applyCurrentFilter() {
    if (!this.currentSearchTerm) {
      this.displayedProfiles = [...this.profiles];
      return;
    }

    const searchTermLower = this.currentSearchTerm.toLowerCase();

    this.displayedProfiles = this.profiles.filter(profile => {
      const codeMatch = profile.code && profile.code.toLowerCase().includes(searchTermLower);
      const descriptionMatch = profile.description && profile.description.toLowerCase().includes(searchTermLower);
      const lastModifiedMatch = profile.lastModifiedBy && profile.lastModifiedBy.toLowerCase().includes(searchTermLower);

      let scopesMatch = false;
      if (profile.scopes && Array.isArray(profile.scopes)) {
        scopesMatch = profile.scopes.some(scope =>
          scope && scope.toLowerCase().includes(searchTermLower)
        );
      }

      return codeMatch || descriptionMatch || lastModifiedMatch || scopesMatch;
    });
  }

  trackByProfile(index: number, profile: Profile): string {
    return profile.id;
  }
}