import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-harvester',
  templateUrl: './show-harvester.component.html',
  styleUrls: ['./show-harvester.component.css'],
})
export class ShowHarvesterComponent implements OnInit {
  @Input('type') harvesterType: string = '';
  constructor() {}

  ngOnInit(): void {}
  setHarvester(type: string = ''): string {
    switch (type) {
      case 'TEG':
        return 'eletrical_service';
      case 'piezo':
        return 'vibration';
      case 'SolarLightLoad':
        return 'solar_power';
      case 'SolarHeavyLoad':
        return 'solar_power';
      default:
        return 'question_mark';
    }
  }
  setIconClass(type: string = ''): string {
    if (type === 'SolarLightLoad') return 'material-icons-outlined';
    return 'material-icons';
  }
}
