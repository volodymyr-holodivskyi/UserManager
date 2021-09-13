import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditUserPageComponent } from './edit-user-page/edit-user-page.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path:'',component:EditUserPageComponent}
    ]),
    SharedModule
  ]
})
export class EditUserModule { }
