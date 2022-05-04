import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-choose-harvester',
  templateUrl: './choose-harvester.component.html',
  styleUrls: ['./choose-harvester.component.css'],
})
export class ChooseHarvesterComponent implements OnInit {
  @Input() irradiance!: number | null;
  @Input('harvester') currentHarvesterId!: string;
  chosedHarvester!: { description: string; id: string };
  @Output() changeIrradiance = new EventEmitter<number>();
  @Output() changeHarvester = new EventEmitter<string>();
  icon!: string;
  iconClass = 'material-icons';
  showRadioButton: boolean;
  harvesters: { description: string; id: string }[] = [
    { description: 'Small Solar Panel', id: 'SolarLightLoad' },
    { description: 'Big Solar Panel', id: 'SolarHeavyLoad' },
  ];

  constructor() {
    this.showRadioButton = environment.showRadioButton;
  }

  ngOnInit(): void {
    this.setIcon(this.currentHarvesterId);
    for (const harvester of this.harvesters)
      if (this.currentHarvesterId === harvester.id)
        this.chosedHarvester = harvester;
  }
  setIconClass(type: string = '') {
    if (type === 'SolarLightLoad') this.iconClass = 'material-icons-outlined';
    else this.iconClass = 'material-icons';
  }
  updateIrradiance(newValue: number | null) {
    if (newValue === null) this.changeIrradiance.emit(0);

    this.changeIrradiance.emit(newValue || 0);
  }

  fromDescriptionToID(description: string) {
    for (const harvester of this.harvesters)
      if (description === harvester.description) return harvester.id;
    return;
  }

  updateHarvester(newHarvester: string) {
    const id = this.fromDescriptionToID(newHarvester);
    this.setIcon(id);
    if (id) this.changeHarvester.emit(id);
  }

  setIcon(type: string = '') {
    this.setIconClass(type);
    switch (type) {
      case 'TEG':
        this.icon = 'eletrical_service';
        break;
      case 'piezo':
        this.icon = 'vibration';
        break;
      case 'SolarLightLoad':
        this.icon = 'solar_power';
        break;
      case 'SolarHeavyLoad':
        this.icon = 'solar_power';
        break;
      default:
        this.icon = 'question_mark';
    }
  }
}
