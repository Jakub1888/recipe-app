import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class RecipesHttpService {
  private APP_key = environment.APP_key;
  private APP_id = environment.APP_id;
  private url = `https://api.edamam.com/api/recipes/v2?type=public`;

  private recipes$: ReplaySubject<any> = new ReplaySubject<any>(1);
  private recipesArr: any[] = [];

  nextUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  loadRecipes(query: string, more = false) {
    let queryUrl: string;
    if (!more) {
      queryUrl = `${this.url}&q=${query}&app_id=${this.APP_id}&app_key=${this.APP_key}`;
    } else {
      queryUrl = query;
    }
    this.http.get<any[]>(queryUrl).subscribe((recipes) => {
      this.recipesArr.push(recipes);
      this.recipes$.next(this.recipesArr);
      this.nextUrl.next(
        this.recipesArr[this.recipesArr.length - 1]._links.next.href
      );
    });
  }

  getRecipes(): Observable<any[]> {
    return this.recipes$.pipe(distinctUntilChanged());
  }
}
