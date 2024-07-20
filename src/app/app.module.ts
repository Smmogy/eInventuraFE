import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  CustomeInterceptor,
  customeInterceptor,
} from './services/customInterceptor/custome.interceptor';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InventuraFormComponent } from './inventura-form/inventura-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthVisibilityDirective } from './directives/auth-visibility.directive';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { InstitutionsFormComponent } from './pages/institutions-form/institutions-form.component';
import { InstitutionCreateFormComponent } from './pages/institution-create-form/institution-create-form.component';
import { InstitutionEditFormComponent } from './pages/institution-edit-form/institution-edit-form.component';
import { ProstorijaFormComponent } from './pages/prostorija-form/prostorija-form.component';
import { ProstorijaCreateFormComponent } from './pages/prostorija-create-form/prostorija-create-form.component';
import { ProstorijaEditFormComponent } from './pages/prostorija-edit-form/prostorija-edit-form.component';
import { ArtiklFormComponent } from './pages/artikl-form/artikl-form.component';
import { ArtiklCreateFormComponent } from './pages/artikl-create-form/artikl-create-form.component';
import { ArtiklEditFormComponent } from './pages/artikl-edit-form/artikl-edit-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    DashboardComponent,
    RegisterComponent,
    InventuraFormComponent,
    AuthVisibilityDirective,
    InstitutionsFormComponent,
    InstitutionCreateFormComponent,
    InstitutionEditFormComponent,
    ProstorijaFormComponent,
    ProstorijaCreateFormComponent,
    ProstorijaEditFormComponent,
    ArtiklFormComponent,
    ArtiklCreateFormComponent,
    ArtiklEditFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    InputNumberModule,
    MessagesModule,
    MessageModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    DropdownModule,
    MultiSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomeInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
