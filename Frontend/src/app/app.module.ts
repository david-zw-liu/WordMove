import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing, appRoutingProviders } from './app.routing';


import { AppComponent } from './app.component';

// Bootstrap Components
import { AlertModule, DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { HomeComponent } from './home/home.component';
import { InputArticleComponent } from './input-article/input-article.component';
import { SelectAnimationComponent } from './select-animation/select-animation.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InputArticleComponent,
    SelectAnimationComponent,
    ResultComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule,
    DatepickerModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }