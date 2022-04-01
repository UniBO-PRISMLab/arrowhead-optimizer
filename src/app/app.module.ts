import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrowheadService } from './services/arrowhead.service';
import { DrHarvesterService } from './services/dr-harvester.service';
import { ThingsService } from './services/things.service';
import { TestServiceComponent } from './components/test-service/test-service.component';

@NgModule({
  declarations: [
    AppComponent,
    TestServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ArrowheadService, DrHarvesterService, ThingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
