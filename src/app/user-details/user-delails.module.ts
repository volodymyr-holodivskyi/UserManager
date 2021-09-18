import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details-page/user-details.component';
import { SharedModule } from '../shared/shared.module';
import { UserDetailsGuard } from '../shared/guards/user-details.guard';
import { UserDetailsExitGuard } from '../shared/guards/user-details-exit.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:UserDetailsComponent,canActivate:[UserDetailsGuard],canDeactivate:[UserDetailsExitGuard]}
    ]),
    SharedModule
  ]
})
export class UserDelailsModule { }
