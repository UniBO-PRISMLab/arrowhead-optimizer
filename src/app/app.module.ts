import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArrowheadService } from './services/arrowhead.service';
import { DrHarvesterService } from './services/dr-harvester.service';
import { ThingsService } from './services/things.service';
import { ObservableHandlerComponent } from './components/observable-handler/observable-handler.component';
import { ArrowheadComponent } from './components/arrowhead/arrowhead.component';
import { TestHarvesterComponent } from './components/test-harvester/test-harvester.component';
import { TimerComponent } from './components/timer/timer.component';
import { TestThingsComponent } from './components/test-things/test-things.component';
import { ShowThingComponent } from './components/show-thing/show-thing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ShowBatteryComponent } from './components/show-battery/show-battery.component';
import { FormatSecondsPipe } from './pipes/format-seconds.pipe';
import { ShowHarvesterComponent } from './components/show-harvester/show-harvester.component';
import { ShowDutyComponent } from './components/show-duty/show-duty.component';
import { ShowPowerComponent } from './components/show-power/show-power.component';
import { ControlDutyComponent } from './components/control-duty/control-duty.component';
import { PercentageSpinnerComponent } from './components/percentage-spinner/percentage-spinner.component';
import { PanelComponent } from './components/panel/panel.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DutySliderComponent } from './components/duty-slider/duty-slider.component';
import { ChooseHarvesterComponent } from './components/choose-harvester/choose-harvester.component';

@NgModule({
  declarations: [
    AppComponent,
    ObservableHandlerComponent,
    ArrowheadComponent,
    TestHarvesterComponent,
    TimerComponent,
    TestThingsComponent,
    ShowThingComponent,
    ShowBatteryComponent,
    FormatSecondsPipe,
    ShowHarvesterComponent,
    ShowDutyComponent,
    ShowPowerComponent,
    ControlDutyComponent,
    PercentageSpinnerComponent,
    PanelComponent,
    ConfirmDialogComponent,
    DutySliderComponent,
    ChooseHarvesterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [ArrowheadService, DrHarvesterService, ThingsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
