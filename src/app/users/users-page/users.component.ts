import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { User } from '../../models/user';

import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  page: number = 0;
  pageSize: number = 10;
  maxPageCount: number = 1;
  users: User[] = [];

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective | undefined;
  constructor(
    private httpService: HttpService,
    private toastrService: ToastrService,
    private notifyService: NotifyService
  ) {}

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;

    this.httpService.getUsersCount().subscribe((data) => {
      this.maxPageCount = Math.round(data / this.pageSize);
    });
    this.httpService
      .getUsers(this.page, this.pageSize)
      .subscribe((data: User[]) => {
        this.users = data;
        this.users.sort((a: any, b: any) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
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

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.httpService
        .getUsers(this.page, this.pageSize)
        .subscribe((data: User[]) => {
          this.users = data;
          this.users.sort((a: any, b: any) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
        });
    }
  }
  nextPage() {
    if (this.page < this.maxPageCount && this.maxPageCount > 10) {
      this.page++;
      this.httpService
        .getUsers(this.page, this.pageSize)
        .subscribe((data: User[]) => {
          this.users = data;
          this.users.sort((a: any, b: any) => {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            return 0;
          });
        });
    }
  }
  addUser() {
    this.httpService
      .addUser(this.userName, this.userEmail, this.userPassword)
      .subscribe((data: any) => {
        if (data === 'New user created') {
          this.notifyService.showMessage('success', data, 'Congratulations');
          this.httpService.getUsersCount().subscribe((data) => {
            this.maxPageCount = Math.round(data / this.pageSize);
          });
          this.userName = '';
          this.userEmail = '';
          this.userPassword = '';
          this.httpService
            .getUsers(this.page, this.pageSize)
            .subscribe((data: User[]) => {
              this.users = data;
              this.users.sort((a: any, b: any) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
              });
            });
        } else {
          this.notifyService.showMessage('error', 'Incorect input', 'Error');
        }
      });
  }
  deleteUser(index: number) {
    if (
      !localStorage
        .getItem('entitlements')
        ?.split(',')
        .includes('can_delete_users')
    ) {
      throw new Error('No permissions');
    }
    this.httpService.deleteUser(index).subscribe((data: any) => {
      if (data) {
        this.notifyService.showMessage(
          'success',
          `Deleted user ${index}`,
          'Congratulations'
        );
        this.httpService.getUsersCount().subscribe((data) => {
          this.maxPageCount = Math.round(data / this.pageSize);
        });
        this.httpService
          .getUsers(this.page, this.pageSize)
          .subscribe((data: User[]) => {
            this.users = data;
            this.users.sort((a: any, b: any) => a.name - b.name);
          });
      }
    });
  }
}
