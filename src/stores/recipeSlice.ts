import { StateCreator } from "zustand"
import { getCategories, getRecipes } from "../services/RecipeService"
import { Categories, SearchFilter } from "../types"

export type recipesSliceType = {
    categories: Categories,
    fetchCategories: () => Promise<void>,
    searchRecipes: ( searchFilter : SearchFilter ) => Promise<void>,
}
export const createRecipeSlice : StateCreator<recipesSliceType> = ( set ) => ({
  categories: {
    drinks: [],
  },
  fetchCategories: async () => {
    const categories = await getCategories()
    set({ 
      categories 
    })
  },
  searchRecipes: async ( filters ) => {
    await getRecipes( filters )
  },
})
