import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesHttpService } from 'src/app/services/http/recipes-http.service';
import { RecipesStateService } from 'src/app/services/state/recipes-state.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  recipes$: Observable<any> = new Observable();
  queryStr!: string;
  start = 0;
  end = 4;
  arrPos!: number;
  totalPages = 0;
  canLoadNext = false;
  nextPageUrl!: string;

  constructor(
    private recipesHttpService: RecipesHttpService,
    private recipesStateService: RecipesStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.recipesHttpService.getRecipes();
    this.recipesHttpService.nextUrl.subscribe(
      (url) => (this.nextPageUrl = url)
    );
    this.rememberPages();
  }

  getRecipes(query: string) {
    this.recipesHttpService.loadRecipes(query);
    this.recipes$ = this.recipesHttpService.getRecipes();
  }

  showMoreRecipes() {
    this.end += 4;
    if (this.end === 20) {
      this.canLoadNext = true;
    }
  }

  loadNextPage() {
    this.totalPages++;
    this.arrPos++;
    this.end = 4;
    this.canLoadNext = false;
    this.recipesHttpService.loadRecipes(this.nextPageUrl, true);
    this.recipes$ = this.recipesHttpService.getRecipes();
  }

  showPreviousPage() {
    this.arrPos--;
  }
  showNextPage() {
    this.arrPos++;
  }

  rememberPages() {
    this.arrPos = this.recipesStateService.arrPos;
    this.totalPages = this.recipesStateService.totalPages;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.recipesStateService.arrPos = this.arrPos;
        this.recipesStateService.totalPages = this.totalPages;
      }
    });
  }
}
