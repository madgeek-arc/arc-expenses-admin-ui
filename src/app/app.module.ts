import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedComponentsModule } from './shared/shared-components.module';
import { AdminPageComponent } from './admin-pages/admin-page.component';
import { AdminEditResourcePageComponent } from './admin-pages/admin-edit-resource-page.component';
import { EditResourcesComponent } from './admin-pages/edit-resources-forms/edit-resources.component';
import { EditProjectComponent } from './admin-pages/edit-resources-forms/edit-project.component';
import { EditInstituteComponent } from './admin-pages/edit-resources-forms/edit-institute.component';
import { EditOrganizationComponent } from './admin-pages/edit-resources-forms/edit-organization.component';
import { EditPoiComponent } from './admin-pages/edit-resources-forms/edit-poi.component';
import { EditDelegateComponent } from './admin-pages/edit-resources-forms/edit-delegate.component';
import { ProjectsListComponent } from './admin-pages/resources-lists/projects-list.component';
import { OrganizationsListComponent } from './admin-pages/resources-lists/organizations-list.component';
import { InstitutesListComponent } from './admin-pages/resources-lists/institutes-list.component';
import { ResourcesLoaderComponent } from './admin-pages/resources-dynamic-load/resources-loader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TopMenuComponent } from './shared/top-menu/top-menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ForbiddenPageComponent } from './shared/403-forbidden-page.component';
import { CallHelpdeskPageComponent } from './error-pages/call-helpdesk-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { ManageUserService } from './services/manage-user.service';
import { ManageProjectService } from './services/manage-project.service';
import { ManageResourcesService } from './services/manage-resources.service';
import { HelpContentService } from './shared/help-content/help-content.service';
import { AuthenticationInterceptor } from './services/authentication-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import localeEL from '@angular/common/locales/el';
import { AppRoutingModule } from './app-routing.module';

registerLocaleData(localeEL);

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    HomeComponent,
    AboutComponent,
    ForbiddenPageComponent,
    CallHelpdeskPageComponent,
    AdminPageComponent,
    AdminEditResourcePageComponent,
    EditResourcesComponent,
    EditProjectComponent,
    EditInstituteComponent,
    EditOrganizationComponent,
    EditPoiComponent,
    EditDelegateComponent,
    ProjectsListComponent,
    OrganizationsListComponent,
    InstitutesListComponent,
    ResourcesLoaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedComponentsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'el' },
    HelpContentService,
    ManageResourcesService,
    ManageProjectService,
    ManageUserService,
    AuthenticationService,
    AuthGuardService,
    DatePipe
  ],
  entryComponents: [
    EditResourcesComponent,
    EditProjectComponent,
    EditInstituteComponent,
    EditOrganizationComponent,
    EditPoiComponent,
    EditDelegateComponent,
    ProjectsListComponent,
    OrganizationsListComponent,
    InstitutesListComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
