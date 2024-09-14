import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { createRecipeSlice, recipesSliceType } from '../stores/recipeSlice'
import { createFavoritesSlice, FavoritesSliceType } from '../stores/favoritesSlice'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'

export const useAppStore = create<recipesSliceType & FavoritesSliceType & NotificationSliceType>()( devtools( ( ...a ) => ({ 
    ...createRecipeSlice( ...a ),
    ...createFavoritesSlice( ...a ),
    ...createNotificationSlice( ...a ),

})))