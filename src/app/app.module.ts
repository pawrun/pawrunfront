import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent, BadCredentialsDialog } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import {
  MatFormFieldModule, MatInputModule, MatDialogModule, MatToolbarModule, MatTabsModule, MatMenuModule, MatExpansionModule, MatDividerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { DataService } from './services/data.service';
import { TokenStorageService } from './services/token-storage.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthInterceptor } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    HistoryComponent,
    BadCredentialsDialog
  ],
  entryComponents: [BadCredentialsDialog]
  ,
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatToolbarModule,
    MatTabsModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule
  ],
  providers: [LoginService, DataService, TokenStorageService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
