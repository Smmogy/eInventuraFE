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
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'institutions-form', component: InstitutionsFormComponent },

      {
        path: 'institutions/create',
        component: InstitutionCreateFormComponent,
      },
      {
        path: 'institutions/edit',
        component: InstitutionEditFormComponent,
      },
      {
        path: 'institutions/edit/:id',
        component: InstitutionEditFormComponent,
      },

      {
        path: 'inventura-form',
        component: InventuraFormComponent,
      },

      { path: 'prostorija-form/:id', component: ProstorijaFormComponent },

      {
        path: 'prostorija/create/:id',
        component: ProstorijaCreateFormComponent,
      },

      {
        path: 'prostorija/edit/:id',
        component: ProstorijaEditFormComponent,
      },
      {
        path: 'artikl-form/:id',
        component: ArtiklFormComponent,
      },
      {
        path: 'artikl/create/:id',
        component: ArtiklCreateFormComponent,
      },

      {
        path: 'artikl/edit/:id',
        component: ArtiklEditFormComponent,
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
