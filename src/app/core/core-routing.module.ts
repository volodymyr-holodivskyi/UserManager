import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'dashboard',loadChildren:()=>import('../home/home.module').then(m=>m.HomeModule)},
  {path:'my-page',loadChildren:()=>import('../my-page/my-page.module').then(m=>m.MyPageModule)},
  {path:'login',loadChildren:()=>import('../login/login.module').then(m=>m.LoginModule)},
  {path:'users',loadChildren:()=>import('../users/users.module').then(m=>m.UsersModule)},
  {path:'users/:id',loadChildren:()=>import('../user-details/user-delails.module').then(m=>m.UserDelailsModule)},
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'**',loadChildren:()=>import('../not-found/not-found.module').then(m=>m.NotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
