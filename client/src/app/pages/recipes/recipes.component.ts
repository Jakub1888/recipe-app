import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesHttpService } from 'src/app/services/http/recipes-http.service';
import { RecipesStateService } from 'src/app/services/state/recipes-state.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  searchForm!: FormGroup;
  recipes$: Observable<any[]>;
  start = 0;
  end = 4;
  arrPos!: number;
  totalPages = 0;
  nextPageUrl!: string;

  constructor(
    private recipesHttpService: RecipesHttpService,
    private recipesStateService: RecipesStateService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.recipesStateService.firstLoad.subscribe((load) => {
      if (load) {
        this.recipesHttpService.loadRecipes('pizza', false, true);
        this.recipesStateService.firstLoad.next(false);
      } else {
        this.recipes$ = this.recipesHttpService.getRecipes();
        this.recipesHttpService.nextUrl.subscribe(
          (url: string) => (this.nextPageUrl = url)
        );
      }
      this.recipesHttpService.arrPos.subscribe((pos: number) => {
        this.arrPos = pos;
        this.totalPages = pos;
      });
    });

    this.initForm();
    this.rememberPages();
    AOS.init();
  }

  onGetRecipes() {
    this.recipesHttpService.loadRecipes(
      this.searchForm.value.recipe,
      false,
      true
    );
    this.recipes$ = this.recipesHttpService.getRecipes();
  }

  loadNextPage() {
    this.totalPages++;
    this.arrPos++;
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
