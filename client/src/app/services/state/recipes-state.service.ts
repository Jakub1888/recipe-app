import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesStateService {
  private _arrPos = 0;
  private _totalPages = 0;
  firstLoad: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {}

  set arrPos(position: number) {
    this._arrPos = position;
  }

  get arrPos(): number {
    return this._arrPos;
  }

  set totalPages(pages: number) {
    this._totalPages = pages;
  }

  get totalPages(): number {
    return this._totalPages;
  }
}
