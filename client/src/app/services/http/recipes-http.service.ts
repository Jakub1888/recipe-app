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
  private recipes$: ReplaySubject<any> = new ReplaySubject<any>(1);
  private recipesArr: any[] = [];

  nextUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  arrPos: Subject<number> = new Subject<number>();

  constructor(private http: HttpClient) {}

  loadRecipes(query: string, more = false, search) {
    let queryUrl: string;
    if (!more) {
      queryUrl = `http://localhost:3000/api/search?q=${query}`;
    } else {
      queryUrl = query;
    }
    this.http.get<any[]>(queryUrl).subscribe(
      (data: any) => {
        const result = data.results;
        if (search) {
          this.recipesArr = [];
          this.arrPos.next(0);
        }
        this.recipesArr.push(result);
        this.recipes$.next(this.recipesArr);
        this.nextUrl.next(
          this.recipesArr[this.recipesArr.length - 1]._links.next?.href
        );
      },
      (error) => console.log(error)
    );
  }

  getRecipes(): Observable<any[]> {
    return this.recipes$.pipe(distinctUntilChanged());
  }
}
