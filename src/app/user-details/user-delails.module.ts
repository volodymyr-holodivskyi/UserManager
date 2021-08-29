import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details-page/user-details.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:UserDetailsComponent}
    ]),
    SharedModule
  ]
})
export class UserDelailsModule { }
