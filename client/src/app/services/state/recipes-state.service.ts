import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecipesStateService {
  private _arrPos = 0;
  private _totalPages = 0;

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
