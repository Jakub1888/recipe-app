import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeDetailComponent } from '../recipe-detail/recipe-detail.component';

@Component({
  selector: 'recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog(): void {
    this.dialog.open(RecipeDetailComponent, {
      position: { top: '5em' },
      width: '90em',
      height: '50em',
      data: { recipe: this.recipe },
    });
  }
}
