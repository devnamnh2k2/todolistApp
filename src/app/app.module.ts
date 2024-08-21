import { NgModule } from '@angular/core';

import { TodolistComponent } from './todolist/todolist.component';
import { TodoitemComponent } from './todoitem/todoitem.component';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { environment } from '../environments/environment.development';
import { AngularFireModule } from '@angular/fire/compat';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
  declarations: [
    AppComponent,TodolistComponent,TodoitemComponent, 
  ],
  imports: [
    MatCheckboxModule, MatButtonModule, MatIconModule, MatIconModule, MatButtonToggleModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, MatSnackBarModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
