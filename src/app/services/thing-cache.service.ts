import { Injectable } from '@angular/core';
import { IDrHarvesterInput } from '../model/dr-harvester/dr-harvester-input.model';
import { AbstractCacheService } from './abstract-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ThingCacheService extends AbstractCacheService<IDrHarvesterInput> {}
