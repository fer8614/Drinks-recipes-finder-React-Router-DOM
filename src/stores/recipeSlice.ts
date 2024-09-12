import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types" 

export type recipesSliceType = {
    categories: Categories,
    drinks: Drinks,
    selectedRecipe: Recipe,
    modal: boolean,
    fetchCategories: () => Promise<void>,
    searchRecipes: ( searchFilter : SearchFilter ) => Promise<void>,
    selectRecipe: (id: Drink['idDrink']) => Promise<void>,
    closeModal: () => void,
}
export const createRecipeSlice : StateCreator<recipesSliceType> = ( set ) => ({
  categories: {
    drinks: [],
  },
  drinks: {
    drinks: [],
  },
  selectedRecipe: {} as Recipe,
  fetchCategories: async () => {
    const categories = await getCategories()
    set({ 
      categories 
    })
  },
  modal: false    ,
  searchRecipes: async ( filters ) => {
    const drinks = await getRecipes( filters )
    set ({
      drinks
    })
  },
  selectRecipe: async ( id ) => {
    const selectedRecipe = await getRecipeById( id )
    set ({
      selectedRecipe,
      modal: true
    })
  },
  closeModal: () => { 
    set({ 
      modal: false,
      selectedRecipe: {} as Recipe

    })
  }
})
