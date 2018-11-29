import { Recipe } from '../recipe.model';
import { Ingredient } from 'app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case (RecipeActions.SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      }
    case (RecipeActions.ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      }
    case (RecipeActions.UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      }
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      }
    case (RecipeActions.DELETE_RECIPE):
      const recipesArr = state.recipes;
      recipesArr.splice(action.payload, 1);
      return {
        ...state,
        recipes: recipesArr
      }
    default:
      return state;
  }
}
