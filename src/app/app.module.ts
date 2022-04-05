import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrowheadService } from './services/arrowhead.service';
import { DrHarvesterService } from './services/dr-harvester.service';
import { ThingsService } from './services/things.service';
import { ObservableHandlerComponent } from './components/observable-handler/observable-handler.component';
import { TestAsyncComponent } from './components/test-async/test-async.component';
import { ArrowheadComponent } from './components/arrowhead/arrowhead.component';
import { TestHarvesterComponent } from './components/test-harvester/test-harvester.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableHandlerComponent,
    TestAsyncComponent,
    ArrowheadComponent,
    TestHarvesterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [ArrowheadService, DrHarvesterService, ThingsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
