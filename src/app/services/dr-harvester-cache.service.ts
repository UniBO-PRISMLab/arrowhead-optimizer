import { Injectable } from '@angular/core';
import { IDrHarvesterOutput } from '../model/dr-harvester/dr-harvester-output.model';
import { AbstractCacheService } from './abstract-cache.service';

@Injectable({
  providedIn: 'root',
})
export class DrHarvesterCacheService extends AbstractCacheService<IDrHarvesterOutput> {}
