import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { RecipeService } from 'app/recipes/recipe.service';
import { AuthService } from 'app/auth/auth.service';
import { Recipe } from 'app/recipes/recipe.model';

@Injectable()

export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    // token is now being added via AuthInterceptor
    // const token = this.authService.getToken();
    // // const header = new HttpHeaders.set('Authorization', 'Bearer adfadfasd');
    // return this.http.put('https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: headers
    //   });
    // const req = new HttpRequest('PUT', 'https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)})

    const req = new HttpRequest('PUT', 'https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true})
    return this.http.request(req);
  }

  fetchRecipes() {
    const token = this.authService.getToken();

    // this.http.get('https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json?auth=' + token, { observe: 'response', responseType: 'text'})
    // this.http.get<Recipe[]>('https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json?auth=' + token)
    // query and token is now being added via AuthInterceptor
    this.http.get<Recipe[]>('https://ng-recipe-book-d5c3a.firebaseio.com/recipes.json')
      .subscribe(
        (recipes) => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
