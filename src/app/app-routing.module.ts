import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ForbiddenPageComponent } from './shared/403-forbidden-page.component';
import { AdminPageComponent } from './admin-pages/admin-page.component';
import { CallHelpdeskPageComponent } from './error-pages/call-helpdesk-page.component';
import { AdminEditResourcePageComponent } from './admin-pages/admin-edit-resource-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'resources/:type',
    canActivate: [AuthGuardService],
    canLoad: [AuthGuardService],
    children: [
      {
        path: '',
        component: AdminPageComponent,
      },
      {
        path: 'add',
        component: AdminEditResourcePageComponent
      },
      {
        path: 'edit/:resourceId',
        component: AdminEditResourcePageComponent
      }
    ]
  },
  {
      path: '403-forbidden',
      component: ForbiddenPageComponent
  },
  {
      path: 'login-error',
      component: CallHelpdeskPageComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(appRoutes) ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule { }
