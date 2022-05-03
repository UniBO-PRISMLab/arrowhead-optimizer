import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-harvester',
  templateUrl: './show-harvester.component.html',
  styleUrls: ['./show-harvester.component.css'],
})
export class ShowHarvesterComponent implements OnInit {
  @Input('type') harvesterType: string = '';
  @Input() irradiance!: number;

  description:string = '';
  constructor() {}

  ngOnInit(): void {}
  setHarvester(type: string = ''): string {
    switch (type) {
      case 'TEG':
        this.description = 'Thermoelectric Generator';
        return 'eletrical_service';
      case 'piezo':
        this.description = 'Piezoelectric Energy';
        return 'vibration';
      case 'SolarLightLoad':
        this.description = 'Small Solar Panel';
        return 'solar_power';
      case 'SolarHeavyLoad':
        this.description = 'Big Solar Panel';
        return 'solar_power';
      default:
        this.description = 'Harvester Unkown';
        return 'question_mark';
    }
  }
  setIconClass(type: string = ''): string {
    if (type === 'SolarLightLoad') return 'material-icons-outlined';
    return 'material-icons';
  }
}
