import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InventuraFormComponent } from './inventura-form/inventura-form.component';
import { InstitutionsFormComponent } from './pages/institutions-form/institutions-form.component';
import { InstitutionCreateFormComponent } from './pages/institution-create-form/institution-create-form.component';
import { InstitutionEditFormComponent } from './pages/institution-edit-form/institution-edit-form.component';
import { ProstorijaFormComponent } from './pages/prostorija-form/prostorija-form.component';
import { ProstorijaCreateFormComponent } from './pages/prostorija-create-form/prostorija-create-form.component';
import { ProstorijaEditFormComponent } from './pages/prostorija-edit-form/prostorija-edit-form.component';
import { ArtiklFormComponent } from './pages/artikl-form/artikl-form.component';
import { ArtiklCreateFormComponent } from './pages/artikl-create-form/artikl-create-form.component';
import { ArtiklEditFormComponent } from './pages/artikl-edit-form/artikl-edit-form.component';
import { InventuraDetailsComponent } from './pages/inventura-details/inventura-details.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { AdminGuard } from './directives/guards/admin.guard';
import { DashboardAdminAllComponent } from './pages/dashboard-admin-all/dashboard-admin-all.component';
import { LoggedInGuard } from './directives/guards/logged-in.guard';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard/:id',
        component: DashboardComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'institutions-form',
        component: InstitutionsFormComponent,
        canActivate: [LoggedInGuard],
      },

      {
        path: 'institutions/create',
        component: InstitutionCreateFormComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'institutions/edit/:id',
        component: InstitutionEditFormComponent,
        canActivate: [LoggedInGuard],
      },

      {
        path: 'inventura-form',
        component: InventuraFormComponent,
        canActivate: [LoggedInGuard],
      },

      {
        path: 'prostorija-form/:id',
        component: ProstorijaFormComponent,
        canActivate: [LoggedInGuard],
      },

      {
        path: 'prostorija/create/:id',
        component: ProstorijaCreateFormComponent,
        canActivate: [LoggedInGuard],
      },

      {
        path: 'prostorija/edit/:id',
        component: ProstorijaEditFormComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'artikl-form/:id',
        component: ArtiklFormComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'artikl/create/:id',
        component: ArtiklCreateFormComponent,
        canActivate: [LoggedInGuard],
      },

      {
        path: 'artikl/edit/:id',
        component: ArtiklEditFormComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'inventura/edit/:id',
        component: InventuraDetailsComponent,
        canActivate: [LoggedInGuard],
      },
      {
        path: 'dashboard/list/admin',
        component: DashboardAdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'dashboard/list/admin/all',
        component: DashboardAdminAllComponent,
        canActivate: [AdminGuard],
      },
    ],
  },
  {
    path: '**',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
