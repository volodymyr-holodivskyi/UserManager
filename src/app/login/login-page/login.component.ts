import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { loginData } from 'src/app/models/loginData';
import { HttpService } from 'src/app/shared/services/http.service';

import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
import { NotifyService } from 'src/app/shared/services/notify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer: ToastContainerDirective | undefined;
  constructor(
    private router: Router,
    private httpService: HttpService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
  }
  logIn(email: string, password: string) {
    this.httpService.login(email, password).subscribe((data: loginData) => {
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem('userId', data.user.id.toString());
      localStorage.setItem('token', data.token);
      localStorage.setItem('entitlements', data.user.entitlements);
      localStorage.setItem('refreshToken', data.refreshToken);
      this.router.navigate(['/dashboard']);
    });
  }
}
