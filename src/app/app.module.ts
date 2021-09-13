import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { HttpErrorInterceptorService } from './shared/app-error-handler.service';
import { EditUserPageComponent } from './edit-user/edit-user-page/edit-user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    UserDetailsComponent,
    NotFoundComponent,
    MyPageComponent,
    LoginComponent,
    EditUserPageComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({positionClass: 'inline'}),
    ToastContainerModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
