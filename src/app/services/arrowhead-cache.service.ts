import { Injectable } from '@angular/core';
import { IArrowheadAllReply } from '../model/arrowhead/arrowheadAllReply.model';
import { AbstractCacheService } from './abstract-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ArrowheadCacheService extends AbstractCacheService<IArrowheadAllReply> {}
