import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipeSlice, recipesSliceType } from '../stores/recipeSlice'

export const useAppStore = create<recipesSliceType>()( devtools( ( ...a ) => ({ 
    ...createRecipeSlice( ...a ),
})))