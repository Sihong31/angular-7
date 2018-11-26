import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from 'app/recipes/recipe.service';
import { Recipe } from 'app/recipes/recipe.model';
import { AuthService } from 'app/auth/auth.service';

@Injectable()

export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    this.http.get('https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json?auth=' + token)
      .subscribe(
        (recipes) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
