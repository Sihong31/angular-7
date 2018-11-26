import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';


export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a test recipe', 'https://cdn.pixabay.com/photo/2017/12/09/23/04/bread-3008950_960_720.jpg', [
      new Ingredient('Meat', 1),
      new Ingredient('French Fries', 20),
    ]),
    new Recipe('A test recipe 2', 'This is a test recipe 2', 'https://cdn.pixabay.com/photo/2017/12/09/23/04/bread-3008950_960_720.jpg', [
      new Ingredient('Tomato', 1),
      new Ingredient('French Fries', 20),
    ]),
    new Recipe('A test recipe 3', 'This is a test recipe 3', 'https://cdn.pixabay.com/photo/2017/12/09/23/04/bread-3008950_960_720.jpg', [
      new Ingredient('Tater Tots', 15),
      new Ingredient('French Fries', 20),
    ])
  ];

  setRecipes(recipes) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
