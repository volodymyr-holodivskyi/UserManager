import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, CanDeactivate } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../../shared/services/http.service';
import { User } from '../../models/user';

import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { ComponentCanDeactivate } from 'src/app/shared/guards/user-details-exit.guard';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

interface Entitlements {
  [key: string]: boolean;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, ComponentCanDeactivate {
  id: number = 0;
  saved: boolean = true;
  showModal: boolean = false;
  userId: string | null = localStorage.getItem('userId');
  editMode: boolean = false;
  canEdit: boolean | undefined;
  canViewEntitlements: boolean | undefined;
  canEditEntitlements: boolean | undefined;
  modalResponce: boolean = false;
  user: User = new User('', '', '', '', '', 0, '');
  entitlements: Array<string> = [
    'can_view_users',
    'can_edit_users',
    'can_delete_users',
    'can_view_details',
    'can_view_details_full',
    'can_edit_users_full',
  ];
  userEntitlements: Entitlements = {
    can_view_users: this.user.entitlements
      .split(',')
      .includes('can_view_users'),
    can_edit_users: this.user.entitlements
      .split(',')
      .includes('can_edit_users'),
    can_delete_users: this.user.entitlements
      .split(',')
      .includes('can_delete_users'),
    can_view_details: this.user.entitlements
      .split(',')
      .includes('can_view_details'),
    can_view_details_full: this.user.entitlements
      .split(',')
      .includes('can_view_details_full'),
    can_edit_users_full: this.user.entitlements
      .split(',')
      .includes('can_edit_users_full'),
  };

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective | undefined;
  dialogRef: MatDialogRef<ConfirmationDialog> | null | undefined;
  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private toastrService: ToastrService,
    private notifyService: NotifyService,
    private dialog: MatDialog
  ) {}

  async canDeactivate(): Promise<any> {
    if (!this.saved) {
      await this.openConfirmationDialog().then((result) => {
        if (result) {
          this.modalResponce = result;
        }
        this.dialogRef = null;
      });
      return this.modalResponce;
    } else {
      return true;
    }
  }
  openConfirmationDialog() {
    this.dialogRef = this.dialog.open(ConfirmationDialog, {
      disableClose: false,
      hasBackdrop: true,
    });
    this.dialogRef.componentInstance.confirmMessage =
      'Are you sure you want to exit?';
    return this.dialogRef.afterClosed().toPromise();
  }

  onFormChange() {
    this.saved = false;
  }
  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('id')))
      .subscribe((data) => (this.id = +data));
    this.httpService.getUser(this.id).subscribe((data: User) => {
      this.user = data;
      this.user.password = '';
      for (const item of this.user.entitlements.split(',')) {
        if (this.user.entitlements.split(',').includes(item)) {
          this.userEntitlements[item] = true;
        }
      }
      this.canViewEntitlements = localStorage
        .getItem('entitlements')
        ?.split(',')
        .includes('can_view_users_full');
      this.canEdit = localStorage
        .getItem('entitlements')
        ?.split(',')
        .includes('can_edit_users');
      this.canEditEntitlements = localStorage
        .getItem('entitlements')
        ?.split(',')
        .includes('can_edit_users_full');
    });
    setInterval(() => {
      this.httpService
        .getRefreshToken(
          localStorage.getItem('email'),
          localStorage.getItem('refreshToken')
        )
        .subscribe((data: any) => {});
    }, 30000);
  }
  save(password: string, entitlements?: string) {
    this.editMode = false;
    this.saved = true;
    this.showModal = false;
    let tmp = [];
    for (const key in this.userEntitlements) {
      if (Object.prototype.hasOwnProperty.call(this.userEntitlements, key)) {
        if (this.userEntitlements[key]) {
          tmp.push(key);
        }
      }
    }
    this.user.entitlements = tmp.join(',');
    this.user.password = password;
    this.httpService.editUser(this.user).subscribe((data: any) => {
      this.notifyService.showMessage('success', data, 'Congratulations');
      this.httpService.getUser(this.id).subscribe((data: User) => {
        this.user = data;
        this.user.password = '';
      });
    });
  }
  switchEditMode() {
    if (this.user.id === 1) throw new Error('Can`t edit admin');
    this.editMode = !this.editMode;
  }
  setChecked(entitlement: string) {
    this.userEntitlements[entitlement] = !this.userEntitlements[entitlement];
  }
}
