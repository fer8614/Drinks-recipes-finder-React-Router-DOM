import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipeSlice, recipesSliceType } from '../stores/recipeSlice'
import { createFavoritesSlice, FavoritesSliceType } from '../stores/favoritesSlice'

export const useAppStore = create<recipesSliceType & FavoritesSliceType>()( devtools( ( ...a ) => ({ 
    ...createRecipeSlice( ...a ),
    ...createFavoritesSlice( ...a ),

})))