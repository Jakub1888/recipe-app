import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesHttpService } from 'src/app/services/http/recipes-http.service';
import { RecipesStateService } from 'src/app/services/state/recipes-state.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipesComponent implements OnInit {
  searchForm!: FormGroup;
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
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.recipesHttpService.getRecipes();
    this.recipesHttpService.nextUrl.subscribe(
      (url) => (this.nextPageUrl = url)
    );
    this.initForm();
    this.rememberPages();
  }

  onGetRecipes() {
    this.recipesHttpService.loadRecipes(
      this.searchForm.value.recipe,
      false,
      true
    );
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
    this.recipesHttpService.loadRecipes(this.nextPageUrl, true, false);
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

  private initForm() {
    this.searchForm = this.fb.group({
      recipe: ['', Validators.required],
    });
  }
}
