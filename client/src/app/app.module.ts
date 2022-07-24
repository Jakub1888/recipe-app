import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipeItemComponent } from './pages/recipes/recipe-item/recipe-item.component';
import { MaterialModule } from './material.module';
import { RecipeDetailComponent } from './pages/recipes/recipe-detail/recipe-detail.component';
import { ButtonComponent } from './shared/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RecipesComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    ButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    MaterialModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
