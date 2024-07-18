import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { InventuraFormComponent } from './inventura-form/inventura-form.component';
import { InstitutionsFormComponent } from './pages/institutions-form/institutions-form.component';
import { InstitutionCreateFormComponent } from './pages/institution-create-form/institution-create-form.component';
import { InstitutionEditFormComponent } from './pages/institution-edit-form/institution-edit-form.component';
import { ProstorijaFormaComponent } from './pages/prostorija-forma/prostorija-forma.component';

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

      { path: 'prostorija-forma/:id', component: ProstorijaFormaComponent },

      { path: 'prostorija-forma', component: ProstorijaFormaComponent },
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
