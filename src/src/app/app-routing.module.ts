import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './services/auth.guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user', component: UserComponent, children: [
      { path: 'viewuser', loadChildren: () => import('./viewuser/viewuser.module').then(m => m.ViewuserModule) },
      { path: 'adduser', loadChildren: () => import('./adduser/adduser.module').then(m => m.AdduserModule) },
      { path: 'edituser', loadChildren: () => import('./edituser/edituser.module').then(m => m.EdituserModule) },
      { path: 'deleteuser', loadChildren: () => import('./deleteuser/deleteuser.module').then(m => m.DeleteuserModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
