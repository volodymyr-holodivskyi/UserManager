import { ErrorHandler, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {} from '@angular/compiler';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home-page/home.component';
import { UsersComponent } from './users/users-page/users.component';
import { UserDetailsComponent } from './user-details/user-details-page/user-details.component';
import { NotFoundComponent } from './not-found/not-found-page/not-found.component';
import { MyPageComponent } from './my-page/my-page-page/my-page.component';
import { LoginComponent } from './login/login-page/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HttpErrorInterceptorService } from './shared/services/http-interceptor.service';
import { GlobalErrorHandler } from './shared/services/global-error-handler.service';
import { UserDetailsGuard } from './shared/guards/user-details.guard';
import { UserDetailsExitGuard } from './shared/guards/user-details-exit.guard';
import { ConfirmationDialog } from './shared/confirmation-dialog/confirmation-dialog.component';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserDetailsComponent,
    NotFoundComponent,
    MyPageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'inline' }),
    ToastContainerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    UserDetailsGuard,
    UserDetailsExitGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialog],
})
export class AppModule {}
